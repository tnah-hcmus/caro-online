import React from 'react';
const Square = (props) => {
    const winSquare = props.winning && props.winning.winArea.includes(props.j+props.i*props.size) ? "square square-winning" : "square";
    return (
      <button className= {winSquare} onClick={() => props.handleClick(props.i, props.j)}>
        {props.value}
      </button>
    );
}
export default Square;