import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BoardView from "../board/BoardView";
import Status from "./status/GameStatus";
import calculateWinner from "../../game-logic/calculateWinner";

import { addBoard, createBoard } from "../../action/history/action";
import { updateCoins } from "../../action/room/action";
import { updateUserAfterGame } from "../../action/user/action";

import WSSubject from "../../socket/subject";
import WSObserver from "../../socket/observer";
import WSClient from '../../socket/socket';
import { connect } from "react-redux";
import CustomizedSnackbars from "../common/CustomizedSnackbars";
import Loading from "../common/Loading";
const drawFlag = "___NO_BODY_WIN___";

const useStyles = makeStyles({
  root: {
    // margin: "15px 5px",
  },
  board: {
    marginTop: 20,
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
  const [canView, setCanView] = useState(props.player !== "");
  console.log("can view from Game", canView);
  const [message, setMessage] = useState();
  const size = 20;
  const roomInfo = props.rooms[props.roomID];
  let step = 0,
    winning = null,
    current = [],
    player = null,
    timestamp = 0;
  if (!props.history) {
    props.createBoard(props.roomID, size, props.player);
    current = Array(size * size).fill(null);
  } else {
    step = props.history.length - 1;
    winning = props.history[step].status;
    current = props.history[step].squares;
    player = props.history[step].player;
    timestamp = props.history[step].timestamp;
  }
  switch (roomInfo.result) {
    case 1:
      winning = { winArea: [], winner: "X" };
      break;
    case 2:
      winning = { winArea: [], winner: "O" };
      break;
    case 3:
      winning = { winArea: [], winner: drawFlag };
      break;
  }
  const updateCoin = (winner) => {
    if (props.player !== "") props.updateUserAfterGame(roomInfo.coins, winner == props.player);
    if (winner == "X") {
      props.updateCoins(props.roomID, "X", roomInfo.players.X.coins + roomInfo.coins);
      props.updateCoins(props.roomID, "Y", roomInfo.players.Y.coins - roomInfo.coins);
    }
    if (winner == "O") {
      props.updateCoins(props.roomID, "X", roomInfo.players.X.coins - roomInfo.coins);
      props.updateCoins(props.roomID, "Y", roomInfo.players.Y.coins + roomInfo.coins);
    }
  };
  
  const handleClick = (i, j) => {
    if (winning) setMessage({ type: "error", content: "Game đã kết thúc", open: true });
    else if (props.player === "") setMessage({ type: "error", content: "Bạn không phải là người chơi", open: true });
    else if (props.player === player) setMessage({ type: "error", content: "Hãy chờ tới lượt của bạn", open: true });
    else updateBoard(i, j, props.player);
  };
  useEffect(() => {
    WSObserver.startListenUpdateGameData(props.addBoard, canView, setCanView, updateCoin);
    return () => WSClient.unsubscribe('new-game-data');
  }, [])
  WSObserver.startListenGameResult(updateCoin);
  
  const updateBoard = (i, j, player) => {
    const id = i * size + j;
    const squares = current.slice();
    if (winning) setMessage({ type: "error", content: "Game đã kết thúc", open: true });
    else if (squares[id]) setMessage({ type: "error", content: "Ô này đã được đánh", open: true });
    else {
      squares[id] = player;
      const isWin = calculateWinner(id, squares, squares[id], size);
      if (isWin) {
        console.log("update coin in update Board");
        updateCoin(isWin.winner);
      }
      props.addBoard(props.roomID, squares, isWin, player);
      WSSubject.sendGameData({ roomID: props.roomID, squares, status: isWin, player, x: i, y: j });
    }
  };

  const getGameStatus = () => {
    if (winning) {
      if (winning.winner !== drawFlag) return "Winner: " + winning.winner;
      else return "Two player draw!";
    } else if (step >= size * size) {
      return "Two player draw!";
    } else return "Playing..";
  };

  return (
    <>
      {canView ? (
        <Grid container item xs={12} md={9} className={classes.root}>
          <Grid item xs={8} className={classes.board}>
            <BoardView
              squares={current}
              size={size}
              handleClick={handleClick}
              winning={winning}
              setMessage={setMessage}
            />
          </Grid>
          <Grid item xs={4} className={classes.status}>
            <Status
              X={roomInfo.players.X}
              O={roomInfo.players.Y}
              status={getGameStatus()}
              winning={winning}
              isTurn={roomInfo.players.X.id === props.userId ? props.player !== player : props.player === player}
              roomID={props.roomID}
              player={props.player}
              waiting={props.player !== "" && player && props.player !== player}
              size={size}
              setMessage={setMessage}
              isOWner={roomInfo.players.X.id === props.userId}
              timer={roomInfo.timer}
              lastTimestamp={timestamp}
              handleLeave={props.handleLeave}
              viewers={roomInfo.viewer}
              updateCoin={updateCoin}
            />
          </Grid>
          <CustomizedSnackbars message={message} />
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    history: state.history[state.auth.inRoom],
    roomID: state.auth.inRoom,
    rooms: state.room,
    userId: state.auth.id,
  };
};
const mapDispatchToProps = {
  addBoard,
  createBoard,
  updateCoins,
  updateUserAfterGame,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
