import React, { useState } from "react";
import { Grid, makeStyles, TextField, Typography, Button, Dialog, DialogContent } from "@material-ui/core";
import CustomizedSnackbars from "../common/CustomizedSnackbars";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Avatar from "@material-ui/core/Avatar";
import Cookies from "js-cookie";
import Axios from 'axios';
import {startLoginThirdParty} from '../../action/auth/action';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
const ResetPasswordPanel = (props) => {
  const classes = useStyles();
  const token = Cookies.get('x-update-token');
  const [message, setMessage] = useState(null);
  const handleSubmitReset = (e) => {
    e.preventDefault();
    if(token) {
        const password = e.target.elements.password.value;
        Axios.post('/api/recover/update', {
            password, token
        })
        .then((res) => {
            props.login(res.data, props.history);
        })
        .catch((e) => {
            const error = e.response && e.response.data && e.response.data.message;
            setMessage({ type: "error", content: `${error || e.response.statusText}`, open: true });
        })
    }
    else  setMessage({ type: "error", content: 'Missing reset password token', open: true });    
  };

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Dialog open={true} onClose={() => false} maxWidth="lg">
          <DialogContent>
            <Grid container direction="column" alignItems="center" className={classes.dialog}>
              <Avatar className={classes.avatar}>
                <SupervisorAccountIcon />
              </Avatar>
              <Typography variant="h5" color="initial">
                WELCOME
              </Typography>
              <Typography variant="body2" color="initial">
                UPDATE YOUR PASSWORD
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmitReset}>
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
                  Change password
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
const mapDispatchToProps = {
  login: startLoginThirdParty
}
export default connect(null, mapDispatchToProps)(withRouter(ResetPasswordPanel));
