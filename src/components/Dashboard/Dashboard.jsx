import React, {useState, useEffect} from 'react'
import Column from './Column'
import { Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks, tasks_list, updateTaskStatus } from "../../store/slices/taskSlice"
import {
  DndContext,
  DragOverlay,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";
import Task from '../Tasks/Task'

export default function Dashboard({}) {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const data = useSelector(tasks_list) 
    const [activeTask, setActiveTask] = useState(null);

    useEffect(() => {
        dispatch(getTasks()).unwrap()
        .then(() => {
            setError(null);
        })
        .catch((error) => {
            setError(<div>{error}</div>);
        })
    },[])

    const findTaskById = (id) => {
        for (const col of Object.keys(data)) {
            const found = data[col].find(t => t.id === id);
            if (found) return found
        }
        return null
    };

    const onDragEnd = ({ active, over }) => {
        if (!over) return

        const fromCol = Object.keys(data).find(
            (columnKey) =>
                data[columnKey].some((task) => task.id === active.id)
        )

        const toCol = over.data.current?.columnId

        if (!fromCol || !toCol) return

        const fromList = Array.from(data[fromCol])
        const toList = Array.from(data[toCol])

        const movingTask = fromList.find((t) => t.id === active.id)

        // Remove task from original list
        const fromIndex = fromList.findIndex((t) => t.id === active.id)
        fromList.splice(fromIndex, 1);

        // Then, insert into new list at the correct position
        const overIndex = toList.findIndex((t) => t.id === over.id)
        const insertIndex = overIndex === -1 ? toList.length : overIndex

        toList.splice(insertIndex, 0, {
            ...movingTask,
            status: toCol, // change status to new column
        })

        // Update the Redux store with the new status
        dispatch(updateTaskStatus({
            id: active.id,
            status: toCol
        }))

        // Refresh tasks after status update
        dispatch(getTasks())

        console.log("Dragged from", fromCol, "to", toCol)
        console.log("Data after drag:", data)

        setActiveTask(null)
    }

    return (
        <Grid container spacing={2} sx={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
            <DndContext collisionDetection={closestCenter}  onDragStart={({ active }) => {  setActiveTask(active.id)}} onDragEnd={onDragEnd}>           
                {Object.keys(data).map((columnKey) => (
                    <SortableContext
                        key={columnKey}
                        items={data[columnKey].map(task => task.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <Column key={columnKey} columnKey={columnKey} tasks={data[columnKey]}/>
                    </SortableContext>
                ))}
                <DragOverlay>
                    {activeTask ? (
                        <Task task={findTaskById(activeTask)} overlay />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </Grid>
    )
}