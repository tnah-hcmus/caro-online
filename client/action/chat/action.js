import { ADD_MESSAGE } from "./type";
export const addMessage = (roomID, message, isOwn, timestamp) => ({
  type: ADD_MESSAGE,
  payload: { roomID, message, isMyMessage: isOwn, timestamp},
});
