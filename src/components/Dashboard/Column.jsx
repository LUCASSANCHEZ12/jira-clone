import { Button, Grid, Icon, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

export default function Column({tasks = [], columnKey}) {

    return (
        <>
        
            <Grid container
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
                {Array.isArray(tasks) && tasks.length > 0 ? 
                    <>
                        {tasks.map((task, index) => (
                            <Grid key={index} >
                                <div>{task.title}</div>
                            </Grid>
                        ))}
                    </>
                : (
                    <Grid size={{xs:12}} sx={{marginBottom:"10px"}}>
                        <Button fullWidth sx={{textTransform:"none", color:"#292a54", textAlign:"left", justifyContent:"flex-start"}} >
                            <AddIcon sx={{marginRight:"6px"}} />
                             Add Task
                        </Button>
                    </Grid>
                )}
            </Grid>
        </>
    )
}