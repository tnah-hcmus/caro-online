import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AddRoomBtn from "./AddRoomBtn";
import JoinRoomBtn from "./JoinRoomBtn";
import QuickJoinRoomBtn from "./QuickJoinRoomBtn";
import RoomDetail from "./RoomDetail";
import WSObserver from "../../socket/observer";
import { updateRoomData } from "../../action/room/action";
import WSClient from "../../socket/socket";

import { connect } from "react-redux";

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
  useEffect(() => {
    WSClient.connect(props.userId);
    WSObserver.startListenUpdateRoomData(props.updateRoomData);
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid container item xs={12} direction="row" justify="space-between" className={classes.functionBtn}>
        <AddRoomBtn userId={props.userId} />
        <QuickJoinRoomBtn />
        <JoinRoomBtn userId={props.userId} />
      </Grid>
      <Grid container item xs={12} spacing={2} className={classes.room}>
        {props.rooms.map((item) => (
          <RoomDetail
            id={item.id}
            players={!!item.players.X + !!item.players.Y}
            userId={props.userId}
            view={!!item.viewer}
          />
        ))}
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    rooms: state.room,
  };
};
const mapDispatchToProps = {
  updateRoomData,
};
export default connect(mapStateToProps, mapDispatchToProps)(ListRoom);
