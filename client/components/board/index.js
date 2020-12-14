import React from "react";
import { Grid, makeStyles, Typography, Button } from "@material-ui/core";
import Square from "./square";

const useStyles = makeStyles({
  root: {
    margin: 40,
  },
  board: {
    padding: "10px 95px",
    background: "#d2d2d2",
    borderRadius: 12,
  },
  status: {
    padding: "0px 50px",
  },
});

function Board(props) {
  const classes = useStyles();

  const renderSquare = (i) => {
    return <Square />;
  };

  return (
    <Grid container item xs={9} className={classes.root}>
      <Grid item xs={8} className={classes.board}>
        {[...Array(13).keys()].map((i) => (
          <div className="board-row" key={i}>
            {[...Array(13).keys()].map((j) => renderSquare(i * 13 + j))}
          </div>
        ))}
      </Grid>
      <Grid item xs={4} className={classes.status}>
        <Typography variant="h6" color="initial">
          Turn: X
        </Typography>
        <Typography variant="h6" color="initial">
          X: Player 1
        </Typography>
        <Typography variant="h6" color="initial">
          O: Player 2
        </Typography>
        <Button variant="contained" color="secondary" size="small">
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default Board;
