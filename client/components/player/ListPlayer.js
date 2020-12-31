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

const ListPlayer = (props) => {
  const { user } = props;
  console.log(user)
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        Total: {user.length} online
      </Grid>
      {
        user.map((item,i) => <PlayerDetail key = {i} name = {item}/>)
      }
    </Grid>
  );
}

export default ListPlayer;
