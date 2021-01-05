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
import GameReview from '../components/game-review/Review';

const PrivateRoutes = (props) => {
  if (props.isAuthenticated) {
    if(props.role == "admin") return (
      <Switch>
        <Route path="/admin" component={AdminLoginPanel} />
        {
          props.secretKey
          ?
          <></>
          : null
        }
      </Switch>
    )
    else return (
      <Header>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/room/:id" component={RoomView} />
          <Route path="/profile" component={Profile} />
          <Route path="/changepassword" component={ChangePassword} />
          <Route path="/review/:id" component = {GameReview}/>
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Header>
    );
  } else {
    return (
      <Switch>
        <Route path="/" component={StartPage} exact />
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
    role: state.user.role,
    secretKey: state.user.secretKey
  };
};

export default connect(mapStateToProps)(PrivateRoutes);
