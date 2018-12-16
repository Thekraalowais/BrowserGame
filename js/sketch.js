let blob;
let box;
let boxs = [];
let boxsNum = 0;
let again = true;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(30);
  blob = new Player(
    "thekra",
    random(-width / 2, width / 2),
    random(-height / 2, height / 2),
    40,
    "blue"
  );
  // Create an array of colors
  colors = [];

  box = new Box(500, 60, 80, 40, "red");

  //drawBoxes();

  for (let i = 0; i < random(1, 3); i++) {
    const boxWidth = lerp(80, 100, Math.random());
    // Pick a random color out of the array of colors (Math.round(random(0, colors.length - 1));)
    boxs.push(
      new Box(
        random(width - boxWidth), // x
        random(height),
        boxWidth,
        50,
        color(random(255), random(255), random(255))
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
        color(random(255), random(255), random(255))
      )
    );
  }, 3000);
}

//setInterval(drawBoxes,3000)
function draw() {
  boxs = boxs.filter(function(box) {
    return box.hasBeenHit === false;
  });
  background(0);
  //   console.log(blob);

  //   translate(width / 2, height / 2);
  //   translate(-blob.pos.x, -blob.pos.y);
  //   translate(mouseX, mouseY);
  //console.log(blob.x)
  blob.show();
  blob.update();
  blob.hit(box);
  box.show();
  box.move();

  //generateBoxes();
  //
  //while (again){
  for (let i = 0; i < boxs.length; i++) {
    boxs[i].show();
    console.log("run");
    boxs[i].move();
    blob.hit(boxs[i]);
  } //}
}
