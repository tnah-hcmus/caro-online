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

export const addNewRoom = (id, playerID, playerName, password, timer) => ({
  type: ADD_ROOM,
  payload: { id , players: {X: {id: playerID, name: playerName}, Y: {id: null, name: null}}, status: 0, password, timer },
});

export const addExistingRoom = (data) => ({
  type: ADD_ROOM,
  payload: data
})

export const addRoom = (playerID, playerName, passwordRaw, timerRaw, callback) => {
  return (dispatch, getState) => {
    const id = _createID();
    const password = passwordRaw || '';
    const timer = timerRaw || 30;
    console.log(id, playerID, password, timer)
    dispatch(addNewRoom(id, playerID, playerName ,password, timer));
    dispatch(joinState(id));
    callback(id);
    WSSubject.joinChannel(id);
    WSSubject.sendRoomData({type: 'CREATE', roomID: null, property: null, newData: { id , players: {X: playerID, Y: null}, status: 0, password, timer } })
  };
};

export const removeRoom = (id) => ({
  type: REMOVE_ROOM,
  payload: {id}
});

export const addPlayer = (id, playerID, playerName) => ({
    type: ADD_PLAYER,
    payload: {id, playerID, playerName}
});
export const addViewer = (id, viewerID, viewerName) => ({
  type: ADD_VIEWER,
  payload: { id, viewerID, viewerName },
});

//status: 0 - waiting, 1 playing
export const changeStatus = (id, status) => ({
  type: CHANGE_STATUS,
  payload: {id, status}
})


export const joinRoom = (id, playerID, playerName, password) => {
  return (dispatch, getState) => {
    const state = getState();
    const {auth, room} = state;
    for(let item of room) {
      if(item.id == id) {
        console.log(item);
        if (auth.inRoom) return {status: false, msg: `You already in ${auth.inRoom == item.id ? 'this ': ''}room`};
        if(item.password == '' || item.password == password) {
          dispatch(addPlayer(id, playerID, playerName));
          dispatch(joinState(id));
          WSSubject.joinChannel(id);
          let newData = {...item.players}
          newData.Y = {id: playerID, name: playerName}
          WSSubject.sendRoomData({type: 'UPDATE', roomID: id, property: 'players', newData })
          return {status: true, msg: "Success join"};
        }
        else return {status: false, msg: "Wrong password"};

      }
    }
    return {status: false, msg: "Can't find room"};
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