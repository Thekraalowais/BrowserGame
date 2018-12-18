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
  }
  update() {
    // console.log("sokect : " + socket.id, "id:" + this.id);
    // if (socket.id === this.id) {
    const newX = lerp(this.x, mouseX, 0.8);
    const newY = lerp(this.y, mouseY, 0.8);

    if (
      Math.round(newX) !== Math.round(this.x) &&
      Math.round(newY) !== Math.round(this.y)
    ) {
      socket.emit("player move", this);
      this.x = newX;
      this.y = newY;
    }
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
      // console.log("win...score : " + score);
    } else if (
      playerX > boxX &&
      playerX < boxX + boxW &&
      playerY > boxY &&
      playerY < boxY + boxH &&
      box.hasBeenHit === false &&
      boxColor != this.color
    ) {
      box.hasBeenHit = true;
      // console.log("lose...score : " + score);
    }

    let d = dist(boxX, boxY, playerX, playerY);

    // console.log(d);
    if (d < boxH + playerR && boxColor === this.color) {
      //remove(box);
    } else if (d < boxH + playerR && boxColor != this.color) {
      // console.log("lose");
    }
  }
}

// module.exports = Player;
