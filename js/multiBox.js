class ColoredBox {
    constructor(x, y, w, h,img) {
        this.x = x;
        this.y = y;
        this.h = h; // 120
        this.w = w; // 40
        this.hasBeenHit = false;
        this.img = img;
      //  this.color = color;
        // this.pos = createVector(x, y);
        // console.log(this.pos);
        // this.vel = createVector(0, 0);
    }

    appeare() {
        this.x = this.x + random(-1, 1)+.01;
        // Moving up at a constant speed
        this.y = this.y + 0.01;
        // console.log(this.y);
        // Reset to the bottom
        // if (this.y < 0) {
        //   this.y = height;
        // }
    }
    moveFast() {
        this.x = this.x + random(-1, 2);
        // Moving up at a constant speed
        this.y = this.y + 8;
    }
    
        show() {
            //loadImage("multi.jpg")
        if (this.hasBeenHit === false) {
           // image(loadImage("<img src="multi.jpg" alt=""/>"), 70, 60);
           // rect(this.x, this.y, this.w, this.h);
            tint(255, 127);  // Display at half opacity

            image(this.img, this.x, this.y, this.w, this.h);

        }
        if (this.y > window.innerHeight) {
            this.hasBeenHit = true;
        }
    }
     
}
