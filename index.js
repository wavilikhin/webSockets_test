var express = require("express");
var socket = require("socket.io");
var socketIds = [];
//Setting app

var app = express();

var server = app.listen(80, "0.0.0.0", function() {
  console.log("im listeing on port 80");
});

//Static files
app.use(express.static("public"));

// Socket setup
var io = socket(server);

io.on("connection", function(socket) {
  console.log("Socket connection made from id:", socket.id);
  socketIds.push(socket.id);
  console.log(socketIds);
  if (socketIds[5]) {
    console.log("WAAASUUUUUP");
  }
  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
