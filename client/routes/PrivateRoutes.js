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
import Dashboard from "../components/admin/dashboard";
import ManageUser from "../components/admin/ManageUser";
import ManageGame from "../components/admin/ManageGame";
import RankChart from "../components/rankchart";

const PrivateRoutes = (props) => {
  if (props.isAuthenticated) {
    if (props.role == "admin")
      return (
        <AdminLayout>
          <Switch>
            <Route path="/admin" component={Dashboard} exact />
            <Route path="/admin/manageuser" component={ManageUser} exact />
            <Route path="/admin/manageuser/:id" component={Profile} />
            <Route path="/admin/managegame" component={ManageGame} exact />
            <Route path="/admin/managegame/:id" component={ManageUser} />
            <Route path="/admin/profile" component={Profile} />
            <Route path="/admin/changepassword" component={ChangePassword} />
            {props.secretKey ? <></> : null}
          </Switch>
        </AdminLayout>
      );
    else
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
        <Route path="/admin" component={AdminLoginPanel} exact />
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
    // role: "admin",
    secretKey: state.user.secretKey,
  };
};

export default connect(mapStateToProps)(PrivateRoutes);
