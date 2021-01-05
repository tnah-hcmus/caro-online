import React, {useState, useEffect} from "react";
import { Grid, makeStyles, TextField } from "@material-ui/core";
import BoardView from "../board/BoardView";
import calculateWinner from "../../game-logic/calculateWinner";
import CustomizedSnackbars from "../common/CustomizedSnackbars";
const drawFlag = "___NO_BODY_WIN___";
import Axios from 'axios';

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
const getListMove = (id, token) => {
    return Axios.get(
        "/api/games/" + id,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
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
  const size = 20;
  useEffect(() => {
    const gameId = props.match.params.id
    const getMoveAndInitHistory = async () => {
        const game = await getListMove(gameId, token);
        const list = game.history;
        const customList = [{x: null, y: null, player: null}].concat(list);
        setListMove(customList);
        const allBoard = list.reduce((history, move) => {
            let squares = history[history.length - 1].squares.slice();
            squares[move.x*size + move.y] = move.player;
            history = history.concat({squares, isWin: null});
            return history;
        }, [{squares: Array(size*size).fill(null), isWin: null}]);
        setHistory(allBoard);
    }
    getMoveAndInitHistory();    
  }, [])
  const viewStep = (step) => {
    let isWin = history[step].isWin;
    if(step) {
        const {x, y, player} = listMove[step];
        const id = x * size + y;
        const squares = history[step].squares;
        if(!isWin) {
            console.log("calculate isWin");
            isWin = calculateWinner(id, squares, player, size);
            console.log("winning", isWin);
        }
        setWinning(isWin);
    }
    setStep(step);
    if(isWin) {
        history[step].isWin = isWin;
        setHistory([...history]);
    }
  };

  const getGameStatus = () => {
    if(winning) {
      if(winning.winner !== drawFlag) return "Winner: " + winning.winner;
      else return "Two player draw!";
    } else if ((step >= size * size)) {
      return "Two player draw!";
    } else return "Playing..";
  };

  const viewGameAuto = () => {
      let id = null;
      let step = 0;
      id = setInterval(() => {
          if(step < listMove.length) viewStep(step);
          else clearInterval(id);
          step++;
      }, delay*1000);
      setIntervalId(id);
  }

  const stopAuto = () => {
      clearInterval(intervalId);
  }

  const allMoveButton = () => {
    const allMoves = listMove.map((step, i) => {
      let desc = i ? `Go to move #${i}; Tick at ${step.x}:${step.y} by ${step.player}`: 'Go to game start';
      if(i === step) desc = <b>{desc}</b>
      return (
        <li key={i}>
          <button onClick={() => viewStep(i)}>{desc}</button>
        </li>
      );
    });
    return allMoves;
  }

  return (
    <>
    {history.length
    ?
    <Grid container item xs={12} md={9} className={classes.root}>
      <Grid item xs={8} className={classes.board}>
        <BoardView squares={history[step].squares} size={size} handleClick={() => {setMessage({type: 'error', content: 'Đang trong chế độ xem lại trận đấu, không phải trò chơi', open: true})}} winning={winning}/>
      </Grid>
      {allMoveButton()}
      <button onClick = {viewGameAuto}>Play</button>
      <button onClick = {stopAuto}>Pause</button>
      <TextField  variant="outlined" label="Time" id="time" type="number" onChange = {(e) => setDelay(e.target.value)} fullWidth />
      <CustomizedSnackbars message = {message}/>
    </Grid>
    : <p>Đang tải trận, vui lòng chờ</p>
    }
    </>
    
    
  );
};
export default GameReview;
