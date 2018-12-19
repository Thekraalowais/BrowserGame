var socket = io();
let blob;
let box;
let boxs = [];
let boxsNum = 0;
let again = true;
let blobs = [];
let me = null;
let song;

// function preload() {
//   song = loadSound("start.mp3");
// }
function setup() {
  song = createAudio("start.mp3");
  //   song.autoplay(true);
  //   song = createAudio("start.mp3");
  //   song.autoplay(true);
  createCanvas(window.innerWidth, window.innerHeight);
  // console.log(song);
  //   song.play();

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
function mouseClicked() {
  //here we test if the mouse is over the
  //canvas element when it's clicked
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    //Show our p5.MediaElement's src field
    alert(song.src);
  }
}
let players = [];

socket.on("join event", function(id) {
  if (!me) {
    me = new Player("thekra", 40, 40, 40, "red", id, 0);
  }
  //   console.log("Joining", players);
});

socket.on("leave event", function(id) {
  players = players.filter(function(p) {
    return p.id !== id;
  });
  //   console.log("Leaving", id, players);
});

socket.on("player move", function(player) {
  //   console.log(player);
  let foundPlayer = false;
  for (let i = 0; i < players.length; i += 1) {
    const p = players[i];
    // if the other players are inside the new player array, so we will update the other player position
    if (p.id === player.id) {
      foundPlayer = true;
      players[i].x = player.x;
      players[i].y = player.y;
      players[i].score = player.score;
    }
  }
  if (foundPlayer === false && player.id !== socket.id) {
    //   if the new player array not contain other players push other plaer to the array
    players.push(player);
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
    text(player.name, player.x - 13, player.y);
    text(player.score, player.x - 3, player.y + 20);
  }

  // box.show();
  // box.move();

  for (let i = 0; i < boxs.length; i++) {
    boxs[i].show();
    // console.log("run");
    boxs[i].move();
    if (me) {
      me.hit(boxs[i]);
    }
  } //}
}
