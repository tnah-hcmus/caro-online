import { SET_GAMES_LIST } from "../action/game/type";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_GAMES_LIST:
      state.gamesList = action.payload.gamesList;
      return {
        ...state,
      };
    default:
      return state;
  }
};
