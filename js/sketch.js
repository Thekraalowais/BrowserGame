let blob;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  blob = new Player(
    "thekra",
    random(-width / 2, width / 2),
    random(-height / 2, height / 2),
    40,
    "red"
  );
}

function draw() {
  background(0);
  //   console.log(blob);

  //   translate(width / 2, height / 2);
  //   translate(-blob.pos.x, -blob.pos.y);
  //   translate(mouseX, mouseY);
  blob.show();
  blob.update();
}
