let lastX = 0;
let lastY = 0;
let score = 0;
class Player {
  constructor(name, x, y, r, color, id) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.id = id;
    // this.pos = createVector(x, y);
    // console.log(this.pos);
    // this.vel = createVector(0, 0);
  }
  update() {
    this.x = lerp(this.x, mouseX, 0.05);
    this.y = lerp(this.y, mouseY, 0.05);
    // let mouse = createVector(mouseX - width / 2, mouseY - height / 2);
    // mouse.setMag(-1);
    // if (lastX === mouseX && lastY === mouseY) {
    //   mouse.setMag(0);
    // }
    // this.vel.lerp(mouse, 1);
    // console.log(this.vel);
    // console.log(this.vel);
    // this.pos.add(this.vel);
    // console.log(lastX, mouseX);
    // lastX = mouseX;
    // lastY = mouseY;
    // console.log(this.pos.x);
    // if (this.pos.x < 0) {
    //   console.log("Off the left edge");
    // }
  }
  show() {
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    fill(0);
    text("thekra", this.x, this.y);
  }

  hit(box) {
    // console.log(this.x, this.y);
    // console.log(box);
    let boxX = box.x;
    let boxY = box.y;
    let boxH = box.h;
    let boxW = box.w;
    let playerX = this.x;
    let playerY = this.y;
    let playerR = this.r;
    let boxColor = box.color;
    let playerColor = this.color;
    if (
      playerX > boxX &&
      playerX < boxX + boxW &&
      playerY > boxY &&
      playerY < boxY + boxH &&
      box.hasBeenHit === false &&
      boxColor === this.color
    ) {
      box.hasBeenHit = true;
      score += 1;
      console.log("win...score : " + score);
    } else if (
      playerX > boxX &&
      playerX < boxX + boxW &&
      playerY > boxY &&
      playerY < boxY + boxH &&
      box.hasBeenHit === false &&
      boxColor != this.color
    ) {
      box.hasBeenHit = true;
      console.log("lose...score : " + score);
    }
    //console.log(boxColor + "me" + playerColor);
    // console.log(
    //   "playery " +
    //     playerY +
    //     "boxy: " +
    //     boxY +
    //     "boxH " +
    //     boxH +
    //     "playerr: " +
    //     playerR
    // );
    let d = dist(boxX, boxY, playerX, playerY);

    // console.log(d);
    if (d < boxH + playerR && boxColor === this.color) {
      //remove(box);
    } else if (d < boxH + playerR && boxColor != this.color) {
      // console.log("lose");
    }
  }
}

module.exports = Player;
