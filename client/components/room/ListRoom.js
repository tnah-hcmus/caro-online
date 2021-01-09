import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AddRoomBtn from "./AddRoomBtn";
import JoinRoomBtn from "./JoinRoomBtn";
import QuickJoinRoomBtn from "./QuickJoinRoomBtn";
import RoomDetail from "./RoomDetail";
import WSObserver from "../../socket/observer";
import { updateRoomData, joinRoom, addRoom, leaveRoom, viewRoom, fetchRoom } from "../../action/room/action";
import WSClient from "../../socket/socket";
import WSSubject from "../../socket/subject";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CustomizedSnackbars from "../common/CustomizedSnackbars";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    borderRight: "5px solid #d2d2d2",
    padding: 20,
  },
  functionBtn: {
    margin: "10px 0 20px",
    background: "#eee",
    height: 56,
    borderRadius: "0.8rem",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  room: {
    padding: 10,
    background: "#eee",
    borderRadius: "0.8rem",
    margin: 0,
    height: "calc(100% - 86px)",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
}));

const _createID = () => {
  let guid = "xyxxyx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  return guid.toUpperCase();
};

const ListRoom = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const passwordRef = useRef();
  const [data, setData] = useState({ id: null, userId: null });
  const [message, setMessage] = useState(null);
  const ignoreID = props.history.location.state?.ignore || null;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData({ id: null, userId: null, type: null });
  };
  useEffect(() => {
    WSClient.connect(props.userId);
    WSObserver.startListenUpdateRoomData(props.updateRoomData);
    props.fetchRoom(props.token, ignoreID);
  }, []);
  const afterJoin = (id, userId, password, type) => {
    let result = null;
    if (type === "VIEW") result = props.viewRoom(id, userId, props.user.name, password || null);
    else if (type === "PLAY") result = props.joinRoom(id, userId, props.user.name, props.user.coins, password || null);
    if (result.status) callbackSuccess(id);
    else callbackFailure(result.msg);
  };
  const joinRoom = (id, userId, type) => {
    const item = props.rooms[id];
    if (item) {
      if (item.password && item.password !== "") {
        handleClickOpen();
        setData({ id, userId, type });
      } else afterJoin(id, userId, null, type);
    } else setMessage({ type: "error", content: "Mã phòng không hợp lệ", open: true });
  };
  const handleSubmit = () => {
    const password = passwordRef.current.value;
    afterJoin(data.id, data.userId, password, data.type);
  };
  const callbackSuccess = (id) => {
    props.history.push("/room/" + id);
    handleClose();
  };
  const callbackFailure = (err) => {
    setMessage({ type: "error", content: err, open: true });
    handleClose();
  };
  const timeOut = 10 * 1000;
  const randomRoom = (timeOutHandler) => {
    const room = Object.values(props.rooms).find((item) => (item.roomType === "hidden" && (!!item.players.X.id + !!item.players.Y.id) < 2));
    if (room) {
      joinRoom(room.id, props.userId, "PLAY");
      WSSubject.sendJoinGame({roomID: room.id});
      clearTimeout(timeOutHandler);
    } else {
      const id = _createID();
      props.addRoom(props.userId, props.user.name, props.user.coins, null, 30, 1, null, "hidden", id);
      const timer = setTimeout(() => {
        //hết thời gian chờ trận;
        props.leaveRoom(id, "X", () =>
          setMessage({ type: "error", content: "Tạm thời không tìm thấy đối thủ, vui lòng thử lại sau", open: true })
        );
      }, timeOut);
      WSObserver.startListenQuickGame(() => props.history.push("/room/" + id), id, [timeOutHandler, timer]);
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid container item xs={12} direction="row" justify="space-between" className={classes.functionBtn}>
        <AddRoomBtn userId={props.userId} setMessage={setMessage} />
        <QuickJoinRoomBtn onPress={randomRoom} timeOut={timeOut} setMessage={setMessage} />
        <JoinRoomBtn
          userId={props.userId}
          joinRoom={(id, userId) => joinRoom(id, userId, "PLAY")}
          setMessage={setMessage}
        />
      </Grid>
      <Grid container item xs={12} spacing={2} className={classes.room}>
        {Object.values(props.rooms)
          .filter((item) => item.roomType !== "hidden")
          .map((item, i) => (
            <RoomDetail
              id={item.id}
              key={i}
              players={!!item.players.X.id + !!item.players.Y.id}
              userId={props.userId}
              view={!!item.viewer}
              joinRoom={(id, userId) => joinRoom(id, userId, "PLAY")}
              viewRoom={(id, userId) => joinRoom(id, userId, "VIEW")}
              name={props.user.name}
              coins={item.coins}
              setMessage={setMessage}
            />
          ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} className={classes.dialog}>
        <DialogTitle id="form-dialog-title">Join room</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={passwordRef}
            autoFocus
            variant="outlined"
            label="Password"
            id="password"
            type="password"
            fullWidth
          />
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
      <CustomizedSnackbars message={message} />
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    rooms: state.room,
    user: state.user,
    token: state.auth.token,
  };
};
const mapDispatchToProps = {
  updateRoomData,
  joinRoom,
  addRoom,
  leaveRoom,
  viewRoom,
  fetchRoom,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListRoom));
