import React, { useEffect } from "react";
import { Grid, makeStyles, Typography, Button } from "@material-ui/core";
import BoardView from "./BoardView";
import Status from "./Status";
import calculateWinner from "../../game-logic/calculateWinner";

import { addBoard, createBoard } from "../../action/history/action";

import WSSubject from "../../socket/subject";
import WSObserver from "../../socket/observer";
import { connect } from "react-redux";

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

const Board = (props) => {
  const classes = useStyles();
  WSObserver.startListenUpdateGameData(props.addBoard);
  console.log(props);
  const size = 20;
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
    console.log(props.history);
    player = props.history[step].player;
  }
  const handleClick = (i, j) => {
    console.log(props.player, player);
    if (props.player !== player) {
      updateBoard(i, j, props.player);
    }
  };
  const updateBoard = (i, j, player) => {
    const id = i * size + j;
    const squares = current.slice();
    console.log(squares, winning);
    if (winning || squares[id]) {
      return;
    }
    squares[id] = player;
    const isWin = calculateWinner(id, squares, squares[id], size);
    console.log(squares, isWin);
    props.addBoard(props.roomID, squares, isWin, player);
    WSSubject.sendGameData({ roomID: props.roomID, squares, status: isWin, player });
  };

  const getGameStatus = () => {
    if (winning) {
      return "Winner: " + winning.winner;
    } else if (step >= size * size) {
      return "Two player draw!";
    } else return "Playing..";
  };

  return (
    <Grid container item xs={12} md={9} className={classes.root}>
      <Grid item xs={8} className={classes.board}>
        <BoardView squares={current} size={size} handleClick={handleClick} winning={winning} />
      </Grid>
      <Grid item xs={4} className={classes.status}>
        {/* <Typography variant="h6" color="initial">
          Turn: {getGameStatus()}
        </Typography>
        <Typography variant="h6" color="initial">
          X: Player 1
        </Typography>
        <Typography variant="h6" color="initial">
          O: Player 2
        </Typography>
        <div className="status">{getGameStatus()}</div>
        <div className="game-info">
          <div>{status}</div>
        </div>
        <Button variant="contained" color="secondary" size="small">
          Leave Room
        </Button> */}
        <Status />
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    history: state.history[state.auth.inRoom],
    roomID: state.auth.inRoom,
  };
};
const mapDispatchToProps = {
  addBoard,
  createBoard,
};
export default connect(mapStateToProps, mapDispatchToProps)(Board);
