import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px 20px",
  },
}));

const QuickJoinRoomBtn = () => {
  const classes = useStyles();
  const roomIdRef = useRef();

  const handleJoinRoom = () => {};

  return (
    <Grid item>
      <Button
        startIcon={<SearchIcon />}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleJoinRoom}
      >
        Quick Join
      </Button>
    </Grid>
  );
};

export default QuickJoinRoomBtn;
