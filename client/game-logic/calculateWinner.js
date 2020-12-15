/**
 * @param Array(9)
 * Function help find who winner in Tic-tac-toe games (3x3 board)
 * base on data store in an 1-dimensional array with 9 elements
 * Player-signal store as data in each element of array
 * @returns The winner/null(not end game yet)
 */
const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {line: lines[i].slice(), winner: squares[a]};
      }
    }
    return null;
}
export default calculateWinner;