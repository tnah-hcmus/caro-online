import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import StartPage from "../components/starting/StartingTemplate";
import LoadingLogin from "../components/starting/LoginWithThirdParty";
import AdminLoginPanel from "../components/starting/AdminLoginPanel";
import Copyright from "../components/common/Copyright";
import NotFound from "../components/common/404";
import MainPage from "../components/MainPage";
import Header from "../components/layout/Header";
import RoomView from "../components/room/RoomView";
import ResetPasswordPanel from "../components/starting/ResetPassword";
import ForgotPasswordPanel from "../components/starting/ForgotPassword";
import Profile from "../components/player/Profile";
import ChangePassword from "../components/starting/ChangePassword";

const PrivateRoutes = (props) => {
  if (props.isAuthenticated) {
    return (
      <Header>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/room/:id" component={RoomView} />
          <Route path="/profile" component={Profile} />
          <Route path="/changepassword" component={ChangePassword} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Header>
    );
  } else {
    return (
      <Switch>
        <Route path="/" component={StartPage} exact />
        <Route path="/admin" component={AdminLoginPanel} />
        <Route path="/auth/success" component={LoadingLogin} />
        <Route path="/password/forgot" component={ForgotPasswordPanel} />
        <Route path="/password/reset" component={ResetPasswordPanel} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.token,
    // isAuthenticated: true,
  };
};

export default connect(mapStateToProps)(PrivateRoutes);
