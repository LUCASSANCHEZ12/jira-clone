import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
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
      <Content />
      <Sidebar />
    </Box>
  );
}
