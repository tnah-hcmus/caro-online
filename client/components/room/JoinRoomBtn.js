import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px 20px",
  },
}));

function JoinRoomBtn() {
  const classes = useStyles();

  return (
    <Grid item>
      <TextField id="roomId" size="small" type="text" label="Room ID" />
      <Button variant="contained" color="primary" className={classes.button}>
        Join room
      </Button>
    </Grid>
  );
}

export default JoinRoomBtn;
