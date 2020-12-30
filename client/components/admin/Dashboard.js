import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Breadcrumbs, Link, makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Link as RouteLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  label: {
    minWidth: 220,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/" component={RouteLink} className={classes.link}>
          <HomeIcon className={classes.icon} />
          Home
        </Link>
        <Typography color="textPrimary" className={classes.link}>
          <VpnKeyIcon className={classes.icon} />
          Change password
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
