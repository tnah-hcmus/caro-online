import React, {useRef} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

import {connect} from 'react-redux';

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
      props.joinRoom(id, props.userId);
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
const mapStateToProps = (state) => {
  return {
    busy: state.auth.inRoom
  };
};
export default connect(mapStateToProps)(JoinRoomBtn);