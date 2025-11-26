import {
  Box,
  Tooltip,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Typography
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const sidebarItems = [
  { name: "Home", icon: <HomeOutlinedIcon />, path: "/" },
  { name: "Boards", icon: <DashboardOutlinedIcon />, path: "/boards" },
  { name: "Issues", icon: <ListAltOutlinedIcon />, path: "/issues" },
  { name: "Settings", icon: <SettingsOutlinedIcon />, path: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        width: collapsed ? 60 : 220, 
        bgcolor: "#ffffff",
        color: "#52534e",
        display: "flex",
        flexDirection: "column",
        py: 2,
        transition: "width 0.2s ease-in-out",
        position: "sticky",
        top: 0,
        borderRight: "1px solid #dddedd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: 2,
          mb: 4,
        }}
      >
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{ color: "#292a54" }}
        >
          {collapsed ? "»" : "«"}
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {sidebarItems.map((item) => (
          <Tooltip
            key={item.name}
            title={collapsed ? item.name : ""}
            placement="right"
            arrow
          >
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                mb: 1,
                borderRadius: 1,
                color: "#292a54",
                "&.active": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                },
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 0 : 2,
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#292a54",
                  minWidth: 0,
                  mr: collapsed ? 0 : 2,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && <Typography>{item.name}</Typography>}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
}
