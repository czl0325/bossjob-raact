module.exports = function () {
  const io = require("socket.io")({
    path: "/test",
    serveClient: false,
  });

  const server = require("http").createServer();

  io.attach(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });

  io.on("connection", (socket) => {
    console.log("有客户端连接");
    console.log(socket);
  });
  server.listen(4100);
}
