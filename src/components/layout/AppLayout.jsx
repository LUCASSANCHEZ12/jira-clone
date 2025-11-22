import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { Outlet, Link, Navigate, useNavigate, NavLink } from "react-router-dom";

import Header from "./Header";
import Content from "./Content";
import Sidebar from "./SideBar";

export default function AppLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item>
          <Sidebar />
        </Grid>
        <Grid
            xs
            sx={{
              backgroundColor: "#F4F5F7", // fondo estilo Jira
              minHeight: "100vh",
              p: 3,
            }}
        >
          <Content />
        </Grid>
      
      </Grid>
      
    </Box>
  );
}
