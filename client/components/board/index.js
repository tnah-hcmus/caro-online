import React, {useState} from "react";
import { Grid, makeStyles, Typography, Button } from "@material-ui/core";
import BoardView from "./BoardView";
import calculateWinner from '../../game-logic/calculateWinner';

const useStyles = makeStyles({
  root: {
    margin: 40,
  },
  board: {
    padding: "10px 60px",
    background: "#d2d2d2",
    borderRadius: 12,
  },
  status: {
    padding: "0px 50px",
  },
});

const Board = (props) => {
  const classes = useStyles();
  const players = ['X', 'O'];
  const size = 3;
  const [history, setHistory] = useState([{squares: Array(size*size).fill(null), status: ''}]);
  const [nowPlaying, setNowPlaying] = useState(players[0]);
  const [nowTicking, setNowTicking] = useState('');
  const [winning, setWinning] = useState(null);
  const [step, setStep] = useState(0);
  const [sort, setSort] = useState(false);
  const handleClick = (i,j) => {
    const id = i*size + j; 
    const tickIn = `{${i};${j}}`;
    const curHistory = history.slice(0, step+1);
    const curStep = curHistory.length;
    const squares = curHistory[curStep - 1].squares.slice();
    if (calculateWinner(squares) || squares[id]) {
      return;
    }
    squares[id] = nowPlaying;
    const isWin = calculateWinner(squares);
    setHistory(curHistory.concat({squares, status: tickIn}));
    setNowPlaying(players[curStep%2]);
    setNowTicking(tickIn);
    if(isWin) setWinning(isWin);
    setStep(curStep);
  }
  const getGameStatus = () => {
    const isWin = winning;
    if(isWin) {
      return 'Winner: ' + isWin.winner;
    } else if (step >= 9) {
      return 'Two player draw!'
    } else return 'Next player: ' + (nowPlaying);
  }
  const allMoveButton = () => {
    const allMoves = history.map((step, i) => {
      let desc = i ? `Go to move #${i}; Tick at ${step.status}`: 'Go to game start';
      if(i === step) desc = <b>{desc}</b>
      return (
        <li key={i}>
          <button onClick={() => jumpTo(i)}>{desc}</button>
        </li>
      );
    });
    return sort ? allMoves.reverse() : allMoves;
  }
  const getTurnStatus = () => {
    return nowTicking !== '' ? 
           `${players[(step-1)%2]} tick at ${nowTicking} in his turn` :
           "The game isn't start yet";
  }
  const jumpTo = (i) => {
    const current = history[i];
    const squares = current.squares.slice();
    const isWin = calculateWinner(squares);
    setNowPlaying(players[i%2]);
    setWinning(isWin);
    setNowTicking(current.status);
    setStep(i);
  }

  return (
    <Grid container item xs={8} className={classes.root}>
      <Grid item xs={8} className={classes.board}>
        <BoardView
            squares = {history[step].squares}
            size = {size}
            handleClick = {(i,j) => handleClick(i,j)}
            winning = {winning} 
        />
      </Grid>
      <Grid item xs={4} className={classes.status}>
        <Typography variant="h6" color="initial">
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
          <ol>
            <button onClick= {() => setSort(!sort)}>{sort ? 'Descending order' : 'Ascending order'}</button>
            {allMoveButton()}
          </ol>
        </div>
        <Button variant="contained" color="secondary" size="small">
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default Board;
