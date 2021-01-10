import React, { useState } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Board from "../game";
import BoxChat from "../chat";
import { startGame, leaveRoom, leaveViewRoom } from "../../action/room/action";
import { updateInfo } from "../../action/user/action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CustomizedSnackbars from "../common/CustomizedSnackbars";
const serverUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_SERVER_URL : process.env.DEV_SERVER_URL;
const IcVs = serverUrl + 'images/icons8-vs-button.png';
const IcX = serverUrl + "images/icons8-X.png";
const IcO = serverUrl + "images/icons8-O.png";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  actions: {
    justifyContent: "center",
  },
  infoPlayer: {
    border: "1px solid #d2d2d2",
    boxShadow: "0 0.5px 8px red",
    margin: "auto 5px",
    padding: 10,
    fontSize: 18,
    "&>div": {
      margin: "auto 5px",
    },
  },
  icon: {
    maxHeight: 50,
    margin: 5,
  },
});

const RoomView = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  let playerStatus = "";
  let current = props.rooms[props.roomID];
  if (current) {
    if (current.players.X.id === props.id) playerStatus = "X";
    else if (current.players.Y.id === props.id) playerStatus = "O";
  } else current = { players: { X: null, Y: null }, status: 0 };
  const [start, setStart] = useState(!!current.status);
  if (!!start !== !!current.status) setStart(!!current.status);
  const startGame = () => {
    if (current) {
      if (current.players.X.id === props.id) {
        if (current.players.Y.id && current.players.X.id) {
          props.startGame(props.roomID);
          props.updateInfo("total", props.total + 1);
          setStart(true);
        } else setMessage({ type: "error", content: "Chưa đủ người để bắt đầu trận", open: true });
      } else setMessage({ type: "error", content: "Chỉ có chủ phòng mới có quyền bắt đầu trận", open: true });
    }
  };
  const handleLeave = (player) => {
    if (player !== "") props.leaveRoom(props.roomID, player, (ignore) => props.history.push("/", { ignore }));
    else props.leaveViewRoom(props.roomID, props.id, () => props.history.push("/"));
  };
  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" alignContent="stretch">
      {start ? (
        <>
          <Board player={playerStatus} handleLeave={handleLeave} />
          <BoxChat roomID={props.roomID} />
        </>
      ) : (
        <Dialog open={!start} onClose={() => setStart(false)}>
          <DialogContent className={classes.root}>
            <div className={classes.infoPlayer}>
              <img src={IcX} alt="O" width={24} height={24} />
              <div>{(current.players.X && current.players.X.name) || "You"}</div>
            </div>
            <div className={classes.icon}>
              <img height={50} width={50} src={IcVs} />
            </div>
            <div className={classes.infoPlayer}>
              <img src={IcO} alt="O" width={24} height={24} />
              <div>{(current.players.Y && current.players.Y.name) || "Chưa xác định"}</div>
            </div>
          </DialogContent>
          <DialogActions className={classes.actions}>
            {current && current.players.X.id === props.id ? (
              current.players.Y.id && current.players.X.id ? (
                <Button onClick={startGame} size="large" variant="contained" color="primary">
                  Start
                </Button>
              ) : (
                <>
                  <p>Chờ đối thủ vào trận</p>
                  <Button onClick={() => handleLeave(playerStatus)} size="large" variant="contained" color="primary">
                    Leave room
                  </Button>
                </>
              )
            ) : (
              <>
                <p>Chờ chủ phòng bắt đầu trận</p>
                <Button onClick={() => handleLeave(playerStatus)} size="large" variant="contained" color="primary">
                  Leave room
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
      <CustomizedSnackbars message={message} />
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    roomID: state.auth.inRoom,
    rooms: state.room,
    id: state.auth.id,
    total: state.user.total,
  };
};
const mapDispatchToProps = {
  startGame,
  leaveRoom,
  leaveViewRoom,
  updateInfo,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoomView));
