import React, {useRef} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

import {addPlayer} from '../../action/room/action';
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px 20px",
  },
}));

const JoinRoomBtn = (props) => {
  const classes = useStyles();
  const roomIdRef = useRef();
  const handleJoinRoom = () => {
    const id = roomIdRef.current.text;
    console.log(roomIdRef.current);
    props.addPlayer(id, props.userId);
  }

  return (
    <Grid item>
      <TextField id="roomId" size="small" type="text" label="Room ID" /> 
      <Button variant="contained" color="primary" className={classes.button} onClick = {handleJoinRoom} ref = {roomIdRef} >
        Join room
      </Button>
    </Grid>
  );
}
const mapDispatchToProps = {
  addPlayer
};
export default connect(null, mapDispatchToProps)(JoinRoomBtn);