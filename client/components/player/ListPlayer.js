import React from "react";
import { Grid } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
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
