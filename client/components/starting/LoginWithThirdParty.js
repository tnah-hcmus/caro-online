import React, {useEffect} from 'react';
import {Backdrop, CircularProgress} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {startLoginThirdParty} from '../../action/auth/action';
import {connect} from 'react-redux';
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const LoadingLogin = (props) => {
  const classes = useStyles();
  useEffect(() => {
    if (window.location.hash === "#_=_") window.location.hash = "";

    const cookieJwt = Cookies.get("x-auth-cookie");
    if (cookieJwt) {
      Cookies.remove("x-auth-cookie");
      props.loginThirdParty(cookieJwt, props.history);
    }
    else props.history.push('/');
  }, [])
  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </div>
  );
}
const mapDispatchToProps = {
  loginThirdParty: startLoginThirdParty
}
export default connect(null, mapDispatchToProps)(withRouter(LoadingLogin));