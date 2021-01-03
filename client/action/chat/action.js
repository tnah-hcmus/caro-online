import { ADD_MESSAGE } from "./type";
import WSSubject from '../../socket/subject';

export const addNewMessage = (roomID, message, isOwn, timestamp, owner) => ({
  type: ADD_MESSAGE,
  payload: { roomID, message, isMyMessage: isOwn, timestamp, owner},
});

export const addMessage = (roomID, message, isOwn, timestamp, owner) => {
  return (dispatch, getState) => {
    dispatch(addNewMessage(roomID, message, isOwn, timestamp, owner));
    if(isOwn) WSSubject.sendMessage({ roomID, message, timestamp, owner });
  };
};
