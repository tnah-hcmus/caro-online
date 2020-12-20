import { ADD_BOARD, CREATE_BOARD, DELETE_GAME } from "../action/history/type";
export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      const {size} = action.payload;
      if (!state[action.payload.roomID]) {
        state[action.payload.roomID] = [{squares: Array(size*size).fill(null), status: null, player: null}];
      }
      return {
        ...state,
      };
    case ADD_BOARD: 
      const {squares, status, player} = action.payload;
      if(state[action.payload.roomID]) {
          state[action.payload.roomID] = state[action.payload.roomID].concat({squares, status, player});
      }
      return {
          ...state
      }
    case DELETE_GAME:
      if(state[action.payload.roomID]) delete state[action.payload.roomID];
      return {
          ...state
      }
    default:
      return state;
  }
};
