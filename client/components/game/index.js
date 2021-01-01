import React from "react";
import { Grid, makeStyles, Typography, Button } from "@material-ui/core";
import BoardView from "../board/BoardView";
import Status from "./status/GameStatus";
import calculateWinner from "../../game-logic/calculateWinner";

import { addBoard, createBoard } from "../../action/history/action";

import WSSubject from "../../socket/subject";
import WSObserver from "../../socket/observer";
import { connect } from "react-redux";
const drawFlag = "___NO_BODY_WIN___"

const useStyles = makeStyles({
  root: {
    // margin: "15px 5px",
  },
  board: {
    marginTop: 45,
    padding: "15px",
    background: "#d2d2d2",
    borderRadius: 12,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  status: {
    padding: "0px 10px 0 30px",
  },
});

const Game = (props) => {
  const classes = useStyles();
  WSObserver.startListenUpdateGameData(props.addBoard);
  const size = 20;
  const roomInfo = props.rooms[props.roomID];
  let step = 0,
    winning = null,
    current = [],
    player = null;
  if (!props.history) {
    props.createBoard(props.roomID, size, props.player);
    current = Array(size * size).fill(null);
  } else {
    step = props.history.length - 1;
    winning = props.history[step].status;
    current = props.history[step].squares;
    player = props.history[step].player;
  }
  switch(roomInfo.result) {
    case 1:
      winning = {winArea: [], winner: "X"}
      break;
    case 2: 
      winning = {winArea: [], winner: "O"}
      break;
    case 3:
      winning = {winArea: [], winner: drawFlag}
      break;
  }
  const handleClick = (i, j) => {
    if (props.player !== player && props.player !== "") {
      updateBoard(i, j, props.player);
    }
  };
  const updateBoard = (i, j, player) => {
    const id = i * size + j;
    const squares = current.slice();
    if (winning || squares[id]) {
      return;
    }
    squares[id] = player;
    const isWin = calculateWinner(id, squares, squares[id], size);

    props.addBoard(props.roomID, squares, isWin, player);
    WSSubject.sendGameData({ roomID: props.roomID, squares, status: isWin, player });
  };

  const getGameStatus = () => {
    if(winning) {
      if(winning.winner !== drawFlag) return "Winner: " + winning.winner;
      else return "Two player draw!";
    } else if ((step >= size * size)) {
      return "Two player draw!";
    } else return "Playing..";
  };

  return (
    <Grid container item xs={12} md={9} className={classes.root}>
      <Grid item xs={8} className={classes.board}>
        <BoardView squares={current} size={size} handleClick={handleClick} winning={winning} />
      </Grid>
      <Grid item xs={4} className={classes.status}>
        <Status X = {roomInfo.players.X} O = {roomInfo.players.Y} status = {getGameStatus()} winning = {winning} isTurn = {roomInfo.players.X.id === props.userId ? props.player !== player : props.player === player} roomID = {props.roomID} player = {props.player} size = {size}/>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    history: state.history[state.auth.inRoom],
    roomID: state.auth.inRoom,
    rooms: state.room,
    userId: state.auth.id
  };
};
const mapDispatchToProps = {
  addBoard,
  createBoard,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
