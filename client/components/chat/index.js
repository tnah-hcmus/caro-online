import React from "react";
import { Grid, makeStyles, TextField, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Message from "./message";

const useStyles = makeStyles({
  root: {
    margin: 15,
  },
  content: {
    border: "1px solid black",
    borderRadius: "12px",
    background: "#d2d2d2",
    height: 480,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    padding: 4,
    borderTop: "1px solid #bababa",
  },
  inputBtn: {
    height: 30,
    borderRadius: 5,
    border: "1px solid #dedede",
    fontSize: 16,
  },
});

function BoxChat() {
  const classes = useStyles();

  return (
    <Grid item container xs={3} className={classes.root}>
      <Grid item xs={12} className={classes.title}>
        Box Chat
      </Grid>
      <Grid item container xs={12} className={classes.content}>
        <Message />
        <Message />
        {/* <Message />
        <Message />
        <Message />
        <Message />
        <Message /> */}
        <Grid container item xs={12} justify="flex-end" className={classes.input}>
          <Grid item style={{ margin: "auto 0" }}>
            <input id="message" className={classes.inputBtn} />
          </Grid>
          <Grid item style={{ margin: "auto 5px" }}>
            <Button startIcon={<SendIcon />} variant="contained" color="primary" margin="">
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BoxChat;
