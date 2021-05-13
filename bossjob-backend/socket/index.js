module.exports = function (server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
    }
  });
  io.on('connection', (socket) => {
    console.log('客户端连接')
    socket.on('c2s', function (data) {
      console.log(data)
    })
  });
}
