import io from 'socket.io-client';

class WSClient {
  constructor() {
      this.socket = null;
  }
  connect(userId) {
    this.socket = io.connect('https://caro-online-1712039-1712121.herokuapp.com', {
      query: "userId=" + userId,
      secure: true
    });
  }
  startListenUpdateUser(setUserOnline) {
    this.socket.on('update-user', (data) => {
      setUserOnline(data);
    });
  }
  shutdownWS() {
    this.socket.emit('send-disconnect-request');
    this.socket = null;
  }
}
const WS = new WSClient();
export default WS;