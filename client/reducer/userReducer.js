import { INIT_INFO, UPDATE_INFO, CLEAR_INFO, SET_USERS_LIST } from "../action/user/type";
export default (state = {}, action) => {
  switch (action.type) {
    case INIT_INFO:
      console.log(action.payload);
      return {
        ...action.payload,
      };
    case UPDATE_INFO:
      state[action.payload.property] = action.payload.newData;
      console.log("state", state);
      return {
        ...state,
      };
    case CLEAR_INFO:
      console.log("clear");
      return {};
    case SET_USERS_LIST:
      state.usersList = action.payload.usersList;
      return {
        ...state,
      };
    default:
      return state;
  }
};
