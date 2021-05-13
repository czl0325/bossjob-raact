import io from 'socket.io-client'

export default class BossSocket {
  constructor() {
    this.socket = null
  }

  static getInstance = function () {
    let instance = null
    if (!instance) {
      instance = new BossSocket()
    }
    return instance
  }

  initSocket() {
    if (this.socket) {
      return this.socket
    }
    this.socket = io("ws://localhost:4000", { autoConnect: true });
    // this.socket.onAny((event, ...args) => {
    //   console.log(event, args);
    // });
    this.socket.on('s2c', function (data) {
      console.log(data)
    })
    return this.socket
  }

  sendMessage({from_id, to_id, content}) {
    if (this.socket) {
      this.socket.emit('c2s', {from_id, to_id, content})
    }
  }
}
