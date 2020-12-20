import { ADD_ROOM, REMOVE_ROOM, ADD_PLAYER, ADD_VIEWER, CHANGE_STATUS } from "./type";
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
  payload: { id: _createID() , players: {X: playerID, Y: null}, status: 0 },
});

export const removeRoom = (id) => ({
  type: REMOVE_ROOM,
  payload: {id}
});

export const addPlayer = (id, playerID) => ({
    type: ADD_PLAYER,
    payload: {id, playerID}
});
export const addViewer = (id, viewerID) => ({
  type: ADD_VIEWER,
  payload: { id, viewerID },
});

//status: 0 - waiting, 1 ready, 2 playing
export const changeStatus = (id, status) => ({
  type: CHANGE_STATUS,
  payload: {id, status}
})

export const joinRoom = (id, playerID) => {
  return (dispatch, getState) => {
    const state = getState();
    const {auth, room} = state;
    for(let item of room) {
      if(item.id == id && !auth.inRoom) {
        dispatch(addPlayer(id, playerID))
        return true;
      }
    }
    return false;
  };
};