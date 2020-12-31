import React, { useRef } from "react";
import { Grid, makeStyles, Button, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ForumIcon from "@material-ui/icons/Forum";
import Message from "./message";
import { addMessage } from "../../action/chat/action";
import WSObserver from "../../socket/observer";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    padding: 15,
  },
  content: {
    borderRadius: "12px",
    background: "#d2d2d2",
    height: 480,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
    width: "100%",
  },
  box: {
    height: 400,
    maxHeight: 400,
    overflowY: "auto",
  },
  icon: {
    margin: "auto 0",
  },
});

const BoxChat = (props) => {
  const chatRef = useRef();
  const allMessages = props.chat[props.roomID] || [];
  WSObserver.startListenUpdateChat(props.addMessage);
  const handleChat = () => {
    const timestamp = Date.now();
    const text = chatRef.current.value;
    props.addMessage(props.roomID, text, true, timestamp, props.user.name);
  };
  const classes = useStyles();
  return (
    <Grid item container xs={3} className={classes.root}>
      <Grid item xs={12} container direction="row" className={classes.title}>
        <Grid item className={classes.icon}>
          <ForumIcon />
        </Grid>
        <Grid item>
          <Typography variant="h6">Box Chat</Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} className={classes.content} alignItems="flex-end">
        <Grid item xs={12} className={classes.box}>
          {allMessages.map((item, i) => {
            return <Message key = {i} isMyMessage={item.isMyMessage} message={item.message} owner={item.owner} />;
          })}
        </Grid>
        <Grid container item xs={12} alignItems="flex-end" direction="row" className={classes.input}>
          <Grid item xs={8} style={{ padding: "0 10px" }}>
            <textarea id="message" className={classes.inputBtn} ref={chatRef} />
          </Grid>
          <Grid item xs={4} style={{ margin: "auto", padding: 0 }}>
            <Button startIcon={<SendIcon />} variant="contained" color="primary" margin="" onClick={handleChat}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    chat: state.chat,
    user: state.user
  };
};
const mapDispatchToProps = {
  addMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(BoxChat);
