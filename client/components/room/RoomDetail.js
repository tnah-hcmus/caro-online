import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

function RoomDetail() {
  const classes = useStyles();
  const history = useHistory();

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
          title="Room ID: 32123"
          subheader="0/2 player"
        />
        <CardActions className={classes.actions} disableSpacing>
          <Button onClick={() => history.push("/123")} variant="contained" color="primary" className={classes.button}>
            Join room
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default RoomDetail;
