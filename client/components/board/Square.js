import React from "react";
const serverUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_SERVER_URL : process.env.DEV_SERVER_URL;
const XIcon = serverUrl + "images/icons8-X.png";
const OIcon = serverUrl + "images/icons8-O.png";
const Square = (props) => {
  const winSquare =
    props.winning && props.winning.winArea.includes(props.j + props.i * props.size)
      ? "square square-winning"
      : "square";
  const icon = props.value === "X" ? XIcon : props.value === "O" ? OIcon : props.value;
  return (
    <button className={winSquare} onClick={() => props.handleClick(props.i, props.j)}>
      {props.value && <img src={icon} width={28} height={28} />}
    </button>
  );
};
export default Square;
