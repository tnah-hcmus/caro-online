import WS from './socket';

class WSObserver {
  startListenUpdateUser(setUserOnline) {
    WS.onNewData("update-user", setUserOnline);
  }
  startListenUpdateChat(updateChat) {
    WS.onNewData("new-message", (data) => {
      const {roomID, text, timestamp } = data;
      updateChat(roomID, text, false, timestamp);
    })
  }
  startListenUpdateGameData(updateGameData) {
    WS.onNewData("new-game-data", (data) => {
      const { roomID, squares, status, player } = data;
      updateGameData(roomID, squares, status, player);
    });
  }
  startListenUpdateRoomData(updateRoomData) {
    WS.onNewData("new-room-data", (data) => {
      console.log(data);
      const { roomID, newData, type , property } = data;
      updateRoomData(type, roomID, property, newData);
    });
  }
}
const Obverser = new WSObserver();
export default Obverser;