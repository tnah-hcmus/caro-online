import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button, Breadcrumbs, Link, makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { Link as RouteLink } from "react-router-dom";
import iconMedal from "../../assets/images/icon-medal.png";
import iconDinosaur from "../../assets/images/icon-dinosaur.png";
import EditIcon from "@material-ui/icons/Edit";
import { updateName } from "../../action/user/action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "axios";
const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    marginBottom: 5,
    width: 20,
    height: 20,
  },
  label: {
    minWidth: 110,
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
}));

const getGameList = (token) => {
  return Axios.get("/api/games" + "?filterBy=userGames", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      const listGame = res.data;
      console.log(listGame);
      return listGame;
    })
    .catch((e) => {
      console.log(e);
    });
};

const DividerComponent = () => (
  <Grid item xs={12} style={{ width: "100%", padding: "10px 0" }}>
    <Divider />
  </Grid>
);

const Profile = ({ user, updateName, token, userId, history }) => {
  const classes = useStyles();
  let names = user.name.split(" ");
  const userFirstName = names.pop();
  const userLastName = names.join(" ");
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);
  const [isEditing, setIsEditing] = useState(false);
  const [games, setGames] = useState([]);
  useEffect(() => {
    const fetchGames = async () => {
      const list = await getGameList(token);
      setGames(list);
    };
    fetchGames();
  }, []);

  const handleChangeName = () => {
    const newFirstName = firstName.trim();
    const newLastName = lastName.trim();
    const name = [newLastName, newFirstName].join(" ");
    updateName(name, token, userId);
    setIsEditing(false);
  };
  const declineChangeName = () => {
    setFirstName(userFirstName);
    setLastName(userLastName);
    setIsEditing(false);
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        alignContent="center"
        wrap="nowrap"
        style={{ padding: 40 }}
      >
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/" component={RouteLink} className={classes.link}>
              <HomeIcon className={classes.icon} />
              Home
            </Link>
            <Typography color="textPrimary" className={classes.link}>
              <PersonIcon className={classes.icon} />
              Profile
            </Typography>
          </Breadcrumbs>
        </Grid>
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
                First name:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                autoFocus
                id="firstname"
                size="small"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                variant="outlined"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item style={{ margin: "auto 0", cursor: "pointer" }} onClick={() => setIsEditing(!isEditing)}>
              <EditIcon />
            </Grid>
          </Grid>
          <Grid item container spacing={1} xs={12}>
            <Grid item>
              <Typography variant="h6" color="initial" className={classes.label}>
                Last name:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="lastname"
                size="small"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item style={{ margin: "auto 0", cursor: "pointer" }} onClick={() => setIsEditing(!isEditing)}>
              <EditIcon />
            </Grid>
          </Grid>
        </Grid>
        {isEditing && (
          <Grid container item xs={12}>
            <Grid item className={classes.label}></Grid>
            <Grid item style={{ width: 90, paddingLeft: 8 }}>
              <Button onClick={handleChangeName} variant="contained" color="primary" fullWidth>
                Save
              </Button>
            </Grid>
            <Grid item style={{ width: 90, paddingLeft: 8 }}>
              <Button onClick={declineChangeName} variant="contained" fullWidth>
                Cancel
              </Button>
            </Grid>
          </Grid>
        )}

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
                    {game.start}
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
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.id,
    user: state.user,
  };
};
const mapDispatchToProps = {
  updateName,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));
