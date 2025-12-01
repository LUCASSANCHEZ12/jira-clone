import { 
    Grid, 
    Typography, 
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Box,
} from "@mui/material";
import { useDraggable } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { assignTaskToUser, getTasks } from "../../store/slices/taskSlice"
import { useDispatch } from "react-redux";
import { stringToColor } from "../common/stringToColor";

function Task({ task, index }) {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
        data: { column: task.status, task: task.id, index },
    });    
    
    useEffect(() => {
        const data = localStorage.getItem("users_data");
        setUsers(JSON.parse(data));
    }, []);

    const sortedUsers = [...users].sort((a, b) => {
        if (a.name === task.assignee) return -1;
        if (b.name === task.assignee) return 1;
        return 0;
    });

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSelectUser = (userName) => {
        dispatch(assignTaskToUser({ taskId: task.id, userName })).unwrap()
        .then(() => {
            dispatch(getTasks());
        }).catch((error) => {
        })
        handleCloseMenu();
    };

    return (
        <Grid
            ref={setNodeRef} {...attributes}
            container
            size={{ xs: 12 }}
            sx={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
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
            <Grid size={{xs:12}} sx={{ marginBottom: "4px" }} {...listeners}>
                <Typography sx={{ fontSize: "14px", color:"#292a2e" }}>
                {task.title}
                </Typography>
            </Grid>

            <Grid size={{xs:12}} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                <Typography sx={{ fontSize: "12px", color: "#666", display: "flex", justifyContent:"center", alignItems:"center", borderRadius: "4px" }} {...listeners}>
                    {task.id}
                </Typography>
                <Grid spacing={3} sx={{display:"flex", justifyContent:"right", gap:1, marginLeft:"auto"}}>
                    <Typography sx={{ fontSize: "12px", color: "#666", backgroundColor: "#f0f0f0", display: "flex", justifyContent:"center", alignItems:"center", padding: "2px 6px", borderRadius: "4px" }} {...listeners}>
                        {task.story_points}
                    </Typography>
                    <Tooltip title={task.assignee || "Unassigned"} >
                        <IconButton
                            onClick={handleOpenMenu}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{padding:"0"}}
                        >
                            <Avatar sx={{ width: 24, height: 24, padding:"2px", backgroundColor: stringToColor(task.assignee || "") }}>{task.assignee.slice(0,1).toUpperCase()}</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="assign-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        onClick={(e) => e.stopPropagation()}
                        slotProps={{
                        paper: {
                            sx: {
                                height: "300px",
                                width: "300px",
                                overflowY: "auto",
                            },
                        }}}
                    >
                        <MenuItem
                                key="unassigned-option"
                                onClick={(e) => handleSelectUser("")}
                            >
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        padding: "2px",
                                        backgroundColor: stringToColor(""),
                                    }}
                                >
                                </Avatar>
                                <Box sx={{ marginLeft: "8px" }}>
                                    <Typography sx={{ fontSize: "14px" }}>
                                        Unassigned
                                    </Typography>
                                    <Typography sx={{  fontSize: "12px" }}>
                                        
                                    </Typography>
                                </Box>
                            </Box>
                        </MenuItem>
                        {sortedUsers?.map((user, index) => (
                            <MenuItem
                                key={`${user.name}-option`}
                                onClick={(e) => handleSelectUser(user.name)}
                            >
                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <Avatar
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            padding: "2px",
                                            backgroundColor: stringToColor(user.name),
                                        }}
                                    >
                                        {user.name.slice(0, 1).toUpperCase()}
                                    </Avatar>
                                    <Box sx={{ marginLeft: "8px" }}>
                                        <Typography sx={{ fontSize: "14px" }}>
                                            {task.assignee === user.name ? `${user.name} (Assigned)` : user.name}
                                        </Typography>
                                        <Typography sx={{  fontSize: "12px" }}>
                                            {user.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default React.memo(Task);
