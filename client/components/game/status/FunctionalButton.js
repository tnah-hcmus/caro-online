import React from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";
const FunctionalButton = ({ icon, title, color, onPress }) => {
  const classes = useStyles();
  return (
    <Grid item xs={11} className={classes.button}>
      <Button variant="contained" color={color} startIcon={icon} onClick={onPress} fullWidth>
        {title}
      </Button>
    </Grid>
  );
};
const useStyles = makeStyles(() => ({
  button: {
    margin: "5px 0",
  },
}));
export default FunctionalButton;
