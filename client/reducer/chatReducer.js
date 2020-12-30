import { ADD_MESSAGE } from "../action/chat/type";
export default (state = {}, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const {roomID, message, timestamp, isMyMessage, owner} = action.payload;
      if(!state[roomID]) state[roomID] = [{message, timestamp, isMyMessage, owner}];
      else state[roomID].push({message, timestamp, isMyMessage, owner});
      return {
        ...state
      };
    default:
        return state;
  }
};
