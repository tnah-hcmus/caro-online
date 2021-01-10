import React from "react";
import { Grid, Typography } from "@material-ui/core";

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
