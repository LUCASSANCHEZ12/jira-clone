import { Avatar, Box, Button, IconButton, Menu, MenuItem, Modal, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { stringToColor } from "../common/stringToColor";
import { useDispatch } from "react-redux";
import { create_task, getTasks } from "../../store/slices/taskSlice";
import { showSnackbar } from "../../store/slices/snackbarSlice";


export default function CreateTaskModal({ open, handleClose}) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const data = localStorage.getItem("users_data");
        setUsers(JSON.parse(data));
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSelectUser = (userName) => {
        setSelectedUser(userName);
        handleCloseMenu();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const story_points = form.story_points.value;
        dispatch(create_task({title, description, project_id: "PROJ-1", story_points: story_points, assignee: selectedUser}))
        .unwrap()
        .then(() => {
            dispatch(getTasks())
            dispatch(showSnackbar({message:"Succesfully created a new Task", type:"success"}))
        })
        .catch(() => {
            dispatch(showSnackbar({message:"Error creating new Task", type:"error"}))
        });
        handleClose()
    }

    return (
        <Modal open={open} onClose={handleClose} sx={{display:"flex", justifyContent:"center", alignSelf:"center"}}>
            <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    What should be done?
                </Typography>
                <Box component="form" sx={{ mt: 1, maxWidth:"450px"}} onSubmit={handleSubmit}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    name="title"
                    label="Task title"
                    placeholder="Enter a concise task title"
                    autoFocus
                    slotProps={{
                        htmlInput:{ maxLength: 100 }
                    }}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    placeholder="Describe what needs to be done"
                    multiline
                    minRows={3}
                    maxRows={6}
                    slotProps={{
                        htmlInput:{ maxLength: 500 }
                    }}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="story_points"
                    name="story_points"
                    label="Story Points"
                    placeholder="e.g. 1, 3, 5, 8"
                    type="number"
                    slotProps={{
                        htmlInput:{ min: 1, max: 100,}
                    }}
                    />

                    <Tooltip title={"Unassigned"} >
                        <IconButton
                            onClick={handleOpenMenu}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{padding:"0", gap:2, mt:2}}
                        >
                            <Avatar sx={{ width: 24, height: 24, padding:"2px", backgroundColor: stringToColor(selectedUser) }}>{selectedUser.slice(0,1)}</Avatar>
                            {selectedUser || "Unassigned"}
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="assign-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
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
                        {users?.map((user, index) => (
                            <MenuItem
                                key={`${user.name}-${index}-option`}
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
                                            {user.name}
                                        </Typography>
                                        <Typography sx={{  fontSize: "12px" }}>
                                            {user.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </MenuItem>
                        ))}
                    </Menu>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Button
                            onClick={handleClose}
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2, ml:2, mr:2 }}
                            >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, ml:2, mr:2 }}
                            >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
}