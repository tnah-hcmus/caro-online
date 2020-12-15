import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: "5px 10px",
  },
  info: {},
  content: {
    borderRadius: 12,
    color: "white",
    padding: "5px 10px",
    width: "fit-content",
    height: "fit-content",
  },
});

const Message = (props) => {
  const { isMyMessage, message } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.root} justify={isMyMessage && "flex-end"}>
      <Grid item className={classes.content} style={{ background: `${isMyMessage ? "#1d4bcd" : "#727272"}` }}>
        {message}
      </Grid>
    </Grid>
  );
};

export default Message;
