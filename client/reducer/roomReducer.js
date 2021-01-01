import {ADD_ROOM, REMOVE_ROOM, ADD_PLAYER, ADD_VIEWER, CHANGE_STATUS, UPDATE_ROOM, UPDATE_RESULT, REMOVE_PLAYER} from '../action/room/type';
export default (state = {}, action) => {
    switch (action.type) {
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
          if(!state[action.payload.id].players.Y.id) state[action.payload.id].players.Y = {id: action.payload.playerID, name: action.payload.playerName};
          else if(!state[action.payload.id].players.X.id) {
            state[action.payload.id].players.X = {id: action.payload.playerID, name: action.payload.playerName};
          } 
        }
        return {
          ...state
        }
      case REMOVE_PLAYER: 
        if(state[action.payload.roomID]) {
          state[action.payload.roomID].players = action.payload.players;
        }
        console.log(state[action.payload.roomID]);
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
      case UPDATE_ROOM:
        if(state[action.payload.roomID]) {
          state[action.payload.roomID][action.payload.property] = action.payload.newData;
        }
        console.log(state[action.payload.roomID]);
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
        console.log(state);
        console.log(state[action.payload.id])
        return {
          ...state
        }
      default:
        return state;
    }
};
  