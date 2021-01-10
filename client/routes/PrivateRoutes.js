import React, { Profiler } from "react";
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
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../components/admin/Dashboard";
import ManageUser from "../components/admin/ManageUser";
import ManageGame from "../components/admin/ManageGame";
import RankChart from "../components/rankchart";
import GameReview from "../components/game-review/Review";
import Rank from "../components/rankchart/index";
import UserDetail from "../components/admin/ManageUser/UserDetail";
import GameDetail from "../components/admin/ManageGame/GameDetail";

const PrivateRoutes = (props) => {
  if (props.isAuthenticated) {
    if (props.secretKey)
      return (
        <AdminLayout>
          <Switch>
            <Route path="/admin/dashboard" component={Dashboard} exact />
            <Route path="/admin/manageuser" component={ManageUser} exact />
            <Route path="/admin/manageuser/:id" component={UserDetail} />
            <Route path="/admin/managegame" component={ManageGame} exact />
            <Route path="/admin/review/:id" component={GameReview} />
            <Route path="/admin/managegame/:id" component={GameDetail} />
            <Route path="/admin/profile" component={Profile} />
            <Route path="/admin/changepassword" component={ChangePassword} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </AdminLayout>
      );
    else
      return (
        <Header>
          <Switch>
            <Route path="/" component={MainPage} exact />
            <Route path="/room/:id" component={RoomView} />
            {props.role && props.role.includes("admin") && (
              <Route path="/admin/login" component={AdminLoginPanel} exact />
            )}
            <Route path="/profile" component={Profile} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route path="/review/:id" component={GameReview} />
            <Route path="/rank" component={Rank} />
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
    secretKey: state.user.secretKey,
  };
};

export default connect(mapStateToProps)(PrivateRoutes);
