import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

const Countdown = (props) => {
  let { time, onTimeOut } = props;
  if(time < 0) onTimeOut = null;
  const [currentCount, setCount] = useState(time);

  const timer = () => setCount(currentCount - 1);
  useEffect(() => {
    if(onTimeOut) {
      if (currentCount <= 0) {
        onTimeOut();
        return;
      }
      const run = setInterval(timer, 1000);
      return () => clearInterval(run);
    }      
  }, [currentCount]);

  

  return (
    <Typography variant="h5" color="secondary">
      {currentCount}s
    </Typography>
  );
};

export default Countdown;
