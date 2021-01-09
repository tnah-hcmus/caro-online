import React, { useState, useEffect } from "react";
import { Grid, makeStyles, TextField, Button, Typography } from "@material-ui/core";
import BoardView from "../board/BoardView";
import calculateWinner from "../../game-logic/calculateWinner";
import CustomizedSnackbars from "../common/CustomizedSnackbars";
import SettingsIcon from "@material-ui/icons/Settings";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import BoxChat from "../chat";
import {withRouter} from 'react-router-dom';
const drawFlag = "___NO_BODY_WIN___";
import Axios from "axios";

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
  section: {},
  title: {
    fontWeight: "bold",
  },
  statusWrapper: {
    background: "#ddd",
    borderRadius: "0.8rem",
    padding: 5,
    marginBottom: 20,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    "&> button": {
      margin: "5px 0",
    },
  },
  icon: {
    margin: "auto 0",
  },
  button: {
    margin: "5px 0",
  },
});
const getListMove = (id, token) => {
  return Axios.get("/api/games/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      const listMove = res.data;
      return listMove;
    })
    .catch((e) => {
      console.log(e);
    });
};
const GameReview = (props) => {
  const classes = useStyles();
  const token = props.history.location.state?.token || null;
  const [message, setMessage] = useState();
  const [history, setHistory] = useState([]);
  const [listMove, setListMove] = useState([]);
  const [winning, setWinning] = useState(null);
  const [step, setStep] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [delay, setDelay] = useState(2);
  const [winType, setWinType] = useState(99);
  const [chats, setChats] = useState([]);
  const size = 20;
  useEffect(() => {
    const gameId = props.match.params.id;
    const getMoveAndInitHistory = async () => {
      const game = await getListMove(gameId, token);
      const list = game.history;
      setWinType(game.status);
      setChats(game.chat)
      const customList = [{ x: null, y: null, player: null }].concat(list);
      setListMove(customList);
      const allBoard = list.reduce(
        (history, move) => {
          let squares = history[history.length - 1].squares.slice();
          squares[move.x * size + move.y] = move.player;
          history = history.concat({ squares, isWin: null });
          return history;
        },
        [{ squares: Array(size * size).fill(null), isWin: null }]
      );
      setHistory(allBoard);
    };
    getMoveAndInitHistory();
  }, []);
  const viewStep = (step) => {
    let isWin = history[step].isWin;
    if (step) {
      const { x, y, player } = listMove[step];
      const id = x * size + y;
      const squares = history[step].squares;
      if (!isWin) {
        console.log("calculate isWin");
        isWin = calculateWinner(id, squares, player, size);
        console.log("winning", isWin);
      }
      setWinning(isWin);
    }
    setStep(step);
    if (isWin) {
      history[step].isWin = isWin;
      setHistory([...history]);
    }
  };

  const viewGameAuto = () => {
    let id = null;
    let step = 0;
    id = setInterval(() => {
      if (step < listMove.length) viewStep(step);
      else clearInterval(id);
      step++;
    }, delay * 1000);
    setIntervalId(id);
  };

  const stopAuto = () => {
    clearInterval(intervalId);
  };
  const winnerPrinter = (endType) => {
    let result = null;
    switch(endType) {
      case 1:
        result = "X win this game";
        break;
      case 2:
        result = "Y win this game";
        break;
      case 3:
        result = "Game draw";
        break;
      case 4: case 0:
        result = "Game corrupted, two player leaved";
        break;
      default:
        result = "Calculating";
        break;
    }
    return result;
  }

  const allMoveButton = () => {
    console.log(listMove);
    const allMoves = listMove.map((step, i) => {
      let desc = i ? `Go to move #${i}; Tick at ${step.x}:${step.y} by ${step.player}` : "Go to game start";
      if (i === step) desc = <b>{desc}</b>;
      return (
        <li key={i}>
          <button onClick={() => viewStep(i)}>{desc}</button>
        </li>
      );
    });
    return allMoves;
  };

  return (
    <>
      {history.length ? (
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" alignContent="stretch">
          <Grid container item xs={12} md={9} className={classes.root}>
            <Grid item xs={8} className={classes.board}>
              <BoardView
                squares={history[step].squares}
                size={size}
                handleClick={() => {
                  setMessage({
                    type: "error",
                    content: "Đang trong chế độ xem lại trận đấu, không phải trò chơi",
                    open: true,
                  });
                }}
                winning={winning}
              />
            </Grid>
            <Grid item xs={4} className={classes.status}>
              <Grid container>
                <Grid container item xs={12} className={classes.section} style={{ padding: "15px 0 0" }}>
                  <Grid item xs={12} container direction="row" className={classes.title}>
                    <Grid item className={classes.icon}>
                      <SettingsIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Function</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} justify="center" className={classes.statusWrapper}>
                    <Grid item xs={11} className={classes.button}>
                      <Button variant="contained" color="primary" fullWidth onClick={viewGameAuto}>
                        Play
                      </Button>
                    </Grid>
                    <Grid item xs={11} className={classes.button}>
                      <Button variant="contained" color="secondary" fullWidth onClick={stopAuto}>
                        Pause
                      </Button>
                    </Grid>
                    <Grid item xs={11} className={classes.button}>
                      <TextField
                        variant="outlined"
                        label="Time"
                        size="small"
                        id="time"
                        type="number"
                        onChange={(e) => setDelay(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} className={classes.button}>
                      <Button variant="contained" color="secondary" fullWidth onClick={() => props.history.push(!props.location.pathname.includes('admin') ? '/' : '/admin/dashboard')}>
                        Leave
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.section}>
                  <Grid item xs={12} container direction="row" className={classes.title}>
                    <Grid item className={classes.icon}>
                      <SlowMotionVideoIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Steps</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    justify="center"
                    className={classes.statusWrapper}
                    style={{ maxHeight: "50vh" }}
                  >
                    <Grid item xs={11}>
                      <ul>
                        {allMoveButton()}
                        <li key={'win-end'}>
                          <button disabled = {true}>{winnerPrinter(winType)}</button>
                        </li>
                      </ul>                      
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <CustomizedSnackbars message={message} />
          </Grid>
          <BoxChat isReview={true} timeFlag = {step ? listMove[step].timestamp : 0} chats = {chats} isEnd = {step == (listMove.length -1)}/>
        </Grid>
      ) : (
        <p>Đang tải trận, vui lòng chờ</p>
      )}
    </>
  );
};
export default withRouter(GameReview);
