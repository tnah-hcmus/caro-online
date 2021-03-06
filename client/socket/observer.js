import WS from './socket';

class WSObserver {
  startListenUpdateUser(setUserOnline) {
    WS.onNewData("update-user", setUserOnline);
  }
  startListenUpdateChat(updateChat) {
    WS.onNewData("new-message", (data) => {
      const {roomID, message, timestamp, owner } = data;
      updateChat(roomID, message, false, timestamp, owner);
    })
  }
  startListenGameResult(updateCoins) {
    WS.onNewData("new-result-data", (data) => {
      console.log("update coin in listen game result")
      const { result } = data;
      if(result == 1) updateCoins("X");
      if(result == 2) updateCoins("O");
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
      WS.pushData("game-reply-to-server", data)
      const {accept, type} = data;
      if(accept) applyCallback(type);
      else errHandle({type: "error", content: "Đối thủ không đồng ý yêu cầu của bạn", open: true });
    })
  }
  startListenQuickGame(goToGame, id, timeOutHandlers, setTimer) {
    WS.onNewData("new-join-game", (data) => {
      const { roomID } = data;
      if(id === roomID) {
        console.log(id, roomID, "oke");
        goToGame(roomID);
        WS.unsubscribe("new-join-game");
        for(const item of timeOutHandlers) clearTimeout(item);
        setTimer(0);
      };
    })
  }
  startListenUpdateGameData(updateGameData, canView, setCanView, updateCoins) {
    console.log("new-listen", setCanView)
    WS.onNewData("new-game-data", (data) => {
      console.log("on new data", data)
      const { roomID, squares, status, player} = data;
      updateGameData(roomID, squares, status, player);
      if(status) {
        console.log("update coin in load game datA")
        updateCoins(status.winner);
      }
      if(!canView) {
        console.log("canView in data", canView)
        setCanView(true);
      }
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