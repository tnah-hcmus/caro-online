import { getStoredState } from "redux-persist";
import { ADD_ROOM, REMOVE_ROOM, ADD_PLAYER } from "./type";
const _createID = () => {
    let guid = 'xyxxyx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0,
    v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return guid.toUpperCase();
  }
export const addRoom = (playerID) => ({
  type: ADD_ROOM,
  payload: { id: _createID() , players: [playerID] },
});

export const removeRoom = (id) => ({
  type: REMOVE_ROOM,
  payload: {id}
});

export const addPlayer = (id, playerID) => ({
    type: ADD_PLAYER,
    payload: {id, playerID}
});