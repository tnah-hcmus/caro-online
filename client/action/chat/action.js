import { ADD_MESSAGE } from "./type";
import WSSubject from '../../socket/subject';

export const addNewMessage = (roomID, message, isOwn, timestamp) => ({
  type: ADD_MESSAGE,
  payload: { roomID, message, isMyMessage: isOwn, timestamp},
});

export const addMessage = (roomID, message, isOwn, timestamp) => {
  return (dispatch, getState) => {
    dispatch(addNewMessage(roomID, message, isOwn, timestamp));
    WSSubject.sendMessage({ roomID, text: message, timestamp });
  };
};
