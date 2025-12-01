import {
  Box,
  Button,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
  Container,
  Tooltip,
  Paper,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getProfile, userData } from "../../store/slices/userSlice"
import { stringToColor } from "../common/stringToColor";
import { Cloud, ContentCopy, ContentCut, Logout } from "@mui/icons-material";

export default function JiraHeader({logout}) {
  const user = useSelector(userData);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
      setAnchorEl(null);
  };
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pages = [
    { name: "Home", path: "/", icon: <HomeOutlinedIcon /> },
    { name: "Backlog", path: "/backlog", icon: <DashboardOutlinedIcon /> },
    { name: "Issues", path: "/issues", icon: <ListAltOutlinedIcon /> },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(getProfile()).unwrap()
        .then(() => {
          setLoadingUser(false);
        })
        .catch(() => {
          setError(true);
          setLoadingUser(false);
        });
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <Typography
        color="error"
        sx={{ p: 2, textAlign: "center" }}
      >
        Error fetching user profile
      </Typography>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        width: "100%",               // ancho total de la pantalla
        height: 56,
        backgroundColor: "#ffffff",
        display: "flex",              // flexbox
        flexDirection: "row",         // opcional, por defecto es 'row'
        justifyContent: "space-between", // distribuye hijos en los extremos
        padding: 2,                        // padding horizontal
        position: "sticky",
        margin:0,
        borderBottom: "1px solid #dddedd",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            background: "white",
            borderRadius: "4px",
          }}
        />
        <Typography variant="h6" fontWeight="bold" color="#292a54">
          Jira Clone
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          ml: 4,
        }}
      >
        {pages.map((page) => (
          <Button key={page.name}  component={NavLink} to={page.path} startIcon={page.icon}
            sx={{
              color: "#292a54",
              textTransform: "none",
              fontWeight: 500,
              "&.active": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 1,
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              },
            }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
        {loadingUser && <CircularProgress color="inherit" size={20} />}
        {!loadingUser && user && (
          <>
            <Typography fontWeight="regular" color="#292a54" sx={{marginRight:"6px"}}>
              {user.email}
            </Typography>
            <Tooltip title={user.email} >
              <IconButton
                  onClick={handleOpenMenu}
                  size="small"
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  sx={{padding:"0"}}
              >
                  <Avatar sx={{ width: 24, height: 24, padding:"2px", backgroundColor: stringToColor(user.name) }}>{user.name.slice(0,1).toUpperCase()}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              id="header-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              onClick={(e) => e.stopPropagation()}
              slotProps={{
              paper: {
                  sx: {
                      maxWidth: '100%',
                      width: "320px",
                      overflowY: "auto",
                  },
              }}}
            >
              <MenuItem>
                <Box sx={{ display: "flex", flexDirection: "row", width:"100%",alignItems: "center"}}>
                  <Avatar
                    sx={{
                        width: 44,
                        height: 44,
                        padding: "2px",
                        fontSize: "32px",
                        backgroundColor: stringToColor(user.name),
                    }}
                  >
                      {user.name.slice(0, 1).toUpperCase()}
                  </Avatar>
                  <Box sx={{ marginLeft: "8px" }}>
                    <Typography sx={{ fontSize: "20px" }}>
                        {user.name}
                    </Typography>
                    <Typography sx={{  fontSize: "14px" }}>
                        {user.email}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Container>
  );
}
