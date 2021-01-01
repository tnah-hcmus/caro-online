import { ADD_BOARD, CREATE_BOARD, RESET_GAME } from "../action/history/type";
export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      const { size } = action.payload;
      if (!state[action.payload.roomID]) {
        state[action.payload.roomID] = [{ squares: Array(size * size).fill(null), status: null, player: null }];
      }
      return {
        ...state,
      };
    case ADD_BOARD:
      const { squares, status, player } = action.payload;
      if (state[action.payload.roomID]) {
        state[action.payload.roomID] = state[action.payload.roomID].concat({ squares, status, player });
      }
      return {
        ...state,
      };
    case RESET_GAME:
      if (state[action.payload.roomID]) state[action.payload.roomID] =  [{ squares: Array(action.payload.size * action.payload.size).fill(null), status: null, player: null }];
      console.log("state", state);
      return {
        ...state
      };
    default:
      return state;
  }
};
