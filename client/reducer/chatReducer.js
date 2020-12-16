import { ADD_MESSAGE } from "../action/chat/type";
export default (state = {}, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const {roomID, message, timestamp, isMyMessage} = action.payload;
      if(!state[roomID]) state[roomID] = [{message, timestamp, isMyMessage}];
      else state[roomID].push({message, timestamp, isMyMessage});
      return {
        ...state
      };
    default:
        return state;
  }
};
