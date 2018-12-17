class Box {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.h = h; // 120
    this.w = w; // 40
    this.hasBeenHit = false;
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
    if (this.hasBeenHit === false) {
      fill(this.color);
      rect(this.x, this.y, this.w, this.h);
    }
    if (this.y > window.innerHeight) {
      this.hasBeenHit = true;
    }
  }
}
