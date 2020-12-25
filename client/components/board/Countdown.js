import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

const Countdown = (props) => {
  const { time } = props;
  const [currentCount, setCount] = useState(30);

  // const timer = setCount(currentCount - 1);

  // useEffect(() => {
  //   if (currentCount <= 0) {
  //     return;
  //   }
  //   const run = setInterval(timer, 1000);
  //   return () => clearInterval(run);
  // }, [currentCount]);

  return <Typography variant="h6">{currentCount}s</Typography>;
};

export default Countdown;
