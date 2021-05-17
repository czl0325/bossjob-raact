import io from 'socket.io-client'
import {createReceiveMessageAction} from "../redux/actions";
import store from '../redux/store'

export default class BossSocket {
  constructor() {
    this.socket = null
    this.instance = null
  }

  static getInstance(name) {
    if (!this.instance) {
      this.instance = new BossSocket()
    }
    return this.instance
  }

  initSocket() {
    if (this.socket) {
      return this.socket
    }
    this.socket = io("ws://localhost:4000", {autoConnect: false});
    // this.socket.onAny((event, ...args) => {
    //   console.log(event, args);
    // });
    this.socket.on('s2c', function (data) {
      console.log("客户端收到消息",data)
      store.dispatch(createReceiveMessageAction(data))
    })
    return this.socket
  }

  connectServer(user_id) {
    if (!this.socket) {
      this.initSocket()
    }
    if (this.socket && user_id) {
      this.socket.auth = {user_id}
      this.socket.connect()
    }
  }

  sendMessage({from_id, to_id, content}) {
    if (this.socket) {
      console.log("客户端向服务端发送消息", {from_id, to_id, content})
      this.socket.emit('c2s', {from_id, to_id, content})
    }
  }
}
