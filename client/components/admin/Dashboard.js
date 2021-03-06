import React, { useEffect, useState } from "react";
import { Typography, Breadcrumbs, Link, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Home, PeopleAlt, Games } from "@material-ui/icons";
import { getUsersList, getGamesList } from "../../action/admin/action";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import "./style.css";
import Loading from "../common/Loading";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 22,
    height: 22,
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.getUsersList(props.token, props.secret);
    props.getGamesList(props.token, props.secret);
  }, []);

  useEffect(() => {
    if (props.usersList && props.gamesList) setIsLoading(false);
  }, [props.usersList, props.gamesList]);

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography variant="body1" color="textPrimary" className={classes.link}>
          <Home className={classes.icon} />
          Dashboard
        </Typography>
      </Breadcrumbs>

      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={2} direction="row" className={classes.box}>
          <Grid item lg={3} xs={6}>
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{props.usersList ? props.usersList.length : 0}</h3>
                <p>Users</p>
              </div>
              <div className="icon">
                <PeopleAlt />
              </div>
              <Link to="/admin/manageuser" className="small-box-footer" component={RouterLink}>
                More info
              </Link>
            </div>
          </Grid>

          <Grid item lg={3} xs={6}>
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>{props.gamesList ? props.gamesList.length : 0}</h3>
                <p>Games</p>
              </div>
              <div className="icon">
                <Games />
              </div>
              <Link to="/admin/managegame" className="small-box-footer" component={RouterLink}>
                More info
              </Link>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  secret: state.user.secretKey,
  gamesList: state.admin.gameList,
  usersList: state.admin.userList,
});

const mapDispatchToProps = { getUsersList, getGamesList };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
