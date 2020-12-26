import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

const Countdown = (props) => {
  const { time, onTimeOut } = props;
  const [currentCount, setCount] = useState(time);

  const timer = () => setCount(currentCount - 1);

  useEffect(() => {
    if (currentCount <= 0) {
      onTimeOut();
      return;
    }
    const run = setInterval(timer, 1000);
    return () => clearInterval(run);
  }, [currentCount]);

  return (
    <Typography variant="h5" color="secondary">
      {currentCount}s
    </Typography>
  );
};

export default Countdown;
