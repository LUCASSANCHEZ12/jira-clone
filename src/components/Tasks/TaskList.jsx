import Task from "./Task";
import { Button, Grid, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

export default function TaskList({ tasks = [], columnKey }) {
    return (
        <>
            <Grid size={{xs:12}} sx={{padding:"10px"}}>
                <Typography fontWeight="regular" sx={{textAlign:"left", color:"#787b87", fontSize:"12px"}}>
                    {columnKey.replace("_", " ").toUpperCase()}
                </Typography>
            </Grid>
            {Array.isArray(tasks) && tasks.length > 0 ? 
                <>
                    {tasks.map((task, index) => (
                        <Grid key={index} sx={{display:"flex", flexDirection:"row"}}>
                            <Task task={task} />
                        </Grid>
                    ))}
                </>
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
