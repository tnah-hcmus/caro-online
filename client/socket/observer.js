import WS from './socket';

class WSObserver {
  startListenUpdateUser(setUserOnline) {
    WS.onNewData("update-user", setUserOnline);
  }
  startListenUpdateChat(updateChat) {
    WS.onNewData("new-message", (data) => {
      const {roomID, text, timestamp, owner } = data;
      updateChat(roomID, text, false, timestamp, owner);
    })
  }
  startListenGameRequest(handleRequest) {
    if(WS.hasListeners("new-game-request")) WS.unsubscribe("new-game-request");
    WS.onNewData("new-game-request", (data) => {
      const {type, content, name} = data;
      handleRequest(type, content, name);
    })
  }
  startListenGameReply(applyCallback, errHandle) {
    if(WS.hasListeners("new-game-reply")) WS.unsubscribe("new-game-reply");
    WS.onNewData("new-game-reply", (data) => {
      const {accept, type} = data;
      if(accept) applyCallback(type);
      else errHandle({type: "error", content: "Đối thủ không đồng ý yêu cầu của bạn", open: true });
    })
  }
  startListenQuickGame(goToGame, id, timeOutHandlers) {
    WS.onNewData("new-join-game", (data) => {
      const { roomID } = data;
      if(id === roomID) {
        goToGame(roomID);
        WS.unsubscribe("new-join-game");
        for(const item of timeOutHandlers) clearTimeout(item);
      };
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
      const { roomID, newData, type , property } = data;
      updateRoomData(type, roomID, property, newData);
    });
  }
}
const Obverser = new WSObserver();
export default Obverser;