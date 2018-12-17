const express = require("express");
const app = express();
var http = require("http").Server(app);

const path = require("path");
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static(path.resolve(__dirname, "js")));

io.on("connection", function(socket) {
  console.log("a user connected");
  // socket.on('chat message', function (msg) {
  //     console.log('message: ' + msg);
  //   socket.on("playerPosition", function(blob) {
  //     console.log("our blob : " + blob.color);
  //   });
  socket.on("createBlob",function(blob){
  console.log("new blob : " + blob)
    })  //io.emit('playerPosition', { msg: 'hello there' })
  //   io.emit("playerPosition", { msg: "hello there" });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
