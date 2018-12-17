const Player = require("./js/player");

const express = require("express");
const app = express();
var http = require("http").Server(app);
const bodyParser = require("body-parser");
const path = require("path");
var io = require("socket.io")(http);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static(path.resolve(__dirname, "js")));

// io.on("connection", function(socket) {
//   console.log("a user connected");
//   console.log("socket id: ", socket.id);
//   // socket.on('chat message', function (msg) {
//   //     console.log('message: ' + msg);
//   //   socket.on("playerPosition", function(blob) {
//   //     console.log("our blob : " + blob.color);
//   //   });
//   socket.on("createBlob", function(blob) {
//     console.log("new blob : " + blob);
//   }); //io.emit('playerPosition', { msg: 'hello there' })
//   //   io.emit("playerPosition", { msg: "hello there" });
// });
var playersList = [];
io.on("connection", function(socket) {
  console.log("player connected", socket.id);
  // newplayer
  // socket.on("player", function() {
  var blob = new Player("thekra", 40, 40, 40, "blue", socket.id);
  console.log("******", blob);
  playersList.push(blob);
  // });
  console.log(playersList);
  socket.emit("playersList", playersList);
});

// inform client

http.listen(3000, function() {
  console.log("listening on *:3000");
});
