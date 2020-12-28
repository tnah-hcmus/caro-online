import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { addRoom } from "../../action/room/action";
import { joinState } from "../../action/auth/action";
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    if (!props.busy) {
      props.addRoom(props.userId, (id) => props.history.push("/room/" + id));
    }
  };

  return (
    <Grid item>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Add new room
      </Button>
      <Dialog open={open} onClose={handleClose} className={classes.dialog}>
        <DialogTitle id="form-dialog-title">Add new room</DialogTitle>
        <DialogContent>
          <TextField autoFocus variant="outlined" label="Password" id="password" type="password" fullWidth />
          <TextField variant="outlined" label="Time" id="time" type="number" fullWidth />
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
  };
};
const mapDispatchToProps = {
  addRoom,
  joinState,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddRoomBtn));
