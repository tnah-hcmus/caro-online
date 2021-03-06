import React, { useState } from "react";
import { Grid, TextField, Typography, Button, Dialog, DialogContent, Avatar } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import { startLoginAdmin } from "../../action/auth/action";
import { connect } from "react-redux";
import CustomizedSnackbars from "../common/CustomizedSnackbars";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import {withRouter} from 'react-router-dom'

const AdminLoginPanel = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    props.login(username, password, props.token, props.history, setMessage);
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
                PLEASE LOGIN TO ADMIN DASHBOARD
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmitLogin}>
                <TextField
                  id="username"
                  autoComplete="username"
                  fullWidth
                  margin="normal"
                  required
                  label="Username"
                  variant="outlined"
                  className={classes.textFiled}
                />
                <TextField
                  id="password"
                  autoComplete="password"
                  fullWidth
                  margin="normal"
                  required
                  label="Password"
                  variant="outlined"
                  type="password"
                  className={classes.textFiled}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Log In
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick = {() => props.history.push('/')}>
                  Go back
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
const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}
const mapDispatchToProps = { login: startLoginAdmin };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminLoginPanel));
