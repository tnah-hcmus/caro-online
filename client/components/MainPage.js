import React, { useState, useEffect } from "react";
import Copyright from "./common/Copyright";
import WSClient from "../socket/socket";
import WSObserver from "../socket/observer";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import ListRoom from "./room/ListRoom";
import ListPlayer from "./player/ListPlayer";

const MainPage = (props) => {
  const [user, setUser] = useState([]);
  console.log('reset')
  useEffect(() => {
    console.log("reload");
    if(WSClient.isNull()) {
      console.log("true")
      WSClient.connect(props.userId);
    }
    else {
      console.log('false');
      WSClient.reUpdate();
    }
    WSObserver.startListenUpdateUser(setUser);
    return () => WSClient.unsubscribe("update-user");
  });

  return (
    <>
      <Grid container style={{ minHeight: "calc(100vh - 114px)" }}>
        <Grid item xs={12} md={10}>
          <ListRoom userId={props.userId} />
        </Grid>
        <Grid item xs={12} md={2}>
          <ListPlayer user={user} />
        </Grid>
      </Grid>
      <Grid>
        <Copyright />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
  };
};

export default connect(mapStateToProps)(MainPage);
