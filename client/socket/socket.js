import io from 'socket.io-client';

class WSClient {
  constructor() {
    this.socket = null;
  }
  connect(userId) {
    console.log("connecting")
    if(!this.socket) {
        this.socket = io.connect("http://localhost:3000/", {
            query: "userId=" + userId,
            secure: true,
          });
    }
    console.log("connected")
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
  onNewData(channel, callback) {
    console.log('registering', channel);
    console.log(!this.hasListeners(channel));
    console.log(this.socket);
    if(!this.hasListeners(channel) && this.socket) {
        console.log('registered', channel);
        this.socket.on(channel, (data) => {
            console.log(data)
            callback(data);
        })
        console.log(this.socket);
    }
  }
  shutdownWS() {
    this.socket.emit("send-disconnect-request");
    this.socket = null;
  }
}
const WS = new WSClient();
export default WS;