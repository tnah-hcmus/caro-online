import io from 'socket.io-client';

class WSClient {
  constructor() {
    this.socket = null;
  }
  connect(userId) {
    if(!this.socket) {
        this.socket = io.connect("http://localhost:3000/", {
            query: "userId=" + userId,
            secure: true,
          });
    }
  }
  pushData(channel, data) {
    if(this.socket) {
        this.socket.emit(channel, data);
    }
  }
  hasListeners(channel) {
      if(this.socket)  return this.socket.hasListeners(channel);
      else {
          return false
      }
  }
  unsubscribe(channel) {
    this.socket.off(channel);
  }
  onNewData(channel, callback) {
    if(!this.hasListeners(channel) && this.socket) {
        this.socket.on(channel, (data) => {
            data.client = this.socket.id;
            callback(data);
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