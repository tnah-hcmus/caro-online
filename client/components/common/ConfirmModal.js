import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ConfirmModal(props) {
  const { open, title, body, onAgree, onDisagree } = props;

  return (
    <Dialog open={open} onClose={onDisagree}>
      <DialogTitle>{title}</DialogTitle>
      {body && (
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onDisagree} color="primary">
          Disagree
        </Button>
        <Button onClick={onAgree} variant="contained" color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
