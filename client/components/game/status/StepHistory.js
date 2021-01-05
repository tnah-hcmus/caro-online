import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import DinosaurIcon from "../../../assets/images/icon-dinosaur.png";
import CrocodileIcon from "../../../assets/images/icon-crocodile.png";
import MedalIcon from "../../../assets/images/icon-medal.png";
const History = ({ step }) => {
  return (
    <Grid container item xs={12} direction="row">
      <Grid item style={{ margin: "auto 0" }}>
        <Typography variant="subtitle2">{step.player || "Anonymous"}</Typography>
      </Grid>
      <Grid item style={{ margin: "auto 0" }}>
        <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>{`(${step.x}, ${step.y})`}</Typography>
      </Grid>
    </Grid>
  );
};
export default History;
