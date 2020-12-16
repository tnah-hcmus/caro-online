import React, {useRef} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

import {addPlayer} from '../../action/room/action';
import {joinState} from '../../action/auth/auth';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import WSClient from "../../socket/client";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px 20px",
  },
}));

const JoinRoomBtn = (props) => {
  const classes = useStyles();
  const roomIdRef = useRef();
  const handleJoinRoom = () => {
    if(!props.busy) {
      const id = roomIdRef.current.value;
      WSClient.joinChannel(id);
      props.addPlayer(id, props.userId);
      props.joinState(id);
      props.history.push('/room/'+id);
    }
  }
  return (
    <Grid item>
      <TextField id="roomId" size="small" type="text" label="Room ID" inputRef = {roomIdRef}/> 
      <Button variant="contained" color="primary" className={classes.button} onClick = {handleJoinRoom} >
        Join room
      </Button>
    </Grid>
  );
}
const mapDispatchToProps = {
  addPlayer, joinState
};
const mapStateToProps = (state) => {
  return {
    busy: state.auth.inRoom
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JoinRoomBtn));