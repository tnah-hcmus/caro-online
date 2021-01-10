import React from "react";
import { Grid, Typography, Avatar} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
const serverUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_SERVER_URL : process.env.DEV_SERVER_URL;
const DinosaurIcon = serverUrl + "images/icon-dinosaur.png";
const CrocodileIcon= serverUrl + "images/icon-crocodile.png";
const MedalIcon= serverUrl + "images/icon-medal.png";
const ViewerDetail = ({name}) => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} direction="row">
        <Grid container item xs={9}>
          <Grid item>
            <Avatar
              alt="avatar"
              src={Math.round(Math.random()) ? DinosaurIcon : CrocodileIcon}
              className={classes.small}
            />
          </Grid>
          <Grid item style={{ margin: "auto 0" }}>
            <Typography variant="subtitle2">{name || 'Anonymous'}</Typography>
          </Grid>
        </Grid>
    
        <Grid container item xs={3} justify="flex-end">
          <Grid item>
            <img src={MedalIcon} width={24} height={24} />
          </Grid>
    
          <Grid item style={{ margin: "auto 0" }}>
            <Typography variant="subtitle2" color="secondary">
              Private
            </Typography>
          </Grid>
        </Grid>
    </Grid>
    )
};
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));
export default ViewerDetail;


