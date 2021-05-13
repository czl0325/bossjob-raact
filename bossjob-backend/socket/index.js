const {UserModel, ChatModel} = require('../db/models');

module.exports = function (server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
    }
  });
  const socketMap = new Map()
  io.on('connection', (socket) => {
    console.log('客户端连接', socket.id)
    const user_id = (/j:"(.*?)"/g).exec(socket.handshake.auth.user_id)[1]
    socketMap.set(user_id, socket)
    socket.on('disconnect', function (socket) {
      socketMap.delete(user_id)
    })
    socket.on('c2s', async function ({from_id, to_id, content}) {
      const from_user = await UserModel.findById(from_id)
      const to_user = await UserModel.findById(to_id)
      const create_time = Date.now()
      const chat = new ChatModel({from_id, from_avatar: from_user.avatar, from_name: from_user.username, to_id, to_avatar: to_user.avatar, to_name: to_user.username, chat_id: [from_id, to_id].sort().join('_'), content, create_time})
      const newMsg = await chat.save()
      //socket.to(`j:"${from_id}"`).to(`j:"${to_id}"`).emit('s2c', newMsg)
      if (socketMap.get(from_id)) {
        socketMap.get(from_id).emit('s2c', newMsg);
      }
      if (socketMap.get(to_id)) {
        socketMap.get(to_id).emit('s2c', newMsg);
      }
    })
  });
}
