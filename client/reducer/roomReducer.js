import {INIT_ROOM, ADD_ROOM, REMOVE_ROOM, ADD_PLAYER, ADD_VIEWER, CHANGE_STATUS, UPDATE_ROOM, UPDATE_RESULT, REMOVE_PLAYER, REMOVE_VIEWER, UPDATE_COIN} from '../action/room/type';
export default (state = {}, action) => {
    switch (action.type) {
      case INIT_ROOM:
        const init = action.payload.data.reduce((local, item) => {
          local[item.roomID] = { id: item.roomID , players: {X: {id: item.X.id, name: item.X.name, coins: item.X.coins}, Y: {id: item.Y.id, name: item.Y.name, coins: item.Y.coins}}, status: (item.roomType === 'hidden' ? 1 : 0), password: item.password, timer: item.timer, result: 0, roomType: item.roomType, coins: item.coins };
          return local;
        }, {});
        return {...init};
      case ADD_ROOM:
        state[action.payload.id] = action.payload;
        return {...state};
      case REMOVE_ROOM:
        delete state[action.payload.id];
        return {
          ...state
        }
      case ADD_PLAYER:
        if(state[action.payload.id]) {
          if(!state[action.payload.id].players.Y.id) state[action.payload.id].players.Y = {id: action.payload.playerID, name: action.payload.playerName, coins: action.payload.playerCoins};
          else if(!state[action.payload.id].players.X.id) {
            state[action.payload.id].players.X = {id: action.payload.playerID, name: action.payload.playerName, coins: action.payload.playerCoins};
          } 
        }
        return {
          ...state
        }
      case REMOVE_PLAYER: 
        if(state[action.payload.roomID]) {
          state[action.payload.roomID].players = action.payload.players;
        }
        return {
          ...state
        }
      case ADD_VIEWER:
        if(state[action.payload.id]) {
          if(!state[action.payload.id].viewer) state[action.payload.id].viewer = [{id: action.payload.viewerID, name: action.payload.viewerName}];
          else state[action.payload.id].viewer = state[action.payload.id].viewer.concat({id: action.payload.viewerID, name: action.payload.viewerName});
        }
        return {
          ...state
        }
      case REMOVE_VIEWER:
        if(state[action.payload.id]) {
          state[action.payload.id].viewer = state[action.payload.id].viewer.filter(item => item.id !== action.payload.viewerID);
        }
        return {
          ...state
        }
      case UPDATE_ROOM:
        if(state[action.payload.roomID]) {
          state[action.payload.roomID][action.payload.property] = action.payload.newData;
        }
        return {
          ...state
        }
      case CHANGE_STATUS:
        if(state[action.payload.id]) {
          state[action.payload.id].status = action.payload.status;
        }
        return {
          ...state
        }
      case UPDATE_RESULT:
        if(state[action.payload.id]) {
          state[action.payload.id].result = action.payload.result;
        }
        return {
          ...state
        }
      case UPDATE_COIN: 
        if(state[action.payload.roomID]) {
          state[action.payload.roomID].players[action.payload.player].coins = action.payload.newNumber;
        }
        return {
          ...state
        }
      default:
        return state;
    }
};
  