import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Content from "./Content";
import Sidebar from "./SideBar";

export default function AppLayout() {
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("users_data");
    localStorage.removeItem("tasks_data");
    // refresh window
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header logout={logout}/>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid>
          <Sidebar logout={logout}/>
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
