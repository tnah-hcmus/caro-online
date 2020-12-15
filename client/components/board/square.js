import React from 'react';
const Square = (props) => {
    const winSquare = props.winning && props.winning.line.includes(props.id) ? "square square-winning" : "square";
    return (
      <button className= {winSquare} onClick={props.onClick}>
        {props.value}
      </button>
    );
}
export default Square;