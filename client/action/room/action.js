import { ADD_ROOM, REMOVE_ROOM, ADD_PLAYER, ADD_VIEWER, CHANGE_STATUS, UPDATE_ROOM } from "./type";
import WSSubject from '../../socket/subject';
import {joinState} from '../auth/action';

const _createID = () => {
  let guid = 'xyxxyx'.replace(/[xy]/g, (c) => {
  let r = Math.random() * 16 | 0,
  v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return guid.toUpperCase();
}

export const addNewRoom = (id, playerID) => ({
  type: ADD_ROOM,
  payload: { id , players: {X: playerID, Y: null}, status: 0 },
});

export const addExistingRoom = (data) => ({
  type: ADD_ROOM,
  payload: data
})

export const addRoom = (playerID, callback) => {
  return (dispatch, getState) => {
    const id = _createID();
    dispatch(addNewRoom(id, playerID));
    dispatch(joinState(id));
    callback(id);
    WSSubject.joinChannel(id);
    WSSubject.sendRoomData({type: 'CREATE', roomID: null, property: null, newData: { id , players: {X: playerID, Y: null}, status: 0 } })
  };
};

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
        dispatch(addPlayer(id, playerID));
        dispatch(joinState(id));
        WSSubject.joinChannel(id);
        let newData = {...item.players}
        newData.Y = playerID
        WSSubject.sendRoomData({type: 'UPDATE', roomID: id, property: 'players', newData })
        return true;
      }
    }
    return false;
  };
};

export const updateRoom = (roomID, property, newData) => ({
  type: UPDATE_ROOM,
  payload: {roomID, property, newData}
})

export const updateRoomData = (type, roomID, property, newData) => {
  return (dispatch, getState) => {
    console.log(type);
    switch(type) {
      case 'CREATE':
        dispatch(addExistingRoom(newData));
        return;
      case 'UPDATE':
        dispatch(updateRoom(roomID, property, newData));
        return;
      case 'DELETE':
        dispatch(removeRoom(roomID));
        return
    }
  }
}