import React from "react";
import { Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    padding: "5px 10px",
  },
  info: {},
  content: {
    borderRadius: 12,
    color: "white",
    padding: "5px 10px",
    width: "fit-content",
    height: "fit-content",
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
  },
});

const Message = ({message, isMyMessage, owner}) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} justify={isMyMessage && "flex-end"}>
      {!isMyMessage && (
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="initial">
            {owner}
          </Typography>
        </Grid>
      )}
      <Grid item className={classes.content} style={{ background: `${isMyMessage ? "#1d4bcd" : "#727272"}` }}>
        {message}
      </Grid>
    </Grid>
  );
};

export default Message;
