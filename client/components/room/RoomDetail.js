import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const RoomDetail = (props) => {
  const classes = useStyles();
  const join = () => {
    if(!props.busy) {
      props.joinRoom(props.id, props.userId);
    } else if(props.players >= 2) {
      props.setMessage({ type: "error", content: "Phòng đã đủ số lượng người chơi", open: true});
    } else props.setMessage({ type: "error", content: `You already in ${props.busy == props.id ? 'this ': 'another'}room`, open: true});
  }

  return (
    <Grid item xs={4} className={classes.root}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          //   action={
          //     <IconButton aria-label="settings">
          //       <MoreVertIcon />
          //     </IconButton>
          //   }
          title= {"Room ID: " + props.id}
          subheader={props.players + "/2 player"}
        />
        <CardActions className={classes.actions} disableSpacing>
          <Button onClick={join} variant="contained" color="primary" className={classes.button}>
            Join room
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    busy: state.auth.inRoom
  };
};
export default connect(mapStateToProps)(RoomDetail);
