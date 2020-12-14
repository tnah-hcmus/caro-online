import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: 10,
  },
  info: {},
  content: {
    border: "1px solid red",
    borderRadius: 12,
    padding: 5,
    width: "fit-content",
    height: "fit-content",
  },
});

function Message(props) {
  const classes = useStyles();
  const { isMyMessage } = props;

  return (
    <Grid container item xs={12} className={classes.root} alignContent={isMyMessage ? "flex-start" : "flex-end"}>
      {isMyMessage && (
        <Grid xs={2} className={classes.info}>
          Player 1
        </Grid>
      )}
      <Grid xs={8} className={classes.content}>
        Chicken !!!
      </Grid>
    </Grid>
  );
}

export default Message;
