import React, {useState, useEffect} from 'react'
import Column from './Column'
import { Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks, tasks_list, updateTaskStatus, searchById, reorderTasks } from "../../store/slices/taskSlice"
import {
  DndContext,
  DragOverlay,
  closestCenter
} from "@dnd-kit/core";
import { SuccessSnackbar, ErrorSnackbar, NormalSnackbar } from "../common/CustomSnackbar";
import { showSnackbar } from '../../store/slices/snackbarSlice'
import CreateTaskModal from '../Tasks/CreateTask'

export default function Dashboard({}) {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const { to_do, in_progress, qa, done } = useSelector(tasks_list);
    const activeTask = useSelector((state) => state.task.selectedTask);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(getTasks()).unwrap()
        .then(() => {
            setError(null);
        })
        .catch((error) => {
            setError(<div>{error}</div>);
        })
    },[])

    const onDragStart = ({ active }) => {
        dispatch(searchById(active.id)).unwrap();
    }

    const onDragEnd = ({ active, over }) => {
        if (!over) return

        const fromColumn = active.data.current.column;
        const toColumn = over.data.current.column;

        // // if it's the same column, just reorder
        if (fromColumn === toColumn) {
            const fromIndex = active.data.current.index;
            const toIndex = over.data.current.index;
            dispatch(showSnackbar({message:"Task '"+active.data.current.task +"' reordered in '"+ fromColumn + "'", type:"normal"}))
            dispatch(
                reorderTasks({
                    column: fromColumn.replace("-", "_"),
                    fromIndex,
                    toIndex
                })
            );
            return
        }

        // validate flow
        if (activeTask?.next_state !== toColumn){
            dispatch(showSnackbar({message:"Invalid move from '"+ fromColumn + "' to '"+ toColumn+"'", type:"error"}))
            return ;
        }

        const role = localStorage.getItem("userRole");
        // validate role permissions
        if (toColumn === "done" && role === "developer"){
            // developer can't move to in-progress
            dispatch(showSnackbar({message:"A developer can't move a task to 'Done', only QA", type: "error"}))
            return;
        }

        // Update the Redux store with the new status
        dispatch(updateTaskStatus({
            id: active.id,
            status: toColumn
        })).unwrap()
        .then(() => {
            dispatch(getTasks());
        })
        dispatch(showSnackbar({message:"Task '"+active.data.current.task +"' moved from '"+ fromColumn + "' to '"+ toColumn+"'", type:"success"}))
    }

    return (
        <Grid container spacing={2} sx={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
            <DndContext collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>        
                <Column key="to-do" columnKey='to-do' tasks={to_do} setOpenModal={setOpenModal}/>
                <Column key='in-progress' columnKey='in-progress' tasks={in_progress} setOpenModal={setOpenModal}/>
                <Column key='qa' columnKey='qa' tasks={qa} setOpenModal={setOpenModal}/>
                <Column key='done' columnKey='done' tasks={done} setOpenModal={setOpenModal}/>
            </DndContext>
            <CreateTaskModal open={openModal} handleClose={() => setOpenModal(false)} />
            <SuccessSnackbar />
            <ErrorSnackbar />
            <NormalSnackbar />
        </Grid>
    )
}