var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/js"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
// let players = [];
io.on("connection", function(socket) {
  // players.push(socket.id);

  io.emit("join event", socket.id);
  // io.emit("join event", socket.id);
  // socket.on("playerslist", function(arr) {
  //   console.log(arr);
  // });
  // console.log("Someone joined", socket.id);
  socket.on("player move", function(msg) {
    console.log("someone", msg);
    io.emit("player move", msg);
  });
  socket.on("disconnect", function() {
    io.emit("leave event", socket.id);
    console.log("Someone left", socket.id);
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});

// // const Player = require("./js/player");

// const express = require("express");
// const app = express();
// var http = require("http").Server(app);
// // const bodyParser = require("body-parser");
// const path = require("path");
// // var io = require("socket.io")(http);
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.resolve(__dirname, "js")));

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// // var playersList = [];
// // io.on("connection", function(socket) {
// // console.log("player connected", socket.id);
// // newplayer
// // socket.on("player", function() {
// // var blob = new Player("thekra", 40, 40, 40, "blue", socket.id);
// // console.log("******", blob);
// // playersList.push(blob);
// // // });
// // console.log(playersList);
// // // inform client
// // socket.emit("playersList", playersList);
// // });

// // io.on("connection", function(socket) {
// //   console.log("a user connected");
// //   console.log("socket id: ", socket.id);
// //   // socket.on('chat message', function (msg) {
// //   //     console.log('message: ' + msg);
// //   //   socket.on("playerPosition", function(blob) {
// //   //     console.log("our blob : " + blob.color);
// //   //   });
// //   socket.on("createBlob", function(blob) {
// //     console.log("new blob : " + blob);
// //   }); //io.emit('playerPosition', { msg: 'hello there' })
// //   //   io.emit("playerPosition", { msg: "hello there" });
// // });

// app.listen(3000, function() {
//   console.log("listening on *:3000");
// });
