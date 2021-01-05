/*eslint-disable*/
import React from "react";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

import { Link } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";

import IcAdmin from "../../assets/images/icon-admin.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    color: "white",
    background: "#3e435f",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function SidebarAdmin(props) {
  const classes = useStyles();
  const history = useHistory();
  // verifies if routeName is the one active (in browser input)

  const dataList = [
    {
      icon: <SupervisorAccountIcon />,
      text: "Users",
      redirect: () => history.push("/manageuser"),
    },
    {
      icon: <SportsEsportsIcon />,
      text: "Games",
      redirect: () => history.push("/managegame"),
    },
  ];

  const actionsList = [
    {
      icon: <VpnKeyIcon />,
      text: "Change password",
      redirect: () => history.push("/changepassword"),
    },
    {
      icon: <PersonIcon />,
      text: "Edit profile",
      redirect: () => history.push("/profile"),
    },
    {
      icon: <ExitToAppIcon />,
      text: "Log out",
      redirect: () => history.push("/logout"),
    },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} style={{ display: "flex", justifyContent: "space-around" }}>
        <img src={IcAdmin} height={40} weight={40} style={{ margin: "auto" }} />
        <RouterLink to="/admin" style={{ margin: "auto" }}>
          <Typography variant="h5" style={{ color: "white" }}>
            Admin Desktop
          </Typography>
        </RouterLink>
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
