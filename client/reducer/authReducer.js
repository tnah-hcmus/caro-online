import {LOGIN, LOGOUT, JOIN} from '../action/auth/type';
export default (state = {}, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...action.payload
        };
      case JOIN:
        state.inRoom = true;
        return {
          ...state
        };
      case LOGOUT:
        return {};
      default:
        return state;
    }
  };
  