import { INIT_ROOM, ADD_ROOM, REMOVE_ROOM, ADD_PLAYER, ADD_VIEWER, CHANGE_STATUS, UPDATE_ROOM, UPDATE_RESULT, REMOVE_PLAYER, REMOVE_VIEWER, UPDATE_COIN } from "./type";
import WSSubject from '../../socket/subject';
import {joinState} from '../auth/action';
import {deleteGame} from '../history/action';
import {updateInfo} from '../user/action';
import Axios from 'axios';

const _createID = () => {
  let guid = 'xyxxyx'.replace(/[xy]/g, (c) => {
  let r = Math.random() * 16 | 0,
  v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return guid.toUpperCase();
}

export const addNewRoom = (id, playerID, playerName, playerCoins, password, timer, coins, roomType) => ({
  type: ADD_ROOM,
  payload: { id , players: {X: {id: playerID, name: playerName, coins: playerCoins}, Y: {id: null, name: null}}, status: (roomType === 'quick' ? 1 : 0), password, timer, result: 0, coins, roomType },
});

export const initRoom = (data) => ({
  type: INIT_ROOM,
  payload: {data}
})

export const fetchRoom = (token, ignore) => {
  return(dispatch, getState) => {
    const state = getState();
    const roomID = state.auth.inRoom;
    const rooms = state.room;
    if(!ignore)
    Axios.get("/api/rooms", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
        if(roomID) res.data.push(rooms[roomID]);
        dispatch(initRoom(res.data));
    })
    .catch((e) => {
        console.log(e.response);
    });
  }

};

export const addExistingRoom = (data) => ({
  type: ADD_ROOM,
  payload: data
})

export const addRoom = (playerID, playerName, playerCoins, passwordRaw, timerRaw, coins, callback, type, roomId) => {
  return (dispatch, getState) => {
    const id = roomId || _createID();
    const roomType = type || 'public';
    const password = passwordRaw || '';
    const timer = timerRaw || 30;
    dispatch(addNewRoom(id, playerID, playerName, playerCoins, password, timer, coins, roomType));
    dispatch(joinState(id));
    if(callback) callback(id);
    WSSubject.joinChannel(id, playerID, playerName, playerCoins, roomType, timer, coins, password);
    WSSubject.sendRoomData({type: 'CREATE', roomID: null, property: null, newData: { id , players: {X: {id: playerID, name: playerName, coins: playerCoins}, Y: {id: null, name: null}}, status: (type === 'quick' ? 1 : 0), password, timer, coins, roomType } })
  };
};

export const removeRoom = (id) => ({
  type: REMOVE_ROOM,
  payload: {id}
});


export const addPlayer = (id, playerID, playerName, playerCoins) => ({
    type: ADD_PLAYER,
    payload: {id, playerID, playerName, playerCoins}
});
export const addViewer = (id, viewerID, viewerName) => ({
  type: ADD_VIEWER,
  payload: { id, viewerID, viewerName },
});

export const removeViewer = (id, viewerID) => ({
  type: REMOVE_VIEWER,
  payload: { id, viewerID},
});

export const viewRoom = (id, viewerID, viewerName, password) => {
  return (dispatch, getState) => {
    const state = getState();
    const rooms = state.room;
    if(rooms[id].password == '' || rooms[id].password == password) {
      WSSubject.joinChannel(id);
      WSSubject.sendRoomData({type: 'SPECIFIC', roomID: id, property: ADD_VIEWER, newData: {viewerName, viewerID}});
      dispatch(addViewer(id, viewerID, viewerName));
      dispatch(joinState(id));
      return {status: true, msg: "Success join"};
    }
    else return {status: false, msg: "Sai mật khẩu, kiểm tra lại mật khẩu của bạn"};
  }
}
export const leaveViewRoom = (id, viewerID, callback) => {
  return dispatch => {
    WSSubject.leaveChannel(id);
    WSSubject.sendRoomData({type: 'SPECIFIC', roomID: id, property: REMOVE_VIEWER, newData: {viewerID}});
    dispatch(removeViewer(id, viewerID));
    dispatch(joinState(null));
    callback();
  }
}

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
  console.log("new game")
  return (dispatch) => {
    WSSubject.sendRoomData({type: 'UPDATE', roomID: id, property: 'result', newData: 0 });    
    WSSubject.sendRoomData({type: 'SPECIFIC', roomID: id, property: 'GAME_RESET', newData: {size} })
    WSSubject.sendRoomData({type: 'UPDATE', roomID: id, property: 'status', newData: 0 })
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
  return (dispatch, getState) => {
    player = (player === "O" ? "Y" : player);
    const state = getState();
    const rooms = state.room;
    const userId = rooms[roomID].players[player].id;
    console.log("leaveroom", rooms[roomID]);
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
          WSSubject.leaveChannel(roomID, userId);
        }, 300);
      }
      else {
        WSSubject.sendRoomData({type: 'DELETE', roomID , property: null, newData: null});
        console.log("remove room")
        dispatch(removeRoom(roomID));
        dispatch(joinState(null));
        setTimeout(() => {
          WSSubject.leaveChannel(roomID, userId);
        }, 300);
      }
      callback(roomID);
    }
  }
}

