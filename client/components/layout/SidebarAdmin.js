/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {Drawer, List, Typography, Divider, ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import {ChevronLeft, ChevronRight, VpnKey, Person, ExitToApp, SupervisorAccount, SportsEsports} from "@material-ui/icons";
import clsx from "clsx";
import { Link as RouterLink, useHistory } from "react-router-dom";
const serverUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_SERVER_URL : process.env.DEV_SERVER_URL;
const IcAdmin = serverUrl + "images/icon-admin.png";
import { startLogout } from "../../action/auth/action";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    color: "white",
    background: "#3e435f",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    color: "white",
    background: "#3e435f",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SidebarAdmin = ({ onDrawerClose, open, logout, id }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const dataList = [
    {
      icon: <SupervisorAccount />,
      text: "Users",
      redirect: () => history.push("/admin/manageuser"),
    },
    {
      icon: <SportsEsports />,
      text: "Games",
      redirect: () => history.push("/admin/managegame"),
    },
  ];

  const actionsList = [
    {
      icon: <VpnKey />,
      text: "Change password",
      redirect: () => history.push("/admin/changepassword"),
    },
    {
      icon: <Person />,
      text: "Edit profile",
      redirect: () => history.push("/admin/profile"),
    },
    {
      icon: <ExitToApp />,
      text: "Log out",
      redirect: () => {logout(id, history);},
    },
  ];

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar} style={{ display: "flex", justifyContent: "space-around" }}>
        <img src={IcAdmin} height={40} weight={40} style={{ margin: "auto" }} />
        <RouterLink to="/admin" style={{ margin: "auto" }}>
          <Typography variant="h6" style={{ color: "white" }}>
            Admin Desktop
          </Typography>
        </RouterLink>
        <IconButton onClick={onDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRight style={{ color: "white" }} />
          ) : (
            <ChevronLeft style={{ color: "white" }} />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {dataList.map((data, index) => (
          <ListItem button key={data.text} onClick={data.redirect}>
            <ListItemIcon style={{ color: "white" }}>{data.icon}</ListItemIcon>
            <ListItemText primary={data.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {actionsList.map((data, index) => (
          <ListItem button key={data.text} onClick={data.redirect}>
            <ListItemIcon style={{ color: "white" }}>{data.icon}</ListItemIcon>
            <ListItemText primary={data.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
const mapStateToProps = (state) => {
  return {
    id: state.auth.id
  };
};
const mapDispatchToProps = {logout: startLogout}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SidebarAdmin))
