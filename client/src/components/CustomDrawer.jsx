import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { useContext } from "react";
import { StateContext } from "../context/CustomContext";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { BsChatSquareDotsFill } from "react-icons/bs";
import styled2 from "styled-components";
const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function CustomDrawer({
  open,
  handleDrawerClose,
  handleNewConversation,
  anchor,
  getOldConversation,
}) {
  const theme = useTheme();
  const { userData } = useContext(StateContext);
  const userExists =
    userData &&
    userData.length > 0 &&
    userData[0].conversations &&
    userData[0].conversations.length > 0;
  return (
    <>
      <Drawer
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
            background: "#573B8A",
            color: "white",
            borderRightColor: "white",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <BsChatSquareDotsFill onClick={handleNewConversation} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{ color: "white" }} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider style={{ borderColor: "white" }} />
        {userExists && (
          <List>
            {userData[0].conversations.map((conversation, index) => {
              return (
                <CustomListItem key={index} disablePadding>
                  <div style={{ paddingLeft: "10px" }}>{index + 1}.</div>
                  <ListItemButton
                    onClick={() => getOldConversation(conversation)}
                  >
                    <ListItemText
                      primary={conversation.name}
                      primaryTypographyProps={{
                        fontSize: "12px",
                        width: "100px",
                      }}
                    />
                  </ListItemButton>
                </CustomListItem>
              );
            })}
          </List>
        )}
        <Divider style={{ borderColor: "white" }} />
      </Drawer>
    </>
  );
}

const CustomListItem = styled2(ListItem)`

border: 1px solid white;
border-radius: 10px;
width: 90%;
margin-left: auto;
margin-right: auto;
margin-bottom: 10px;
`;
export default CustomDrawer;
