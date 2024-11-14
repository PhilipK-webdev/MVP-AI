import { useContext, useState, useEffect } from "react";
import { StateContext } from "../context/state.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logo.png";
import styled from "styled-components";
import { useParams } from "react-router-dom";
function Dashboard() {
  const { selectedId, config } = useContext(StateContext);
  const { id } = useParams();
  const [topic, setTopic] = useState({});
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    if ((selectedId || id) && config.length > 0) {
      const data = config[0];
      for (const [key, value] of Object.entries(data)) {
        if (value.id === selectedId || value.id === id) {
          setTopic(data[key]);
        }
      }
    }
  }, [config, selectedId, id]);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderComponent>
      <AppBar position="static" style={{ background: "transperent" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
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
        </Toolbar>
      </AppBar>
    </HeaderComponent>
  );
}

const HeaderComponent = styled.div`
  width: 100%;
  .css-ptdwpq-MuiPaper-root-MuiAppBar-root {
    background-color: transparent !important;
    color: white !important;
    box-shadow: none;
  }
`;
export default Dashboard;
