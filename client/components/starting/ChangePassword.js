import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Breadcrumbs, Link, makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Link as RouteLink } from "react-router-dom";
import CustomizedSnackbars from "../common/CustomizedSnackbars";
import {changePassword} from '../../action/auth/action';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  label: {
    minWidth: 220,
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const ChangePassword = (props) => {
  const classes = useStyles();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRetypePassword, setRetypePassword] = useState("");
  const [message, setMessage] = useState(null);
  const handleChangePassword = async () => {
    if(newPassword !== newRetypePassword) {
      setMessage({ type: "error", content: "Mật khẩu mới không khớp", open: true })
      return;
    } else if (newPassword.length < 7) {
      setMessage({ type: "error", content: "Mật khẩu mới phải dài hơn 7 ký tự", open: true })
      return;
    } else {
      const reply = await props.changePassword(oldPassword, newPassword, props.id, props.token);
      if(!reply.status) {
        setMessage(reply.content);
      } else props.history.push('/');
    }    
  };
  return (
    <div>
      <Grid
        container
        spacing={1}
        direction="column"
        justify="center"
        alignItems="flex-start"
        alignContent="center"
        wrap="nowrap"
        style={{ padding: 40 }}
      >
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/" component={RouteLink} className={classes.link}>
              <HomeIcon className={classes.icon} />
              Home
            </Link>
            <Typography color="textPrimary" className={classes.link}>
              <VpnKeyIcon className={classes.icon} />
              Change password
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} style={{ width: "100%", padding: "10px 0" }}>
          <Divider />
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item container spacing={1} xs={12}>
            <Grid item>
              <Typography variant="h6" color="initial" className={classes.label}>
                Current password:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="currentPassword"
                size="small"
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={1} xs={12}>
            <Grid item>
              <Typography variant="h6" color="initial" className={classes.label}>
                New password:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="newPassword"
                size="small"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={1} xs={12}>
            <Grid item>
              <Typography variant="h6" color="initial" className={classes.label}>
                Re-type new password:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="renewPassword"
                size="small"
                type="password"
                onChange={(e) => setRetypePassword(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item className={classes.label}></Grid>
          <Grid item style={{ width: 120, paddingLeft: 8 }}>
            <Button onClick={handleChangePassword} variant="contained" color="primary" fullWidth>
              Save
            </Button>
          </Grid>
          {/* <Grid item style={{ width: 90, paddingLeft: 8 }}>
            <Button onClick={() => setIsEditing(false)} variant="contained" fullWidth>
              Cancel
            </Button>
          </Grid> */}
        </Grid>
        <CustomizedSnackbars message = {message}/>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    id: state.auth.id
  }
}
const mapDispatchToProps = {
  changePassword
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePassword));
