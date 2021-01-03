import React from "react";
import { Grid, Typography, makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import DinosaurIcon from "../../../assets/images/icon-dinosaur.png";
import CrocodileIcon from "../../../assets/images/icon-crocodile.png";
import MedalIcon from "../../../assets/images/icon-medal.png";
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


