import React, { useEffect } from "react";

import { makeStyles, Typography, Breadcrumbs, Link, Grid, Divider, TextField, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PersonIcon from "@material-ui/icons/Person";
import { Link as RouteLink, useParams, useHistory } from "react-router-dom";
import iconDinosaur from "../../../assets/images/icon-dinosaur.png";
import iconMedal from "../../../assets/images/icon-medal.png";

import { connect } from "react-redux";
import moment from "moment";

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
    minWidth: 85,
  },
  container: {
    margin: "10px 0",
    background: "#ddd",
    boxShadow: "0 2px 8px grey",
    borderRadius: 8,
    padding: 15,
  },
  avatar: {
    borderRadius: "50%",
    background: "#ddd",
  },
  info: {
    marginLeft: 20,
    paddingLeft: "15px !important",
    borderLeft: "1px solid #ddd",
  },
  historyGame: {
    background: "#d2d2d2",
    borderRadius: 12,
    boxShadow: "0 1px 5px black",
  },
  game: {
    padding: 10,
  },
  textField: {
    width: 300,
  },
}));

const DividerComponent = () => (
  <Grid item xs={12} style={{ width: "100%", padding: "10px 0" }}>
    <Divider />
  </Grid>
);

const UserDetail = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const user = props.usersList.find((user) => user._id == id);
  const games = props.gamesList.filter((game) => user.games.some((usergame) => usergame.id === game._id));

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/admin" component={RouteLink} className={classes.link}>
          <HomeIcon className={classes.icon} />
          <Typography variant="body1" style={{ color: "inherit" }}>
            Dashboard
          </Typography>
        </Link>
        <Link color="inherit" to="/admin/manageuser" component={RouteLink} className={classes.link}>
          <PeopleAltIcon className={classes.icon} />
          <Typography variant="body1" style={{ color: "inherit" }}>
            Manage User
          </Typography>
        </Link>
        <Typography variant="body1" color="textPrimary" className={classes.link}>
          <PersonIcon className={classes.icon} />
          User Detail
        </Typography>
      </Breadcrumbs>

      <DividerComponent />

      <Grid item container spacing={1} xs={12} direction="row" wrap="nowrap">
        <Grid item>
          <img src={iconDinosaur} className={classes.avatar} />
        </Grid>
        <Grid item container direction="column" className={classes.info}>
          <Grid item container direction="row">
            <Grid item>
              <img src={iconMedal} width={35} height={35} />
            </Grid>
            <Grid item>
              <Typography variant="h6" color="secondary">
                {user.coins}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <Typography variant="h6">{"Win: "}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="secondary">
                {user.win}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <Typography variant="h6">{"Lose: "}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="primary">
                {user.lose}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <Typography variant="h6">{"Draw: "}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="secondary">
                {user.draw}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <Typography variant="h6">{"Total: "}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="secondary">
                {user.games.length}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DividerComponent />

      <Grid item container xs={12} spacing={1}>
        <Grid item container spacing={1} xs={12}>
          <Grid item>
            <Typography variant="h6" color="initial" className={classes.label}>
              Email:
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              autoFocus
              id="email"
              size="small"
              className={classes.textField}
              value={user.email}
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Grid item container spacing={1} xs={12}>
          <Grid item>
            <Typography variant="h6" color="initial" className={classes.label}>
              Name:
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="name"
              size="small"
              className={classes.textField}
              value={user.name}
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Grid item container spacing={1} xs={12}>
          <Grid item>
            <Typography variant="h6" color="initial" className={classes.label}>
              Verified:
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="verified"
              size="small"
              className={classes.textField}
              value={user.isVerified ? "True" : "False"}
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Grid item container spacing={1} xs={12}>
          <Grid item>
            <Typography variant="h6" color="initial" className={classes.label}>
              Blocked:
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="blocked"
              size="small"
              className={classes.textField}
              value={user.isBlocked ? "True" : "False"}
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      </Grid>

      <DividerComponent />
      <Grid item container xs={12} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" color="initial">
            Games History
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.historyGame}>
          <Grid item container xs={12} direction="row" justify="space-between" wrap="nowrap" className={classes.game}>
            <Grid item xs={1}>
              <Typography variant="h6" align="center">
                RoomID
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Status</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6" align="center">
                Date
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Actions</Typography>
            </Grid>
          </Grid>
          {(games || []).map((game, i) => (
            <Grid
              key={i}
              item
              container
              xs={12}
              direction="row"
              justify="space-between"
              wrap="nowrap"
              className={classes.game}
            >
              <Grid item xs={1}>
                <Typography variant="subtitle2" align="center">
                  {game.roomID}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2">
                  {game.status === 4 ? "Corrupt game" : game.status === 1 ? "X" : "Draw game"}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" align="center">
                  {moment(game.start).format("DD-MM-YYYY hh:mm:ss")}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/review/" + game._id, { token })}
                >
                  View detail
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { usersList: state.user.usersList, gamesList: state.game.gamesList };
};

export default connect(mapStateToProps)(UserDetail);
