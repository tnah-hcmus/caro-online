import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import StartPage from "../components/starting/StartingTemplate";
import LoadingLogin from "../components/starting/LoginWithThirdParty";
import AdminLoginPanel from "../components/starting/AdminLoginPanel";
import Copyright from "../components/common/Copyright";
import NotFound from "../components/common/404";
import MainPage from '../components/MainPage';
const PrivateRoutes = (props) => {
  console.log("test", props.isAuthenticated);
  if (props.isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/" component={StartPage} exact />
        <Route path="/admin" component={AdminLoginPanel} />
        <Route path="/auth/google" component={LoadingLogin} />
        <Route path="/auth/facebook" component={LoadingLogin} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.token,
  };
};

export default connect(mapStateToProps)(PrivateRoutes);
