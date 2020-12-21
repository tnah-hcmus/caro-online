import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid } from "@material-ui/core";
import AddRoomBtn from "./AddRoomBtn";
import JoinRoomBtn from "./JoinRoomBtn";
import RoomDetail from "./RoomDetail";
import WSObserver from '../../socket/observer';
import {updateRoomData} from '../../action/room/action';
import WSClient from "../../socket/socket";

import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: "5px solid #d2d2d2",
    padding: 20,
  },
  functionBtn: {
    margin: "10px 0",
    background: "#eee",
    borderRadius: "0.8rem",
  },
  room: {
    padding: 10,
    background: "#eee",
    borderRadius: "0.8rem",
    margin: 0,
  },
}));

const ListRoom = (props) => {
  const classes = useStyles();
  useEffect(()=> {
    WSClient.connect(props.userId);
    WSObserver.startListenUpdateRoomData(props.updateRoomData);
  }, [])


  return (
    <Grid container className={classes.root}>
      <Grid container item xs={12} direction="row" justify="space-between" className={classes.functionBtn}>
        <AddRoomBtn userId = {props.userId} />
        <JoinRoomBtn userId = {props.userId} />
      </Grid>
      <Grid container item xs={12} spacing={2} className={classes.room}>
       {
         props.rooms.map(item => <RoomDetail id = {item.id} players = {!!item.players.X + !!item.players.Y} userId = {props.userId} view = {!!item.viewer} />)
       }
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    rooms: state.room
  };
};
const mapDispatchToProps = {
  updateRoomData
};
export default connect(mapStateToProps, mapDispatchToProps)(ListRoom);
