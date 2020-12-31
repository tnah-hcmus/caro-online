import {ADD_ROOM, REMOVE_ROOM, ADD_PLAYER, ADD_VIEWER, CHANGE_STATUS, UPDATE_ROOM} from '../action/room/type';
export default (state = [], action) => {
    switch (action.type) {
      case ADD_ROOM:
        console.log([...state, action.payload])
        return [...state, action.payload];
      case REMOVE_ROOM:
        return state.filter((item) => {
            return !(item.id === action.payload.id);
        });
      case ADD_PLAYER:
        return state.map((item) => {
            if(item.id === action.payload.id) {
                if(!item.players.Y) {
                  item.players.Y = {id: action.payload.playerID, name: action.payload.playerName};
                } else if(!item.player.X) {
                  item.players.X = {id: action.payload.playerID, name: action.payload.playerName};
                } 
            }
            console.log(item);
            return item;
        })
      case ADD_VIEWER:
        return state.map((item) => {
          if(item.id === action.payload.id) {
            if(!item.viewer) item.viewer = [{id: action.payload.viewerID, name: action.payload.viewerName}];
            else item.viewer = item.viewer.concat({id: action.payload.viewerID, name: action.payload.viewerName}); 
          }
          return item;
        })
      case UPDATE_ROOM:
        return state.map((item)=>{
          if(item.id === action.payload.roomID) {
            item[action.payload.property] = action.payload.newData;
          }
          return item;
        })
      case CHANGE_STATUS:
        return state.map((item) => {
          if(item.id === action.payload.id) {
            item.status = action.payload.status;
          }
          return item;
        })
      default:
        return state;
    }
};
  