import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px 20px",
  },
}));

const QuickJoinRoomBtn = ({onPress}) => {
  const classes = useStyles();
  const [content, setContent] = useState("Quick Join");
  return (
    <Grid item>
      <Button
        startIcon={<SearchIcon />}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {onPress(); setContent("Đang tìm trận...");}}
      >
        {content}
      </Button>
    </Grid>
  );
};

export default QuickJoinRoomBtn;
