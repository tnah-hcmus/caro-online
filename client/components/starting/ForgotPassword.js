import React, { useState } from "react";
import { Grid, TextField, Typography, Button, Dialog, DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedSnackbars from "../common/CustomizedSnackbars";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Avatar from "@material-ui/core/Avatar";
import Axios from "axios";

const ForgotPasswordPanel = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    if (!email) setMessage({ type: "error", content: "Email is not fill", open: true });
    Axios.post("/api/recover/request", {
      email,
    })
      .then((res) => {
        const success = res.response && res.response.data && res.response.data.message;
        setMessage({
          type: "success",
          content: `${success || "A verification email is sent to your email, following to recover your account"}`,
          open: true,
        });
      })
      .catch((e) => {
        const error = e.response && e.response.data && e.response.data.message;
        setMessage({ type: "error", content: `${error || e.response.statusText}`, open: true });
      });
  };

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Dialog open={true} onClose={() => false} maxWidth="lg">
          <DialogContent>
            <Grid container direction="column" alignItems="center" className={classes.dialog}>
              <Avatar className={classes.avatar}>
                <SupervisorAccount />
              </Avatar>
              <Typography variant="h5" color="initial">
                WELCOME
              </Typography>
              <Typography variant="body2" color="initial">
                RECOVER YOUR ACCOUNT
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmitRequest}>
                <TextField
                  id="email"
                  autoComplete="email"
                  fullWidth
                  margin="normal"
                  required
                  label="Email"
                  variant="outlined"
                  type="text"
                  className={classes.textFiled}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Send request
                </Button>
              </form>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
      <CustomizedSnackbars message={message} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    height: "auto",
  },
  dialog: {
    "& > *": {
      margin: "10px 0",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  textFiled: {
    width: 320,
    margin: "10px auto",
  },
  button: {
    width: "50%",
    margin: "10px auto",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default ForgotPasswordPanel;
