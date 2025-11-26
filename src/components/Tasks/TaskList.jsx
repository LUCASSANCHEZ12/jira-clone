import Task from "./Task";
import { Button, Grid, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

export default function TaskList({ tasks = [], columnKey }) {
    return (
        <>
            {tasks ? 
                tasks.map((task, index) => (
                    <Grid sx={{ display: "flex", flexDirection: "row" }} key={`${task.id}-index`}>
                        <Task task={task} />
                    </Grid>
                ))
            : (
                <Grid size={{xs:12, lg:12}} sx={{marginBottom:"10px"}}>
                    <Button fullWidth sx={{textTransform:"none", color:"#292a54", textAlign:"left", justifyContent:"flex-start"}} >
                        <AddIcon sx={{marginRight:"6px"}} />
                            Add Task
                    </Button>
                </Grid>
            )}
        </>
    );
}
