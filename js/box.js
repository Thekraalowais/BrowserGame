// let lastX = 0;
// let lastY = 0;

class Box {
  constructor(x, y, h, w, color) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.color = color;
    // this.pos = createVector(x, y);
    // console.log(this.pos);
    // this.vel = createVector(0, 0);
  }

  move() {
    this.x = this.x + random(-1, 1);
    // Moving up at a constant speed
    this.y = this.y + 1;
    // console.log(this.y);
    // Reset to the bottom
    // if (this.y < 0) {
    //   this.y = height;
    // }
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.h, this.w);
  }
}
