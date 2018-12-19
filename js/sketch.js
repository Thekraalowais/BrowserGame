var socket = io();
let blob;
let box;
let multiColoredBox;
let boxs = [];
let fastBoxes = [];

let boxsNum = 0;
let again = true;
let blobs = [];
let me = null;
let song;

// function preload() {
//   song = loadSound("start.mp3");
// }
var mu;

function preload() {
  // load images
  mu = loadImage("multi-colored.jpg");
  //song = loadSound("start.mp3");
}
// window.onload = function() {
//   //   console.log("onload");
//   swal("Hi", "choose username!", "error");
// };
function setup() {
  //   song = createAudio("start.mp3");
  //   song.autoplay(true);
  //   song = createAudio("start.mp3");
  //   song.autoplay(true);
  createCanvas(window.innerWidth, window.innerHeight);
  // console.log(song);
  //song.play();

  frameRate(30);
  // Create an array of colors
  colors = ["blue", "green", "yellow"];
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

  //code to generate normal boxes
  for (let i = 0; i < random(1, 3); i++) {
    const boxWidth = lerp(80, 100, Math.random());
    // Pick a random color out of the array of colors (Math.round(random(0, colors.length - 1));)
    boxs.push(
      new Box(
        random(width - boxWidth),
        random(height),
        boxWidth,
        50,
        colors[Math.round(random(0, colors.length - 1))]
      )
    ); // x
    // stroke(colors[int(random(0, colors.length))])
  }
  setInterval(function() {
    const boxWidth = lerp(80, 100, Math.random());
    // Pick a random color out of the array of colors (Math.round(random(0, colors.length - 1));)
    boxs.push(
      new Box(
        random(width - boxWidth),
        0,
        boxWidth,
        50,
        colors[Math.round(random(0, colors.length - 1))]
      )
    ); // x
    // stroke(colors[int(random(0, colors.length))])
  }, 3000);
  //code to generate fast boxes
  for (let i = 0; i < random(15, 40); i++) {
    const boxWidth = lerp(20, 30, Math.random());
    // Pick a random color out of the array of colors (Math.round(random(0, colors.length - 1));)
    fastBoxes.push(
      new Box(
        random(width - boxWidth),
        random(height),
        boxWidth,
        30,
        colors[Math.round(random(0, colors.length - 1))]
      )
    ); // x
    // stroke(colors[int(random(0, colors.length))])
  }

  //fast mode
  setInterval(function() {
    fill("red");
    text("here comes the fast mode", width / 2, height / 2);
    for (let i = 0; i < random(15, 40); i++) {
      const boxWidth = lerp(20, 30, Math.random());
      fastBoxes.push(
        new Box(
          random(width - boxWidth),
          random(height),
          boxWidth,
          30,
          colors[Math.round(random(0, colors.length - 1))]
        )
      );
    }
  }, 10000);
  multiColoredBox = new ColoredBox(random(width), random(height), 40, 40, mu); // x
}
// function mouseClicked() {
//   //here we test if the mouse is over the
//   //canvas element when it's clicked
//   if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
//     //Show our p5.MediaElement's src field
//     alert(song.src);
//   }
// }

//code to generate multi color boxes

let players = [];

socket.on("join event", function(id) {
  if (!me) {
    me = new Player(prompt("Name"), 40, 40, 40, prompt("Color"), id, 0);
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

  fastBoxes = fastBoxes.filter(function(box) {
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
  //boxes mode fast
  for (let i = 0; i < fastBoxes.length; i++) {
    fastBoxes[i].show();
    fastBoxes[i].moveFast();
    if (me) {
      me.hit(fastBoxes[i]);
    }
  }
  // for (let i = 0; i < multiColoredBox.length; i++) {
  //   multiColoredBox[i].show();
  //   multiColoredBox[i].moveFast();
  //   if (me) {
  //     me.collectMulti(multiColoredBox[i]);
  //   }

  // }
  multiColoredBox.show();
  multiColoredBox.appeare();

  //multiColoredBox.show()
  me.collectMulti(multiColoredBox);
}
