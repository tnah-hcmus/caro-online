import { INIT_INFO, UPDATE_INFO, CLEAR_INFO } from "../action/user/type";
export default (state = {}, action) => {
  switch (action.type) {
    case INIT_INFO:
      console.log(action.payload)
      return {
        ...action.payload
      };
    case UPDATE_INFO:
      state[action.payload.property] = action.payload.newData;
      console.log('state', state)
      return {
        ...state,
      };
    case CLEAR_INFO:
      console.log('clear')
      return {};
    default:
      return state;
  }
};
