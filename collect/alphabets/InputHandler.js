export default class InputHandler {
  constructor(game) {
    this.keys = [];
    this.touchY = "";
    this.touchThreshold = 30;
    this.game = game;
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight") &&
        this.keys.indexOf(e.key) === -1
      ) {
        //console.log(this.keys);
        this.keys.push(e.key);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });

    canvas.addEventListener("click", (e) => {
      let currentX = e.offsetX;
      let direction;
      let midpoint;
      if (screen.width > canvas.width) {
        midpoint = canvas.width / 2;
      } else {
        midpoint = screen.width / 2;
      }

      if (currentX > midpoint) {
        direction = "right";
      }

      if (currentX < midpoint) {
        direction = "left";
      }

      if (direction == "left") {
        //console.log("left");
        this.keys.splice(0, this.keys.length);
        this.keys.push("swipe left");
        ///console.log(this.keys);
        //this.keys.splice(this.keys.indexOf("swipe right"), 1);
      }

      if (direction == "right") {
        //console.log("right");
        this.keys.splice(0, this.keys.length);
        this.keys.push("swipe right");
        //console.log(this.keys);
      }
    });

    /*

    window.addEventListener("touchstart", (e) => {
      this.touchX = e.changedTouches[0].pageX;
    });



    

    window.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      const currentX = touch.clientX;

      if (this.touchX !== undefined) {
        const deltaX = currentX - this.touchX;
        let direction;

        if (deltaX > 0) {
          direction = "right";
        }

        if (deltaX < 0) {
          direction = "left";
        }

        //console.log(`Direction: ${direction}`);

        if (direction == "left") {
          //console.log("left");
          this.keys.splice(0, this.keys.length);
          this.keys.push("swipe left");
          //console.log(this.keys);
          //this.keys.splice(this.keys.indexOf("swipe right"), 1);
        }

        if (direction == "right") {
          //console.log("right");
          this.keys.splice(0, this.keys.length);
          this.keys.push("swipe right");
          //console.log(this.keys);
        }
      }

      this.touchX = currentX;
    });



    window.addEventListener("touchend", (e) => {
      //console.log(this.keys);
      this.keys.splice(0, this.keys.length);
      this.keys.splice(0, this.keys.length);

      this.touchX = undefined;
    });

    */

    //console.log(this.keys);
  }
}
