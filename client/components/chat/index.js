import React, { useRef, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {Send, Forum} from "@material-ui/icons/";
import Message from "./message";
import { addMessage } from "../../action/chat/action";
import WSObserver from "../../socket/observer";

import { connect } from "react-redux";
import moment from "moment";

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
  let a = null;
  let url = null;
  const filename = "caro_" + props.id + ".txt";
  const allMessages = props.isReview ? props.chats.map(item => {
    if((item.timestamp < props.timeFlag) || props.isEnd) {
      return {message: item.message, owner: item.owner, isMyMessage: item.owner == props.name}
    }
  }).filter(item => item) : (props.chat[props.roomID] || []);
  useEffect(() => {
    const endLine = "\r\n";
    if(props.isReview) {
      const data = props.chats.reduce((textData, item) => {
        textData += moment(item.timestamp).format("DD-MM-YYYY hh:mm:ss");
        textData += "  ";
        textData += item.owner;
        textData += ": "
        textData += item.message;
        textData += endLine;
        console.log(textData, item);
        return textData;
      },"");
      const BOM = new Uint8Array([0xEF,0xBB,0xBF]);
      const file = new Blob([BOM, data], {type: "txt;charset=UTF-8"});
      a = document.createElement("a")
      url = URL.createObjectURL(file);
      a.href = url;
      document.body.appendChild(a);
    }
    return () => {
      if(a) document.body.removeChild(a);
      if(url) window.URL.revokeObjectURL(url);
    }
  }, []);
  if(!props.isReview) WSObserver.startListenUpdateChat(props.addMessage);
  const handleChat = () => {
    if(!props.isReview) {
      const timestamp = Date.now();
      const text = chatRef.current.value;
      props.addMessage(props.roomID, text, true, timestamp, props.name);
    }    
  };
  const classes = useStyles();
  return (
    <Grid item container xs={3} className={classes.root}>
      <Grid item xs={12} container direction="row" className={classes.title}>
        <Grid item className={classes.icon}>
          <Forum />
        </Grid>
        <Grid item>
          <Typography variant="h6">Box Chat</Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} className={classes.content} alignItems="flex-end">
        <Grid item xs={12} className={classes.box}>
          {allMessages.map((item, i) => {
            return <Message key={i} isMyMessage={item.isMyMessage} message={item.message} owner={item.owner} />;
          })}
        </Grid>
        

          {
            !props.viewAllChat 
            ?
            <Grid container item xs={12} alignItems="flex-end" direction="row" className={classes.input}>
              <Grid item xs={8} style={{ padding: "0 10px" }}>
              <textarea id="message" className={classes.inputBtn} ref={chatRef} disabled={props.isReview} />
              </Grid> 
              <Grid item xs={4} style={{ margin: "auto", padding: 0 }}>
                <Button
                  start={<Send />}
                  variant="contained"
                  color="primary"
                  disabled={props.isReview}
                  onClick={handleChat}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
            :
            <Grid container item xs={12} alignItems="flex-end" direction="row" className={classes.input}>
              <Grid item xs={6} style={{ padding: "0 10px" }}>
                <Button
                    start={<Send />}
                    variant="contained"
                    color="primary"
                    onClick={() => { a.download = filename; a.click()}}
                >
                  Download chat
                </Button>
              </Grid>
              <Grid item xs={6} style={{ padding: "0 10px" }}>
                <Button
                    start={<Send />}
                    variant="contained"
                    color="primary"
                    onClick={() => {a.click()}}
                >
                  View chat
                </Button>
              </Grid>
           </Grid>
          }            
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    chat: state.chat,
    name: state.user.name,
  };
};
const mapDispatchToProps = {
  addMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(BoxChat);
