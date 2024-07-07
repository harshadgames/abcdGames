export default class Background {
  constructor(gameWidth, gameHeight, game) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById("backgroudImage");
    this.x = 0;
    this.y = 0;
    this.height = gameHeight;
    this.width = gameWidth;
    this.game = game;
    this.vx = 0;
  }

  draw(context) {
    context.drawImage(this.image, 0, 0, 800, 500, 0, 0, 800, 500);
  }
}
