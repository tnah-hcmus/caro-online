import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import Search from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px 20px",
  },
}));

const QuickJoinRoomBtn = ({onPress, timeOut, setMessage}) => {
  const classes = useStyles();
  const [content, setContent] = useState("Quick Join");
  const handleTimeOut = () => {
    setContent("Quick Join");
  }
  const handleClick = () => {
    if(content === "Quick Join") {
      setContent("Đang tìm trận..."); 
      const timer = setTimeout(handleTimeOut, timeOut); 
      onPress(timer);
    } else setMessage({ type: "error", content: `Đang tìm trận, vui lòng chờ`, open: true});
  }
  return (
    <Grid item>
      <Button
        startIcon={<Search />}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick}
      >
        {content}
      </Button>
    </Grid>
  );
};

export default QuickJoinRoomBtn;
