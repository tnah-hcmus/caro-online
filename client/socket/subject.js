import WS from './socket';

class WSSubject {
  joinChannel(id) {
    WS.pushData("join-room", id);
  }
  leaveChannel(id) {
    WS.pushData("leave-room", id);
  }
  sendMessage(message) {
    WS.pushData("send-chat", message);
  }
  sendGameData(data) {
    WS.pushData("send-game-data", data);
  }
  sendRoomData(data) {
    WS.pushData("send-room-data", data);
  }
  sendJoinGame(data) {
    WS.pushData("send-join-game", data);
  }

}
const Subject = new WSSubject();
export default Subject;