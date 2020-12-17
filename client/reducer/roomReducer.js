import {ADD_ROOM, REMOVE_ROOM, ADD_PLAYER} from '../action/room/type';
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
                item.players = [...item.players, action.payload.playerID]
                if(!item.players.Y) {
                  item.players.Y = action.payload.playerID;
                } else if(!item.player.X) {
                  item.players.X = action.payload.playerID;
                } 
            }
            return item;
        })
      default:
        return state;
    }
};
  