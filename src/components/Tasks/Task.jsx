import { Grid, Typography, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

export default function Task({ task }) {

    const handleClick = (event) => {
        console.log("Task clicked:", task);
    }

    const stringToColor = (string) => {
        let hash = 0;

        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        const color = "#" + 
            ((hash >> 24) & 0xFF).toString(16).padStart(2, "0") +
            ((hash >> 16) & 0xFF).toString(16).padStart(2, "0") +
            ((hash >> 8) & 0xFF).toString(16).padStart(2, "0");

        return color;
    }


    return (
        <Grid
            container
            size={{ xs: 12 }}
            sx={{
            backgroundColor: "#fff",
            borderRadius: "6px",
            padding: "10px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            marginBottom: "10px",
            cursor: "pointer",
            transition: "0.2s ease",
            "&:hover": {
                boxShadow: "0 3px 6px rgba(0,0,0,0.25)",
            },
            minWidth: "250px",
            maxWidth: "250px",
            display:"flex", flexDirection:"row"
            }}
        >
            <Grid size={{xs:12}} sx={{ marginBottom: "4px" }}>
                <Typography sx={{ fontSize: "14px", color:"#292a2e" }}>
                {task.title}
                </Typography>
            </Grid>

            <Grid size={{xs:12}} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: "12px", color: "#666", display: "flex", justifyContent:"center", alignItems:"center", borderRadius: "4px" }}>
                    {task.id}
                </Typography>
                <Grid spacing={3} sx={{display:"flex", justifyContent:"right", gap:1, marginLeft:"auto"}}>
                    <Typography sx={{ fontSize: "12px", color: "#666", backgroundColor: "#f0f0f0", display: "flex", justifyContent:"center", alignItems:"center", padding: "2px 6px", borderRadius: "4px" }}>
                        {task.story_points}
                    </Typography>
                    <Tooltip title={task.assignee} >
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{padding:"0"}}
                        >
                            <Avatar sx={{ width: 24, height: 24, padding:"2px", backgroundColor: stringToColor(task.assignee) }}>{task.assignee.slice(0,1).toUpperCase()}</Avatar>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    );
}
