import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { Outlet, Link, Navigate, useNavigate, NavLink } from "react-router-dom";

import Header from "./Header";
import Content from "./Content";
import Sidebar from "./SideBar";

export default function AppLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid>
          <Sidebar />
        </Grid>
        <Grid
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "90vh",
            p: 3,
            overflow: "hidden"
          }}
        >
          <Content />
        </Grid>
      </Grid>
    </Box>
  );
}
