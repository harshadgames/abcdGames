const isMobile = window.innerWidth < 768;
let clicked = false;
export default class InputHandler {
  constructor(game) {
    this.keys = [];
    this.touchY = "";
    this.touchThreshold = 10;
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight") &&
        this.keys.indexOf(e.key) === -1
      ) {
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

    window.addEventListener("touchstart", (e) => {
      this.touchY = e.changedTouches[0].pageY;
    });

    window.addEventListener("touchmove", (e) => {
      const swipeDistance = e.changedTouches[0].pageY - this.touchY;
      if (
        swipeDistance < -this.touchThreshold &&
        this.keys.indexOf("swipe up") === -1
      ) {
        this.keys.push("swipe up");
      } else if (
        swipeDistance > this.touchThreshold &&
        this.keys.indexOf("swipe down") === -1
      ) {
        this.keys.push("swipe down");
      }
    });

    window.addEventListener("touchend", (e) => {
      this.keys.splice(this.keys.indexOf("swipe up"), 1);
      this.keys.splice(this.keys.indexOf("swipe down"), 1);
      //console.log("touch end", this.keys);
    });

    if (isMobile) {
      window.addEventListener("click", (e) => {
        if (this.keys.indexOf("swipe up") === -1) {
          this.keys.push("swipe up");
          //console.log("adding swipe up", this.keys);
        }
      });
    }
  }
}
