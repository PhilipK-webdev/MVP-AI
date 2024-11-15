import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logo.png";
import { FaBackward } from "react-icons/fa";
function CustomAppBar({ topic, handleDrawerOpen, handleBack }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent !important",
        color: "white !important",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {topic.name}
        </Typography>
        <img
          src={Logo}
          alt="logo image"
          style={{
            width: "35px",
            height: "35px",
          }}
        />
        <IconButton style={{ color: "white" }} onClick={handleBack}>
          <FaBackward
            style={{ height: "1em", width: "1em", cursor: "pointer" }}
            title="Refresh"
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;
