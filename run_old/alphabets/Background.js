const currentDPI = window.devicePixelRatio;
const desktopSpeedFactor = 1; // Adjust as needed
const mobileSpeedFactor = 2; // Adjust as needed
const isMobile = window.innerWidth < 768;
const speedFactor = isMobile ? mobileSpeedFactor : desktopSpeedFactor;

export default class Background {
  constructor(gameWidth, gameHeight, game, gameSpeed) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.image1 = document.getElementById("backgroudImage1");
    this.image2 = document.getElementById("backgroudImage2");
    this.x1 = 0;
    this.x2 = 800;
    this.y = 0;
    this.height = gameHeight;
    this.width = gameWidth;
    this.game = game;
    this.vx = gameSpeed;
  }

  draw(context) {
    context.drawImage(this.image1, this.x1, this.y, this.width, this.height);

    context.drawImage(this.image2, this.x2, this.y, this.width, this.height);
  }

  update() {
    this.x1 -= this.vx;
    this.x2 -= this.vx;

    if (this.x1 < 0 - 800) {
      this.x1 = this.x1 + 1600;
    }

    if (this.x2 < 0 - 800) {
      this.x2 = this.x2 + 1600;
    }
  }
}
