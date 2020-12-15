import React, { useState, useRef } from "react";
import { Grid, makeStyles, Button, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ForumIcon from "@material-ui/icons/Forum";
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
    height: 50,
  },
  inputBtn: {
    height: 30,
    borderRadius: 5,
    border: "1px solid #dedede",
    fontSize: 16,
  },
  box: {
    height: 400,
    maxHeight: 400,
    overflowY: "auto",
  },
});

function BoxChat() {
  const classes = useStyles();

  return (
    <Grid item container xs={4} className={classes.root}>
      <Grid item xs={12} container direction="row" className={classes.title}>
        <Grid item>
          <ForumIcon />
        </Grid>
        <Grid item>
          <Typography variant="h6">Box Chat</Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} className={classes.content} alignItems="flex-end">
        <Grid item xs={12} className={classes.box}>

          <Message isMyMessage={true} message="Pro @@" />
          <Message isMyMessage={false} message="Chicken !!!" />
          <Message isMyMessage={true} message="Pro @@" />
          <Message isMyMessage={false} message="Chicken !!!" />
          <Message isMyMessage={true} message="Pro @@" />
          <Message isMyMessage={false} message="Chicken !!!" />
          <Message isMyMessage={true} message="Chicken !!!" />
        </Grid>
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
