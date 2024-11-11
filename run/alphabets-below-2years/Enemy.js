import Background from "./Background.js";
const currentDPI = Math.cbrt(window.devicePixelRatio);

export default class Enemy {
  constructor(gameWidth, gameHeight, game, objectNumber, enemyLocation) {
    this.enemyNumber = objectNumber;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    //this.image=document.getElementById('enemyImage'+"_"+enemyNumber);

    this.height = 280;
    this.width = 277;
    this.x = enemyLocation;
    this.y = gameHeight / 8;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 5;
    this.markForDeletion = false;
    this.maxFrame = 1;
    this.frameTimer = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.game = game;
    this.speedY = Math.random > 0.5 ? 5 : -5;
    this.audioPath = `../../audio/alphabetsObjects/${objectNumber + 1}.mp3`;
    this.hitAudio = new Audio(this.audioPath);
    this.image = new Image();
    this.image.src = `../../images/alphabets/alphabets_bw.png`;
  }

  draw(context) {
    //console.log(this.frameY);
    context.drawImage(
      this.image,
      100 + this.frameX * this.width,
      200 + this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width / 2.5,
      this.height / 2.5
    );
    //context.drawImage(this.image,0,0,this.width,this.height,this.x,this.y/1.5,this.width/5,this.height/5)
  }

  update(deltaTime) {
    this.frameX = this.game.objectNumber % 6;
    this.frameY = Math.floor(this.game.objectNumber / 6);

    this.x -= this.speed;

    if (this.x < 0 - this.width) {
      this.markForDeletion = true;
    }
  }
}
