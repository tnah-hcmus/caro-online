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
import {changeStatus} from '../../action/room/action';
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
  let current = {players: {X: null, Y: null}, status: 0};
  let playerStatus = null;
  for (const item of props.rooms) {
    if (item.id === props.roomID) {
      current = item;
      if (item.players.X.id === props.id) playerStatus = "X";
      else if (item.players.Y.id === props.id) playerStatus = "O";
    }
  }
  console.log(current);
  const [start, setStart] = useState(!!current.status);
  const startGame = () => {
    if(current) {
      if(current.players.X.id === props.id) {
        if(current.players.Y.id && current.players.X.id) {
          props.startGame(props.roomID);
          setStart(true);
        } else console.log("thiếu người, k start game được");
      }
      else console.log('k có quyền');
    }
    
  }
  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" alignContent="stretch">
      
      {
        start 
        ? (
          <>
            <Board player={playerStatus} />
            <BoxChat roomID={props.roomID} />
          </>
        )
        : (
          <Dialog open={!start} onClose={() => setStart(false)}>
        <DialogContent className={classes.root}>
          <div className={classes.infoPlayer}>X: {(current.players.X && current.players.X.name) || 'You'}</div>
          <div className={classes.icon}>
            <img
              height={50}
              width={50}
              src="https://previews.123rf.com/images/vectorplusb/vectorplusb1907/vectorplusb190700006/127029169-vs-letters-or-versus-vector-sign-isolated-on-transparent-background-.jpg"
            />
          </div>
          <div className={classes.infoPlayer}>O: {(current.players.Y && current.players.Y.name) || 'Chưa xác định'}</div>
        </DialogContent>
        <DialogActions className={classes.actions}>
        {
          (current && current.players.X.id === props.id) 
          ?
            (
              current.players.Y.id && current.players.X.id
              ?(<Button onClick={startGame} size="large" variant="contained" color="primary">
                Start
              </Button>)
              : <p>Chờ đối thủ vào trận</p>
            )

          : <p>Chờ chủ phòng bắt đầu trận</p>
        }          
        </DialogActions>
      </Dialog>
        )
      }      
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    roomID: state.auth.inRoom,
    rooms: state.room,
    id: state.auth.id,
  };
};
const mapDispatchToProps = {
  startGame: (id) => changeStatus(id, 1)
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoomView));
