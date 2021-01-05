import React, { useState, useEffect } from "react";
import { Typography, Breadcrumbs, Link, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { getUsersList } from "../../action/user/action";
import { connect } from "react-redux";

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

const Dashboard = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getUsersList(props.token);
  }, []);

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Dashboard
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.auth.token });
const mapDispatchToProps = { getUsersList };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
