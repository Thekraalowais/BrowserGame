var socket = io();
let blob;
let box;
let boxs = [];
let boxsNum = 0;
let again = true;
let blobs = [];

// window.onload = function() {
//   //   console.log("onload");
//   swal("Hi", "choose username!", "error");
// };
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(30);
  //   blob = createBlob();

  // Create an array of colors
  colors = [
    color("#00b33c"),
    color("#ff751a"),
    color("#d900ff"),
    color("#be0000"),
    color("#9900ff"),
    color("#4343f3"),
    color("#3399ff"),
    color("#ff99ff"),
    color("#33ff33"),
    color("#ff0066"),
    color("#ff9933"),
    color("#4e01b3"),
    color("#008a7e"),
    color("#fffb00"),
    color("#80002b"),
    color("#1079aa")
  ];

  box = new Box(500, 60, 80, 40, "blue");

  for (let i = 0; i < random(1, 3); i++) {
    const boxWidth = lerp(80, 100, Math.random());
    // Pick a random color out of the array of colors (Math.round(random(0, colors.length - 1));)
    boxs.push(
      new Box(
        random(width - boxWidth), // x
        random(height),
        boxWidth,
        50,
        colors[Math.round(random(0, colors.length - 1))]
        // stroke(colors[int(random(0, colors.length))])
      )
    );
  }
  setInterval(function() {
    const boxWidth = lerp(80, 100, Math.random());
    // Pick a random color out of the array of colors (Math.round(random(0, colors.length - 1));)
    boxs.push(
      new Box(
        random(width - boxWidth), // x
        0,
        boxWidth,
        50,
        colors[Math.round(random(0, colors.length - 1))]
        // stroke(colors[int(random(0, colors.length))])
      )
    );
  }, 3000);
}

let players = [];

// function createBlob() {
//   blob = new Player(
//     "Amal",
//     random(-width / 2, width / 2),
//     random(-height / 2, height / 2),
//     40,
//     "red",
//     socket.id
//   );
//   return blob;
// }

socket.on("join event", function(id) {
  players.push(new Player("thekra", 40, 40, 40, "red", id));
  console.log("Joining", id, players);
});

socket.on("leave event", function(id) {
  players = players.filter(function(p) {
    return p.id !== id;
  });
  //   console.log("Leaving", id, players);
});

// document.addEventListener("click", function() {
//   socket.emit("player move", "Hi");
// });

socket.on("player move", function(player) {
  //   console.log(" plsyer : " + player);
  //   player1 = players.filter(function(p) {
  //     return p.id == player.id;
  //   });
  let player1 = "";
  for (var i = 0; i < players.length; i++) {
    if (players[i].id !== player.id) {
      return player;
    }
    // console.log("PLAYER:" + player);
  }
  // Every time someone moves
  // Find the player in players with the ID of the player that moves
  // If you found a player with that ID
  //   Update their x, y, color, radius and name
  //   Draw them to the page

  //   fill(player[0].color);
  //   ellipse(player[0].x, player[0].y, player[0].r * 2, player[0].r * 2);
  //   fill(0);
  //   text("thekra", player[0].x, player[0].y);
});

// socket.on("playersList", function(data) {
//   //   console.log(data.length);

//   for (var i = 0; i < data.length; i++) {
//     blobs.push(
//       new Player(
//         data[i].name,
//         data[i].x,
//         data[i].y,
//         data[i].r,
//         data[i].color,
//         data[i].id
//       )
//     );
//   }
// });
// console.log("inner", blobs);
// console.log("inner", blobs.length);

// console.log(blobs);
function draw() {
  boxs = boxs.filter(function(box) {
    return box.hasBeenHit === false;
  });
  background(0);
  //   blob.show();
  //   blob.update();
  for (let i = 0; i < players.length; i++) {
    console.log("**********", players);
    players[i].show();
    players[i].update();
    players[i].hit(box);
    // console.log("------- ", blobs);
    // debugger;
  }
  //   blobs[0].show();
  box.show();
  box.move();

  for (let i = 0; i < boxs.length; i++) {
    boxs[i].show();
    // console.log("run");
    boxs[i].move();
    // blob.hit(boxs[i]);
  } //}
}

//socket.emit('chat message', )

// socket.on("playerPosition", function(msg) {
//   console.log(msg);
// });
// function createBlobFun() {
//   blob = new Player(
//     "thekra",
//     random(-width / 2, width / 2),
//     random(-height / 2, height / 2),
//     40,
//     "blue",
//     this.id
//   );
//   return blob;
// }

// socket.emit("player", { blob });

// socket.emit("createBlob", { blob });
// socket.on('playersList', function (playersList)){
// this.
// }
