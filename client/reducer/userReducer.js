import { INIT_INFO, UPDATE_INFO, CLEAR_INFO } from "../action/user/type";
export default (state = {}, action) => {
  switch (action.type) {
    case INIT_INFO:
      return {
        ...action.payload
      };
    case UPDATE_INFO:
      state[action.payload.property] = action.payload.newData;
      return {
        ...state,
      };
    case CLEAR_INFO:
      return {};
    default:
      return state;
  }
};
