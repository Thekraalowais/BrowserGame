let lastX = 0;
let lastY = 0;
class Player {
  constructor(name, x, y, r, color, id) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.id = id;
    this.score = 0;
  }

  update() {
    // console.log("sokect : " + socket.id, "id:" + this.id);
    // if (socket.id === this.id) {
    const newX = lerp(this.x, mouseX, 1);
    const newY = lerp(this.y, mouseY, 1);

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
    text(this.name, this.x - 15, this.y);
    text(this.score, this.x - 3, this.y + 20);
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
      this.score += 1;
      // console.log("win...score : " + this.score);
    } else if (
      playerX > boxX &&
      playerX < boxX + boxW &&
      playerY > boxY &&
      playerY < boxY + boxH &&
      box.hasBeenHit === false &&
      boxColor != this.color
    ) {
      box.hasBeenHit = true;
      var audio = document.querySelector("#fail");
      var song = document.querySelector("#song");
      song.pause();
      audio.play();
      // console.log("lose case ** stop the game : $$ yor score " + score);
      // alert("LOSE");
      // document.getElementById("#song").play();

      swal({
        title: "Oops..You Lost!",
        text: "Your score   " + this.score,
        icon: "warning",
        closeOnClickOutside: false,
        button: "play again!"
      }).then(function() {
        // Redirect the user
        window.location.reload();
        // console.log("The Ok Button was clicked.");
      });
    }

    // let d = dist(boxX, boxY, playerX, playerY);

    // console.log(d);
    // if (d < boxH + playerR && boxColor === this.color) {
    //   // remove(box);
    // } else if (d < boxH + playerR && boxColor != this.color) {
    //   console.log("lose");
    // }
  }

  collectMulti(multi) {
    let multiX = multi.x;
    let multiY = multi.y;
    let multiH = multi.h;
    let multiW = multi.w;
    let playerX = this.x;
    let playerY = this.y;
    let playerR = this.r;

    if (
      playerX > multiX &&
      playerX < multiX + multiW &&
      playerY > multiY &&
      playerY < multiY + multiH &&
      multi.hasBeenHit === false
    ) {
      multi.hasBeenHit = true;
      this.score += 1;
      console.log("win...score : " + this.score);
      // song.play();
    }
  }
}

// module.exports = Player;
