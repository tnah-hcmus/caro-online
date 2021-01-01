import React, { useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PanToolIcon from "@material-ui/icons/PanTool";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import InfoIcon from "@material-ui/icons/Info";
import Countdown from "../Countdown";
import CustomizedSnackbars from "../../common/CustomizedSnackbars";
import { updateGameResult, newGame, leaveRoom } from "../../../action/room/action";
import {connect} from 'react-redux';
// IMPORT ICON
import vsIcon from "../../../assets/images/icons8-vs-button.png";
import vsIconReverse from '../../../assets/images/icons8-vs-button-reverse.png';
import ViewerDetail from './ViewerDetail';
import PlayerInfo from "./PlayerInfo";
import FunctionalButton from './FunctionalButton';
import {withRouter} from 'react-router-dom';

const Status = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const handleTimeOut = () => setMessage({ type: "error", content: `Time's Up !!!`, open: true });

  return (
    <Grid container className={classes.root}>
      <CustomizedSnackbars message={message} />
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
            <PlayerInfo type = {"X"} coins = {5} isWin = {props.winning && props.winning.winner === "X"} name = {props.X.name} isTurn = {props.isTurn}/>
            <Grid item xs={2} fontSize="large" className={classes.iconRed}>
              {props.isTurn ? <img src={vsIcon} width={40} height={48} /> : <img src={vsIconReverse} width={40} height={48} />}
            </Grid>
            <PlayerInfo type = {"O"} coins = {5} isWin = {props.winning && props.winning.winner === "O"} name = {props.O.name} isTurn = {!props.isTurn}/>
          </Grid>
          <Grid item xs={12} className={classes.countdown}>
            <Countdown time={5} onTimeOut={handleTimeOut} />
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
          <FunctionalButton icon = {<FiberNewIcon />} title = {'New Game'} onPress = {() => props.newGame(props.roomID, props.size)} />
          <FunctionalButton icon = {<ThumbUpIcon />} title = {'Please Draw'} onPress = {() => props.updateGameResult(props.roomID, 3)}/>
          <FunctionalButton icon = {<PanToolIcon />} title = {'Give Up'} onPress = {() => props.updateGameResult(props.roomID, (props.player !== "X" ? 2 : 1))}/>
          <FunctionalButton icon = {<ExitToAppIcon />} title = {'Leave Room'} onPress = {() => props.leaveRoom(props.roomID, props.player, () => props.history.push('/'))}/>
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
          <ViewerDetail/>
          <ViewerDetail/>
        </Grid>
      </Grid>
    </Grid>
  );
};
const mapDispatchToProps = {
  updateGameResult, newGame, leaveRoom
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
