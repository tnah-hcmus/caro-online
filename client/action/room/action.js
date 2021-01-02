import { ADD_ROOM, REMOVE_ROOM, ADD_PLAYER, ADD_VIEWER, CHANGE_STATUS, UPDATE_ROOM, UPDATE_RESULT, REMOVE_PLAYER } from "./type";
import WSSubject from '../../socket/subject';
import {joinState} from '../auth/action';
import {deleteGame} from '../history/action';

const _createID = () => {
  let guid = 'xyxxyx'.replace(/[xy]/g, (c) => {
  let r = Math.random() * 16 | 0,
  v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return guid.toUpperCase();
}

export const addNewRoom = (id, playerID, playerName, password, timer, roomType) => ({
  type: ADD_ROOM,
  payload: { id , players: {X: {id: playerID, name: playerName}, Y: {id: null, name: null}}, status: (roomType === 'hidden' ? 1 : 0), password, timer, result: 0, roomType },
});

export const addExistingRoom = (data) => ({
  type: ADD_ROOM,
  payload: data
})

export const addRoom = (playerID, playerName, passwordRaw, timerRaw, callback, type, roomId) => {
  return (dispatch, getState) => {
    const id = roomId || _createID();
    const roomType = type || 'public';
    const password = passwordRaw || '';
    const timer = timerRaw || 30;
    dispatch(addNewRoom(id, playerID, playerName ,password, timer, roomType));
    dispatch(joinState(id));
    if(callback) callback(id);
    WSSubject.joinChannel(id);
    WSSubject.sendRoomData({type: 'CREATE', roomID: null, property: null, newData: { id , players: {X: {id: playerID, name: playerName}, Y: {id: null, name: null}}, status: (type === 'hidden' ? 1 : 0), password, timer, roomType } })
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
//result 0: no winner yet, 1: X win, 2: O win, 3 draw
export const updateResult = (id, result) => ({
  type: UPDATE_RESULT,
  payload: {id, result}
})

export const startGame = (id) => {
  return (dispatch) => {
    WSSubject.sendRoomData({type: 'UPDATE', roomID: id, property: 'status', newData: 1})
    dispatch(changeStatus(id, 1));
  }
}

export const newGame = (id, size) => {
  return (dispatch) => {
    dispatch(updateResult(id, 0));
    dispatch(deleteGame(id, size));
    dispatch(changeStatus(id, 0));
  }
}

export const removePlayer = (roomID, players) => ({
  type: REMOVE_PLAYER,
  payload: {roomID, players}
})

export const leaveRoom = (roomID, player, callback) => {
  console.log(player);
  return (dispatch, getState) => {
    player = (player === "O" ? "Y" : player);
    const state = getState();
    const rooms = state.room;
    if(rooms[roomID]) {
      if(rooms[roomID].players.X.id && rooms[roomID].players.Y.id) {
        let newData = rooms[roomID].players;
        if(player == "X") newData.X = {...newData.Y};
        newData.Y = {id: null, name: null};
        WSSubject.sendRoomData({type: 'UPDATE', roomID , property: 'players', newData});
        dispatch(changeStatus(roomID, 0));
        dispatch(removePlayer(roomID, newData));
        dispatch(joinState(null));
        setTimeout(() => {
          WSSubject.sendRoomData({type: 'UPDATE', roomID, property: 'status', newData: 0});
        }, 200);
        setTimeout(() => {
          WSSubject.leaveChannel(roomID);
        }, 300);
      }
      else {
        WSSubject.sendRoomData({type: 'DELETE', roomID , property: null, newData: null});
        dispatch(removeRoom(roomID));
        dispatch(joinState(null));
      }
      callback();
    }
  }
}

export const updateGameResult = (id, result) => {
  return (dispatch) => {
    dispatch(updateResult(id, result))
    WSSubject.sendRoomData({type: 'UPDATE', roomID: id, property: 'result', newData: result })
  }
}


export const joinRoom = (id, playerID, playerName, password) => {
  return (dispatch, getState) => {
    const state = getState();
    const {auth, room} = state;
    if(room[id]) {
      if (auth.inRoom) return {status: false, msg: `You already in ${auth.inRoom == item.id ? 'this ': 'another'}room`};
      if(room[id].players.X.id && room[id].players.Y.id) return {status: false, msg: `Phòng đã đủ số lượng người chơi`};
      if(room[id].password == '' || room[id].password == password) {
        dispatch(addPlayer(id, playerID, playerName));
        dispatch(joinState(id));
        WSSubject.joinChannel(id);
        let newData = {...room[id].players}
        newData.Y = {id: playerID, name: playerName}
        WSSubject.sendRoomData({type: 'UPDATE', roomID: id, property: 'players', newData })
        return {status: true, msg: "Success join"};
      }
      else return {status: false, msg: "Tham gia phòng thất bại, kiểm tra lại mật khẩu của bạn"};
    } else return {status: false, msg: "Không thể tìm thấy phòng"};
  };
};

export const updateRoom = (roomID, property, newData) => ({
  type: UPDATE_ROOM,
  payload: {roomID, property, newData}
})

export const updateRoomData = (type, roomID, property, newData) => {
  return (dispatch, getState) => {
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