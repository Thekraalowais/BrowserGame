var socket = io();
let blob;
let box;
let boxs = [];
let boxsNum = 0;
let again = true;
let blobs = [];
let me = null;

// window.onload = function() {
//   //   console.log("onload");
//   swal("Hi", "choose username!", "error");
// };
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(30);

  // Create an array of colors
  colors = [
    "blue",
    "green",
    "yellow"
    // "gray",
    // "orange",
    // "pink",
    // "red",
    // "maroon",
    // "purple",
    // "lavender",
    // "brown",
    // "crimson",
    // "hotpink",
    // "salmon",
    // "gold",
    // "orchid"
  ];

  // box = new Box(500, 60, 80, 40, "blue");

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

socket.on("join event", function(id) {
  if (!me) {
    me = new Player(prompt("Name"), 40, 40, 40, prompt("Color"), id);
  }
  //   socket.emit("playerslist", players);
  //   console.log("Joining", players);
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
  //   console.log(player);
  let foundPlayer = false;
  for (let i = 0; i < players.length; i += 1) {
    const p = players[i];
    if (p.id === player.id) {
      foundPlayer = true;
      players[i].x = player.x;
      players[i].y = player.y;
    }
  }
  if (foundPlayer === false && player.id !== socket.id) {
    players.push(player);
  }
  //   console.log(" player : " + player.id, players);
  //   player1 = players.filter(function(p) {
  //     return p.id == player.id;
  //   });
  //   for (var i = 0; i < players.length; i++) {
  //     // if (players[i].id !== player.id) {
  //     console.log("PLAYER:" + player.id);
  //     //   console.log(player[i]);
  //     // }
  //   }
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

function draw() {
  boxs = boxs.filter(function(box) {
    return box.hasBeenHit === false;
  });
  background(0);

  if (me) {
    me.show();
    me.update();
  }

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    fill(player.color);
    ellipse(player.x, player.y, player.r * 2, player.r * 2);
    fill(0);
    text(player.name, player.x, player.y);
    fill(0);
    text(player.score, player.x, player.y);
  }

  // box.show();
  // box.move();

  for (let i = 0; i < boxs.length; i++) {
    boxs[i].show();
    // console.log("run");
    boxs[i].move();
    me.hit(boxs[i]);
  } //}
}
