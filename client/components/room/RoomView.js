import React, { useState } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import Board from "../board";
import BoxChat from "../chat";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  actions: {
    justifyContent: "center",
  },
  infoPlayer: {
    border: "1px solid #d2d2d2",
    textAlign: "left",
    margin: "auto 5px",
    padding: 10,
    fontSize: 18,
  },
  icon: {
    maxHeight: 50,
    margin: 5,
  },
});

const RoomView = (props) => {
  const classes = useStyles();
  const [start, setStart] = useState(true);
  console.log(props.roomID);
  let playerStatus = null;
  for (const item of props.rooms) {
    if (item.id === props.roomID) {
      console.log(item.players);
      if (item.players.X === props.id) playerStatus = "X";
      else if (item.players.Y === props.id) playerStatus = "O";
    }
  }
  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" alignContent="stretch">
      <Board player={playerStatus} />
      <BoxChat roomID={props.roomID} />
      <Dialog open={!start} onClose={() => setStart(false)}>
        <DialogContent className={classes.root}>
          <div className={classes.infoPlayer}>Player 1:</div>
          <div className={classes.icon}>
            <img
              height={50}
              width={50}
              src="https://previews.123rf.com/images/vectorplusb/vectorplusb1907/vectorplusb190700006/127029169-vs-letters-or-versus-vector-sign-isolated-on-transparent-background-.jpg"
            />
          </div>
          <div className={classes.infoPlayer}>Player 2:</div>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={() => setStart(true)} size="large" variant="contained" color="primary">
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    roomID: state.auth.inRoom,
    rooms: state.room,
    id: state.auth.id,
    // roomID: "123",
    // rooms: "1",
    // id: "123",
  };
};
export default connect(mapStateToProps)(withRouter(RoomView));
