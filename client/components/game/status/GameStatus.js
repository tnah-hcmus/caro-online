import React, { useState } from "react";
import { Grid, makeStyles, Typography, Button } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PanToolIcon from "@material-ui/icons/PanTool";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import InfoIcon from "@material-ui/icons/Info";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Countdown from "../Countdown";
import { updateGameResult, newGame } from "../../../action/room/action";
import { connect } from "react-redux";
import WSObserver from "../../../socket/observer";
import WSSubject from "../../../socket/subject";
// IMPORT ICON
import vsIcon from "../../../assets/images/icons8-vs-button.png";
import vsIconReverse from "../../../assets/images/icons8-vs-button-reverse.png";
import ViewerDetail from "./ViewerDetail";
import PlayerInfo from "./PlayerInfo";
import FunctionalButton from "./FunctionalButton";
import { withRouter } from "react-router-dom";

const Status = (props) => {
  const classes = useStyles();
  const [request, setRequest] = useState(0);
  const [open, setOpen] = useState(false);
  const [requestType, setRequestType] = useState({ type: null, content: null });
  const handleClose = () => setOpen(false);
  console.log("Winning", props.winning);
  const handleDecline = () => {
    WSSubject.sendGameReply({ accept: false, type: requestType.type });
    setRequestType({ type: null, content: null });
    handleClose();
  };
  const handleAccept = () => {
    const type = requestType.type;
    WSSubject.sendGameReply({ accept: true, type });
    setRequestType({ type: null, content: null });
    handleClose();
  };
  const handleShowRequestPopup = (type, content, name) => {
    if (props.player) {
      setRequestType({ type, content });
      setOpen(true);
    } else
      props.setMessage({
        type: "success",
        content: `Player ${name} request ${type == "NEW" ? "start a new game" : "this game will be draw."}`,
        open: true,
      });
  };
  WSObserver.startListenGameRequest(handleShowRequestPopup);
  const handleTimeOut = () => {
    props.setMessage({ type: "error", content: `Time's Up !!!`, open: true });
    props.updateGameResult(props.roomID, (props.player !== "X" ? 1 : 2));
  };
  const handleNewgame = () => {
    if (!props.player || props.player == "")
      props.setMessage({ type: "error", content: `Only player can use this function`, open: true });
    else if (request < 5) {
      if (props.isOwner && props.winning) applyNewGame();
      else {
        setRequest(request + 1);
        WSSubject.sendGameRequest({
          type: "NEW",
          content: "Đối thủ yêu cầu bắt đầu một ván mới. Bạn có đồng ý không ?",
          name: props.player,
        });
        WSObserver.startListenGameReply(handleReply, props.setMessage);
      }
    } else
      props.setMessage({
        type: "error",
        content: `Request new game too much, you was banned and can't request anymore`,
        open: true,
      });
  };
  const applyNewGame = () => props.newGame(props.roomID, props.size);
  const applyDraw = () => props.updateGameResult(props.roomID, 3);
  const handleReply = (type) => {
    switch (type) {
      case "NEW":
        applyNewGame();
        break;
      case "DRAW":
        applyDraw();
        break;
    }
  };
  const requestDraw = () => {
    if (!props.player || props.player === "")
      props.setMessage({ type: "error", content: `Only player can use this function`, open: true });
    else if (props.winning) props.setMessage({ type: "error", content: `Game đã kết thúc`, open: true });
    else if (request < 5) {
      setRequest(request + 1);
      WSSubject.sendGameRequest({ type: "DRAW", content: "Đối thủ xin hoà. Bạn có đồng ý không?", name: props.player });
      WSObserver.startListenGameReply(handleReply, props.setMessage);
    } else
      props.setMessage({
        type: "error",
        content: `Request draw too much, you was banned and can't request anymore`,
        open: true,
      });
  };
  const handleSurrender = () => {
    if (!props.player || props.player === "")
      props.setMessage({ type: "error", content: `Only player can use this function`, open: true });
    else if (!props.winning) {
      props.updateGameResult(props.roomID, props.player !== "X" ? 1 : 2);
      props.updateCoin(props.player !== "X" ? "X" : "O");
    } else props.setMessage({ type: "error", content: `Game has been end, you can't surrender anymore`, open: true });
  };
  return (
    <Grid container className={classes.root}>
      <Grid container item xs={12} className={classes.section} style={{ padding: "15px 0 0" }}>
        <Grid item xs={12} container direction="row" className={classes.title}>
          <Grid item className={classes.icon}>
            <InfoIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6">Info</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} className={classes.statusWrapper}>
          <Grid container item xs={12} justify="space-around" className={classes.infoPlayer}>
            <PlayerInfo
              type={"X"}
              coins={5}
              isWin={props.winning && props.winning.winner === "X"}
              name={props.X.name}
              isTurn={props.isTurn}
              coins={props.X.coins}
            />
            <Grid item xs={2} fontSize="large" className={classes.iconRed}>
              {props.isTurn ? (
                <img src={vsIcon} width={40} height={48} />
              ) : (
                <img src={vsIconReverse} width={40} height={48} />
              )}
            </Grid>
            <PlayerInfo
              type={"O"}
              coins={5}
              isWin={props.winning && props.winning.winner === "O"}
              name={props.O.name}
              isTurn={!props.isTurn}
              coins={props.O.coins}
            />
          </Grid>
          <Grid item xs={12} className={classes.countdown}>
            {props.waiting && !props.winning ? <Countdown time={props.timer} onTimeOut={handleTimeOut} reset = {props.waiting} /> : null}
            <Typography variant="h6">{props.status}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item xs={12} className={classes.section}>
        <Grid item xs={12} container direction="row" className={classes.title}>
          <Grid item className={classes.icon}>
            <SettingsIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6">Function</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="center" className={classes.statusWrapper}>
          <FunctionalButton icon={<FiberNewIcon />} color="secondary" title={"New Game"} onPress={handleNewgame} />
          <FunctionalButton icon={<ThumbUpIcon />} color="primary" title={"Please Draw"} onPress={requestDraw} />
          <FunctionalButton icon={<PanToolIcon />} color="primary" title={"Give Up"} onPress={handleSurrender} />
          <FunctionalButton
            icon={<ExitToAppIcon />}
            color="secondary"
            title={"Leave Room"}
            onPress={() => props.handleLeave(props.player)}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} className={classes.section}>
        <Grid item xs={12} container direction="row" className={classes.title}>
          <Grid item className={classes.icon}>
            <SupervisorAccountIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6">Viewers</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} className={classes.statusWrapper} style={{ maxHeight: 140, overflow: "auto" }}>
          {props.viewers && props.viewers.map((item, i) => <ViewerDetail name={item.name} key={i} />)}
        </Grid>
      </Grid>
      {props.player && props.player !== "" && (
        <Dialog open={open} onClose={handleDecline} className={classes.dialog}>
          <DialogTitle id="form-dialog-title">New request</DialogTitle>
          <DialogContent>{requestType.content}</DialogContent>
          <DialogActions>
            <Button onClick={handleAccept} variant="contained" color="primary">
              Accept
            </Button>
            <Button onClick={handleDecline} color="primary">
              Decline
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};
const mapDispatchToProps = {
  updateGameResult,
  newGame,
};
export default connect(null, mapDispatchToProps)(withRouter(Status));

const useStyles = makeStyles((theme) => ({
  section: {},
  title: {
    fontWeight: "bold",
  },
  statusWrapper: {
    background: "#ddd",
    borderRadius: "0.8rem",
    padding: 5,
    marginBottom: 20,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    "&> button": {
      margin: "5px 0",
    },
  },
  icon: {
    margin: "auto 0",
  },
  iconRed: {
    margin: "auto 0",
    color: "red",
  },
  infoPlayer: {
    margin: 5,
    "&>div": {
      textAlign: "center",
    },
  },
  counter: {},
  countdown: {
    textAlign: "center",
    overflow: "hidden",
  },
}));
