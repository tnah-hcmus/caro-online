import {INIT_USER_LIST, INIT_GAME_LIST, UPDATE_USER} from '../action/admin/type';
export default (state = {userList: [], gameList: []}, action) => {
    switch (action.type) {
      case INIT_USER_LIST:
        state.userList = [...action.payload]
        return {
            ...state
        }
      case INIT_GAME_LIST:
        state.gameList = [...action.payload]
        return {
            ...state
        }
      case UPDATE_USER:
        state.userList = state.userList.map((item) => {
          if(item._id == action.payload.id) {
            item[action.payload.property] = action.payload.value;
          }
          return item;
        });
        return {
          ...state
        }
      default:
        return state;
    }
  };
  