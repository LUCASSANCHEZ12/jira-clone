import {
  Box,
  Button,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
  Container
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/UserService";

export default function JiraHeader() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const pages = [
    { name: "Home", path: "/", icon: <HomeOutlinedIcon /> },
    { name: "Boards", path: "/boards", icon: <DashboardOutlinedIcon /> },
    { name: "Issues", path: "/issues", icon: <ListAltOutlinedIcon /> },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError(true);
        setLoadingUser(false);
        return;
      }

      const response = await getUserProfile(token);

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setError(true);
      }

      setLoadingUser(false);
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
          <IconButton
            onClick={goToProfile}
            sx={{ color: "white" }}
          >
            <AccountCircle 
              sx={{ color: "#292a54", width: 32, height: 32 }}
            />
          </IconButton>
        )}
      </Box>
    </Container>
  );
}
