import {
  Box,
  Button,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
  Container,
  Tooltip
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getProfile, userData } from "../../store/slices/userSlice"

export default function JiraHeader() {
  const user = useSelector(userData);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pages = [
    { name: "Home", path: "/", icon: <HomeOutlinedIcon /> },
    { name: "Backlog", path: "/backlog", icon: <DashboardOutlinedIcon /> },
    { name: "Issues", path: "/issues", icon: <ListAltOutlinedIcon /> },
  ];

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


  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(getProfile()).unwrap()
        .then(() => {
          console.log("User profile fetched successfully: ", user);
          setLoadingUser(false);
        })
        .catch(() => {
          setError(true);
          setLoadingUser(false);
        });
    };

    fetchProfile();
  }, []);

  const goToProfile = () => {
    if (!user?.email) return;
    navigate(`/profile/${user.email}`);
  };

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
            <Tooltip title="Actions" >
              <IconButton
                  onClick={goToProfile}
                  size="small"
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  sx={{padding:"0"}}
              >
                  <Avatar sx={{ width: 24, height: 24, padding:"2px", backgroundColor: stringToColor(user.name) }}>{user.name.slice(0,1).toUpperCase()}</Avatar>
              </IconButton>
            </Tooltip>

          </>
        )}
      </Box>
    </Container>
  );
}
