import React, {useEffect} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {startLoginThirdParty} from '../../action/auth/auth';
import {connect} from 'react-redux';
import * as queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const LoadingLogin = (props) => {
  const classes = useStyles();
  useEffect(() => {
    const params = queryString.parse(props.location.search);
    const path = props.location.pathname.includes('google') ? 'Google' : 'FB';
    if(params.error) props.history.push('/');
    else {
      props.loginThirdParty(path, params.code, props.history);
    }
  })
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