import React from "react";
import Square from "./Square";
import { chunk } from "lodash";
const BoardView = (props) => {
  return (
    <div style={{ margin: `0 calc(100% - ${props.viewAllChat ? 660 : 648}px)` }}>
      {chunk(props.squares, props.size).map((row, i) => {
        return (
          <div key={i} className="board-row">
            {row.map((square, j) => (
              <Square
                key={j + i * props.size}
                value={square}
                i={i}
                j={j}
                winning={props.winning}
                handleClick={props.handleClick}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default BoardView;
