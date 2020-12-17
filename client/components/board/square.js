import React from 'react';
const Square = (props) => {
    const winSquare = props.winning && props.winning.winArea.includes(props.id.j+props.id.i*props.size) ? "square square-winning" : "square";
    return (
      <button className= {winSquare} onClick={() => props.onClick(props.id.i, props.id.j)}>
        {props.value}
      </button>
    );
}
export default Square;