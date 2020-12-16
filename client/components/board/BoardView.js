import React from 'react';
import Square from './Square';
import {chunk} from 'lodash';
const BoardView = (props) => {
    return (
        <div>
          {chunk(props.squares, props.size).map((row, i) => {
                return (
                    <div key={i} className="board-row">
                        {row.map((square,j) => <Square key = {j+i*props.size} 
                                                value = {square}
                                                id = {j+i*props.size} 
                                                winning = {props.winning}
                                                onClick = {() => props.handleClick(i,j)}
                                                />)}
                    </div>
                )
            })
          }          
        </div>
    );
}
export default BoardView;
  