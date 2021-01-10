import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Card, CardHeader, CardActions, Avatar} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    justifyContent: "flex-end",
  },
  button: {
    margin: "0 5px",
  },
}));

const RoomDetail = (props) => {
  const classes = useStyles();
  const join = () => {
    if (!props.busy) {
      props.joinRoom(props.id, props.userId);
    } else if (props.players >= 2) {
      props.setMessage({ type: "error", content: "Phòng đã đủ số lượng người chơi", open: true });
    } else
      props.setMessage({
        type: "error",
        content: `You already in ${props.busy == props.id ? "this " : "another"}room`,
        open: true,
      });
  };

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
          //     <Button aria-label="settings">
          //       <MoreVert />
          //     </Button>
          //   }
          title={"Room ID: " + props.id + " | Cược: " + props.coins}
          subheader={props.players + "/2 player"}
        />
        <CardActions className={classes.actions} disableSpacing>
          <Button onClick={join} variant="contained" color="primary" className={classes.button}>
            Join room
          </Button>
          <Button
            onClick={() => props.viewRoom(props.id, props.userId, props.name)}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            View room
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    busy: state.auth.inRoom,
  };
};
export default connect(mapStateToProps)(RoomDetail);
