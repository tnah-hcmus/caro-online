import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AddRoomBtn from "./AddRoomBtn";
import JoinRoomBtn from "./JoinRoomBtn";
import QuickJoinRoomBtn from "./QuickJoinRoomBtn";
import RoomDetail from "./RoomDetail";
import WSObserver from "../../socket/observer";
import { updateRoomData, joinRoom } from "../../action/room/action";
import WSClient from "../../socket/socket";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: "5px solid #d2d2d2",
    padding: 20,
  },
  functionBtn: {
    margin: "10px 0 20px",
    background: "#eee",
    borderRadius: "0.8rem",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  room: {
    padding: 10,
    background: "#eee",
    borderRadius: "0.8rem",
    margin: 0,
    minHeight: "385px !important",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
}));

const ListRoom = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const passwordRef = useRef();
  let data = {id: null, userId: null};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    data = {id: null, userId: null};
  };
  useEffect(() => {
    WSClient.connect(props.userId);
    WSObserver.startListenUpdateRoomData(props.updateRoomData);
  }, []);
  const afterJoin = (id, userId, password) => {
    if(props.joinRoom(id, userId, props.name, password || null)) callbackSuccess(id);
    else callbackFailure();
  }
  const joinRoom = (id, userId) => {
    for(let item of props.rooms) {
      if(item.id == id) {
        if(item.password !== '') {
          handleClickOpen();
          data = {id, userId};
        }
        else afterJoin(id, userId)
      }
    }  
  }
  const handleSubmit = () => {
    const password = passwordRef.current.value;
    afterJoin(data.id, data.userId, password);
  }
  const callbackSuccess = (id) => {
    props.history.push('/room/'+id);
    handleClose();
  }
  const callbackFailure = () => {
    console.log("Failed");
    handleClose();
  }

  return (
    <Grid container className={classes.root}>
      <Grid container item xs={12} direction="row" justify="space-between" className={classes.functionBtn}>
        <AddRoomBtn userId={props.userId} />
        <QuickJoinRoomBtn />
        <JoinRoomBtn userId={props.userId} joinRoom = {joinRoom} />
      </Grid>
      <Grid container item xs={12} spacing={2} className={classes.room}>
        {props.rooms.map((item, i) => (
          <RoomDetail
            id={item.id}
            key = {i}
            players={!!item.players.X + !!item.players.Y}
            userId={props.userId}
            view={!!item.viewer}
            joinRoom = {joinRoom}
          />
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} className={classes.dialog}>
        <DialogTitle id="form-dialog-title">Join room</DialogTitle>
        <DialogContent>
          <TextField inputRef = {passwordRef} autoFocus variant="outlined" label="Password" id="password" type="password" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Join
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  console.log("Debuz", state.user);
  return {
    rooms: state.room,
    name: state.user.name
  };
};
const mapDispatchToProps = {
  updateRoomData, joinRoom
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListRoom));
