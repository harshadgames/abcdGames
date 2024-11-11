const currentDPI = window.devicePixelRatio;
const desktopSpeedFactor = 1; // Adjust as needed
const mobileSpeedFactor = 2; // Adjust as needed
const isMobile = window.innerWidth < 768;
const speedFactor = isMobile ? mobileSpeedFactor : desktopSpeedFactor;

export default class Background {
  constructor(gameWidth, gameHeight, game) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.image1 = document.getElementById("backgroudImage1");
    this.image2 = document.getElementById("backgroudImage2");
    this.level2Years = document.getElementById ("level2Years");
    this.x1 = 0;
    this.x2 = 800;
    this.y = 0;
    this.height = gameHeight;
    this.width = gameWidth;
    this.game = game;
  }

  draw(context) {
    context.drawImage(this.image1, this.x1, this.y, this.width, this.height);
    context.drawImage(this.image2, this.x2, this.y, this.width, this.height);

    context.drawImage(this.level2Years, 550, 350, 250, 250); 


    
  }

  update() {
    this.x1 -= this.game.gameSpeed;
    this.x2 -= this.game.gameSpeed;

    if (this.x1 < 0 - 800) {
      this.x1 = this.x1 + 1600;
    }

    if (this.x2 < 0 - 800) {
      this.x2 = this.x2 + 1600;
    }
  }
}
