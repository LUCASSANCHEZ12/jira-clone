import { Grid, Typography } from "@mui/material"
import TaskList from "../Tasks/TaskList";
import { useDroppable } from "@dnd-kit/core";

export default function Column({tasks = [], columnKey, setOpenModal}) {
    const { setNodeRef } = useDroppable({ id: columnKey, data: { column: columnKey } });
    
    return (
        <Grid 
            ref={setNodeRef}
            container 
            spacing={1}
            sx={{
                width: "270px", 
                minWidth: "270px", 
                maxWidth: "270px",  
                backgroundColor:"#f8f8f8",
                padding:"10px",
                borderRadius:"4px",
                minHeight:"90vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            <Grid size={{xs:12}} sx={{padding:"10px"}}>
                <Typography fontWeight="regular" sx={{textAlign:"left", color:"#787b87", fontSize:"12px"}}>
                    {columnKey.replace("_", " ").toUpperCase()}
                </Typography>
            </Grid>
            <TaskList tasks={tasks} columnKey={columnKey} setOpenModal={setOpenModal}/>
        </Grid>
    )
}