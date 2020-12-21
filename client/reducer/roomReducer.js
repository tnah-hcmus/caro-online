import {ADD_ROOM, REMOVE_ROOM, ADD_PLAYER, ADD_VIEWER, CHANGE_STATUS, UPDATE_ROOM} from '../action/room/type';
export default (state = [], action) => {
    switch (action.type) {
      case ADD_ROOM:
        return [...state, action.payload];
      case REMOVE_ROOM:
        return state.filter((item) => {
            return !(item.id === action.payload.id);
        });
      case ADD_PLAYER:
        return state.map((item) => {
            if(item.id === action.payload.id) {
                if(!item.players.Y) {
                  item.players.Y = action.payload.playerID;
                } else if(!item.player.X) {
                  item.players.X = action.payload.playerID;
                } 
            }
            console.log(item);
            return item;
        })
      case ADD_VIEWER:
        return state.map((item) => {
          if(item.id === action.payload.id) {
            if(!item.viewer) item.viewer = [action.payload.viewerID];
            else item.viewer = item.viewer.concat(action.payload.viewerID); 
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
  