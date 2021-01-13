import WS from './socket';

class WSSubject {
  joinChannel(id, userId, userName, userCoins, roomType, timer, coins, password) {
    userName = userName || null;
    roomType = roomType || null;
    timer = timer || null;
    coins = coins || null;
    password = password || null;
    WS.pushData("join-room", {id, userId, userName, userCoins, roomType, timer, coins, password});
  }
  leaveChannel(id, userId) {
    WS.pushData("leave-room", {id, userId});
  }
  sendMessage(message) {
    WS.pushData("send-chat", message);
  }
  logOut(userId) {
    WS.pushData('send-disconnect-request', userId);
    setTimeout(() => WS.socket = null, 1000);
  }
  updateName(name) {
    WS.pushData('update-name', name);
  }
  reUpdate() {
    console.log('push')
    WS.pushData('re-update');
  }
  sendGameData(data) {
    WS.pushData("send-game-data", data);
  }
  sendJoinGame(data) {
    console.log('sent')
    WS.pushData("send-join-game", data);
  }
  sendRoomData(data) {
    WS.pushData("send-room-data", data);
  }
  sendResultData(data) {
    WS.pushData("send-result-data", data);
  }
  sendGameRequest(data) {
    WS.pushData("send-game-request", data);
  }
  sendGameReply(data) {
    WS.pushData("send-game-reply", data);
  }

}
const Subject = new WSSubject();
export default Subject;