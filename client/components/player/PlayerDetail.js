import React from "react";

import { Grid } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {AccountCircle, FiberManualRecord} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "transparent",
    margin: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    display: "flex",
    flexDirection: "row",
  },
  info: {
    margin: "auto 5px",
  },
  status: {
    color: "#41ee41",
    height: 10,
    width: 10,
    margin: "auto 5px",
  },
}));

const PlayerDetail =  (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <div className={classes.root}>
        <div className={classes.label}>
          <AccountCircle />
          <div className={classes.info}>{props.name}</div>
        </div>
        <FiberManualRecord size="small" className={classes.status} />
      </div>
    </Grid>
  );
}

export default PlayerDetail;
