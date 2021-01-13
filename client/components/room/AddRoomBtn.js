import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import { addRoom } from "../../action/room/action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px 20px",
    textTransform: "upcase",
  },
  dialog: {
    minWidth: 200,
  },
}));

const AddRoomBtn = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const timerRef = useRef();
  const passwordRef = useRef();
  const coinRef = useRef();
  const minTimer = 30;
  const maxTimer = 50;
  const minCoins = 1;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!props.busy) {
      const password = passwordRef.current.value || "";
      const timer = Number(timerRef.current.value) || 30;
      const coins = Number(coinRef.current.value) || 1;

      if (coins < 1) {
        props.setMessage({
          type: "error",
          content: "Cược tối thiểu là: " + minCoins + " coin.",
          open: true,
        });
        return false;
      }

      if (coins > props.user.coins) {
        props.setMessage({
          type: "error",
          content: "Bạn chỉ có " + props.user.coins + " coins.",
          open: true,
        });
        return false;
      }

      if (timer < minTimer || timer > maxTimer) {
        props.setMessage({
          type: "error",
          content: "Thời gian suy nghĩ phải nằm trong khoảng " + minTimer + " đến " + maxTimer + " giây",
          open: true,
        });
        return false;
      } else {
        setOpen(false);
        props.addRoom(props.userId, props.user.name, props.user.coins, password || null, timer, coins, (id) =>
          props.history.push("/room/" + id)
        );
      }
    } else {
      props.setMessage({ type: "error", content: `You already in another room`, open: true });
    }
  };

  return (
    <Grid item>
      <Button onClick={handleClickOpen} variant="contained" color="primary" className={classes.button} start={<Add />}>
        Add new room
      </Button>
      <Dialog open={open} onClose={handleClose} className={classes.dialog}>
        <DialogTitle id="form-dialog-title">Add new room</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={passwordRef}
            autoFocus
            variant="outlined"
            label="Password"
            id="password"
            type="password"
            fullWidth
            style={{ marginBottom: 15 }}
          />
          <TextField
            inputRef={timerRef}
            variant="outlined"
            label="Time"
            id="time"
            type="number"
            fullWidth
            style={{ marginBottom: 15 }}
          />
          <TextField
            inputRef={coinRef}
            variant="outlined"
            label="Coins"
            id="coin"
            type="number"
            fullWidth
            style={{ marginBottom: 15 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    busy: state.auth.inRoom,
    user: state.user,
  };
};
const mapDispatchToProps = {
  addRoom,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddRoomBtn));
