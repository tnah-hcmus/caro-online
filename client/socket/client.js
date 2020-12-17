import io from 'socket.io-client';

class WSClient {
  constructor() {
    this.socket = null;
  }
  connect(userId) {
    this.socket = io.connect("http://localhost:3000/", {
      query: "userId=" + userId,
      secure: true,
    });
  }
  startListenUpdateUser(setUserOnline) {
    this.socket.on("update-user", (data) => {
      setUserOnline(data);
    });
  }
  joinChannel(id) {
    this.socket.emit("join-room", id);
  }
  leaveChannel(id) {
    this.socket.emit("leave-room", id);
  }
  sendMessage(message) {
    this.socket.emit("send-chat", message);
  }
  startListenUpdateChat(updateChat) {
    if(!this.socket.hasListeners('new-message')) {
      this.socket.on("new-message", (data) => {
        const {roomID, text, timestamp } = data;
        updateChat(roomID, text, false, timestamp);
      });
    }
  }
  sendGameData(data) {
    this.socket.emit("send-game-data", data);
  }
  startListenUpdateGameData(updateGameData) {
    if (!this.socket.hasListeners("new-game-data")) {
      this.socket.on("new-game-data", (data) => {
        const { roomID, squares, status, player } = data;
        updateGameData(roomID, squares, status, player);
      });
    }
  }
  shutdownWS() {
    this.socket.emit("send-disconnect-request");
    this.socket = null;
  }
}
const WS = new WSClient();
export default WS;