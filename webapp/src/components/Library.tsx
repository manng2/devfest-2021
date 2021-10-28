import React, { useState } from "react";
import "../styles/Library.scss";
import BlockLibrary from "./BlockInLibrary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
//cahnge
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

//cahnge

const Library: React.FunctionComponent<any> = (props) => {
  const [isShow, setIsShow] = useState(true);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const library = [
    {
      type: "basic",
      name: "Basic Blocks",
      blocks: [
        {
          type: "text",
          name: "Text",
          image:
            "https://d1fmnevnt6737i.cloudfront.net/library-icons/block-text.svg",
          isRelease: true,
        },
        {
          type: "image",
          name: "Image",
          image:
            "https://d1fmnevnt6737i.cloudfront.net/library-icons/block-image.svg",
          isRelease: false,
        },
        {
          type: "audio",
          name: "Audio",
          image:
            "https://d1fmnevnt6737i.cloudfront.net/library-icons/block-audio.svg",
          isRelease: false,
        },
        {
          type: "video",
          name: "Video",
          image:
            "https://d1fmnevnt6737i.cloudfront.net/library-icons/block-video.svg",
          isRelease: false,
        },
      ],
    },
    {
      type: "action",
      name: "Action Blocks",
      blocks: [
        {
          type: "alarm",
          name: "Alarm",
          image:
            "https://d1fmnevnt6737i.cloudfront.net/library-icons/block-otn.svg",
          isRelease: false,
        },
      ],
    },
    {
      type: "none",
      name: "Other",
      blocks: [
        {
          type: "space",
          name: "Space",
          image:
            "https://d1fmnevnt6737i.cloudfront.net/library-icons/block-module.svg",
          isRelease: true,
        },
        {
          type: "addZone",
          name: "Zone",
          image:
            "https://res.cloudinary.com/kittyholic/image/upload/v1632284169/zone_z7wew8.svg",
          isRelease: true,
        },
      ],
    },
  ];

  const handleStateLibrary = () => {
    setIsShow(!isShow);
  };

  const statusOptions = [
    {
      id: 0,
      name: "Nothing...",
    },
    {
      id: 1,
      name: "☕ Coffee",
    },
    {
      id: 2,
      name: "💤 Sleepy",
    },
    {
      id: 3,
      name: "🍪 Snack",
    },
    {
      id: 4,
      name: "😁 Happy",
    },
    {
      id: 5,
      name: "💅 Beauty",
    },
    {
      id: 6,
      name: "🎧 Listening",
    },
    {
      id: 7,
      name: "🚽 Toilet",
    },
    {
      id: 8,
      name: "🚬 Smoking",
    },
  ];

  const handleChangeStatus = (e) => {
    localStorage.setItem("status", e.target.value);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} style={{background: 'white', color: 'black'}}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              &nbsp;MAD Hub
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {isShow ? (
            <div className="Library position-relative" style={{width: '100%', border: 'none'}}>
              <div className="block-container p-2">
                {library.map((kind, idx) => {
                  return (
                    <div className="mb-3">
                      <div className="kind-name text-align-left p-2">
                        {kind.name}
                      </div>
                      <div className="mt-3">
                        {kind.blocks.map((block, idx) => {
                          return (
                            <BlockLibrary
                              block={block}
                              className=""
                              key={idx}
                            ></BlockLibrary>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                <div className="mb-3">
                  <div className="kind-name text-align-left p-2 mb-3">
                    Status
                  </div>
                  <select
                    className="status-input"
                    placeholder="Update your status"
                    onChange={handleChangeStatus}
                  >
                    {statusOptions.map((status) => {
                      return <option value={status.name}>{status.name}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="Library position-relative hide-library">
              <div className="icon kt-icon" onClick={handleStateLibrary}>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
              </div>
            </div>
          )}
        </Drawer>
        <Main open={open}></Main>
      </Box>
      <div className="Library position-relative" style={{width: '0px', border: 'none'}}></div>
    </>
  );
};

export default Library;
