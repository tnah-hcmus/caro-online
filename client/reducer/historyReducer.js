import { ADD_BOARD, CREATE_BOARD, DELETE_GAME } from "../action/history/type";
export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      const { roomID, size, player } = action.payload;
      if (!state[roomID]) {
        state[roomID] = [{squares: Array(size*size).fill(null), status: null, player}];
      }
      return {
        ...state,
      };
    case ADD_BOARD: 
      const {roomID, squares, status, player} = action.payload;
      if(state[roomID]) {
          state[roomID] = state[roomID].concat({squares, status, player});
      }
      return {
          ...state
      }
    case DELETE_GAME:
      if(state[roomID]) delete state[roomID];
      return {
          ...state
      }
    default:
      return state;
  }
};
