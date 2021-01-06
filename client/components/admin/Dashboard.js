import React, { useState, useEffect } from "react";
import { Typography, Breadcrumbs, Link, makeStyles, Grid } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { getUsersList } from "../../action/user/action";
import { connect } from "react-redux";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import GamesIcon from "@material-ui/icons/Games";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Link as RouterLink } from "react-router-dom";

import "./style.css";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 30,
    height: 30,
  },
  label: {
    minWidth: 220,
  },
  box: {
    margin: "10px 0",
    background: "#ddd",
    boxShadow: "0 2px 8px grey",
    borderRadius: 8,
    width: "100%",
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
        <Typography variant="h6" color="textPrimary" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Dashboard
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={2} direction="row" className={classes.box}>
        <Grid item lg={3} xs={6}>
          <div className="small-box bg-info">
            <div className="inner">
              <h3>150</h3>
              <p>Users</p>
            </div>
            <div className="icon">
              <PeopleAltIcon />
            </div>
            <Link to="/admin/manageuser" className="small-box-footer" component={RouterLink}>
              More info
            </Link>
          </div>
        </Grid>

        <Grid item lg={3} xs={6}>
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>150</h3>
              <p>Games</p>
            </div>
            <div className="icon">
              <GamesIcon />
            </div>
            <Link to="/admin/managegame" className="small-box-footer" component={RouterLink}>
              More info
            </Link>
          </div>
        </Grid>
      </Grid>

      {/* <div className="col-lg-3 col-6">
          <div className="small-box bg-success">
            <div className="inner">
              <h3>
                53<p style={{ fontSize: 20 }}>%</p>
              </h3>

              <p>Bounce Rate</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars"></i>
            </div>
            <a href="#" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.auth.token });
const mapDispatchToProps = { getUsersList };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
