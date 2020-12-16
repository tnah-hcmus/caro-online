import React, { useRef } from "react";
import { Grid, makeStyles, Button, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ForumIcon from "@material-ui/icons/Forum";
import Message from "./message";
import {addMessage} from '../../action/chat/action';
import WSClient from "../../socket/client";

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

const BoxChat = (props) => {
  const chatRef = useRef();
  const allMessages = props.chat[props.roomID];
  WSClient.startListenUpdateChat(props.addMessage);
  const handleChat = () => {
    const timestamp = Date.now();
    const text = chatRef.current.value;
    WSClient.sendMessage({ roomID: props.roomID, text, timestamp });
    props.addMessage(props.roomID, text, true, timestamp);
  }
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
          {allMessages.map((item) => {
            return <Message isMyMessage = {item.isMyMessage} message = {item.message}/>
          })}
        </Grid>
        <Grid container item xs={12} justify="flex-end" className={classes.input}>
          <Grid item style={{ margin: "auto 0" }}>
            <input id="message" className={classes.inputBtn} ref = {chatRef} />
          </Grid>
          <Grid item style={{ margin: "auto 5px" }}>
            <Button startIcon={<SendIcon />} variant="contained" color="primary" margin="" onClick = {handleChat}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    chat: state.chat,
  };
};
const mapDispatchToProps = {
  addMessage
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxChat);;
