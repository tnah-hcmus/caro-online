import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import PlayerDetail from "./PlayerDetail";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
}));

function ListPlayer(props) {
  const { user } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        Total: {user} online
      </Grid>
      <PlayerDetail />
      <PlayerDetail />
      <PlayerDetail />
      <PlayerDetail />
      <PlayerDetail />
      <PlayerDetail />
      <PlayerDetail />
      <PlayerDetail />
    </Grid>
  );
}

export default ListPlayer;
