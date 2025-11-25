import { Grid } from "@mui/material"
import TaskList from "../Tasks/TaskList";

export default function Column({tasks = [], columnKey}) {
    return (
        <>
            <Grid container spacing={1}
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
                <TaskList tasks={tasks} columnKey={columnKey} />
            </Grid>
        </>
    )
}