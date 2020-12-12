import React from "react";
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

export default function ListRoom() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid container item xs={12} direction="row" justify="space-between" className={classes.functionBtn}>
        <AddRoomBtn />
        <JoinRoomBtn />
      </Grid>
      <Grid container item xs={12} spacing={2} className={classes.room}>
        <RoomDetail />
        <RoomDetail />
        <RoomDetail />
        <RoomDetail />
        <RoomDetail />
        <RoomDetail />
        <RoomDetail />
        <RoomDetail />
      </Grid>
    </Grid>
  );
}