export const updateGameResult = (id, result) => {
  return (dispatch, getState) => {
    dispatch(updateResult(id, result));
    WSSubject.sendRoomData({type: 'UPDATE', roomID: id, property: 'result', newData: result })
    WSSubject.sendResultData({roomID: id, result})
    if(result == 3) {
      const user = getState().user;
      dispatch(updateInfo('draw', user.draw + 1));
    }

  }
}


export const joinRoom = (id, playerID, playerName, playerCoins, password) => {
  return (dispatch, getState) => {
    const state = getState();
    const {auth, room, user} = state;
    if(room[id]) {
      if (auth.inRoom) return {status: false, msg: `You already in ${auth.inRoom == item.id ? 'this ': 'another'}room`};
      if (user.coins < room[id].coins) return {status: false, msg: `This room need ${room[id].coins} coin${room[id].coins > 1 ? 's' : ''} to play. You just have only ${user.coins} coins`};
      if(room[id].players.X.id && room[id].players.Y.id) return {status: false, msg: `Phòng đã đủ số lượng người chơi`};
      if(room[id].password == '' || room[id].password == password) {
        console.log(room[id])
        if(room[id].roomType == "quick") WSSubject.sendJoinGame({roomID: id});
        dispatch(addPlayer(id, playerID, playerName, playerCoins));
        dispatch(joinState(id));
        WSSubject.joinChannel(id, playerID, playerName, playerCoins);
        let newData = {...room[id].players}
        newData.Y = {id: playerID, name: playerName, coins: playerCoins}
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

export const updateCoins = (roomID, player, newNumber) => ({
  type: UPDATE_COIN,
  payload: {roomID, player, newNumber}
})
export const runSpecificAction = (roomID, methodName, data) => {
  return dispatch => {
    switch(methodName) {
      case ADD_VIEWER:
        dispatch(addViewer(roomID, data.viewerID, data.viewerName));
        break;
      case REMOVE_VIEWER:
        dispatch(removeViewer(roomID, data.viewerID))
        break;
      case 'GAME_RESET':
        dispatch(deleteGame(roomID, data.size))
    }
  }

}
export const updateRoomData = (type, roomID, property, newData) => {
  return (dispatch, getState) => {
    switch(type) {
      case 'CREATE':
        dispatch(addExistingRoom(newData));
        return;
      case 'UPDATE':
        dispatch(updateRoom(roomID, property, newData));
        return;
      case 'SPECIFIC':
        dispatch(runSpecificAction(roomID, property, newData))
        return;
      case 'DELETE':
        dispatch(removeRoom(roomID));
        return;
    }
  }
}