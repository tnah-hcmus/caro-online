const calculateWinner = (i, squares, value, size) => {
  let row = Math.floor(i / size);
  let col = i % size;
  let count = 0;
  let winArea = [];
  // check row
  for (let k = 0; k < size; k++) {
    if (squares.squares[row * size + k] !== value) {
      count = 0;
      winArea = winArea.slice(0, 0);
    }
    else {
      count++;
      winArea.push(row * size + k);
    }
    if (count === 4) {
      winArea.push(i);
      return {winArea, winner: value};
    }
  }
  // check col
  for (let k = 0; k < size; k++) {
    if (squares.squares[k * size + col] !== value) {
      count = 0;
      winArea = winArea.slice(0, 0);
    }
    else {
      count++;
      winArea.push(k * size + col);
    }
    if (count === 4) {
      winArea.push(i);
      return {winArea, winner: value};
    }
  }
  // check diagonal
  let inital_pos = i % (size + 1);
  for (let k = 0; k < size; k++) {
    if (squares.squares[inital_pos + (size + 1) * k] !== value) {
      count = 0;
      winArea = winArea.slice(0, 0);
    }
    else {
      count++;
      winArea.push(inital_pos + (size + 1) * k);
    }
    if (count === 4) {
      winArea.push(i);
      return {winArea, winner: value};
    }
  }
  // check anti-diagonal
    let inital_pos_anti = i % size + row;
  console.log(inital_pos_anti);
    for (let k = 0; k < size && k <= inital_pos_anti; k++) {
      console.log(inital_pos_anti + (size - 1) * k);
    if (squares.squares[inital_pos_anti + (size - 1) * k] !== value) {
      count = 0;
      winArea = winArea.slice(0, 0);
    }
    else {
      count++;
      console.log(`count ${value}: ${count}`);
      winArea.push(inital_pos_anti + (size - 1) * k);
    }
    if (count === 4) {
      winArea.push(i);
      return {winArea, winner: value};
    }
  }
  return null;
}
export default calculateWinner;