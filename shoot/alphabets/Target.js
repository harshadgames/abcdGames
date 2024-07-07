import { Explosion } from "./Explosion.js";
import { Object } from "./Object.js";
import { Gun } from "./Gun.js";
let hitCondition = false;

export class Target {
  constructor(game, x, frameX, frameY, targetNumber) {
    this.x = x;
    this.y = 0;
    this.height = 100;
    this.width = 100;
    this.vy = 0;
    this.vx = 30;
    this.game = game;
    this.markForDeletion = false;
    this.dist = 1000;
    this.image = new Image();
    this.image.src = `../../images/alphabets/alphabets.png`;
    this.frameX = frameX;
    this.frameY = frameY;
    this.xCollision = 0;
    this.audioPathOhno = `../../audio/ohno.mp3`;
    this.hitAudioOhno = new Audio(this.audioPathOhno);
    this.hitCondition = false;
    this.audioPath = `../../audio/alphabetsObjects/${targetNumber}.mp3`;
    this.hitAudio = new Audio(this.audioPath);
  }

  draw(context) {
    context.fillStyle = "rgba(255, 0, 0, 0.5)";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      120 + (this.frameX * this.width * 2.5 + this.frameX * 25),
      215 + (this.frameY * this.height * 2.5 + this.frameY * 25),
      this.width * 2.5,
      this.height * 2.5,
      this.x,
      this.y + 100,
      this.width / 1.5,
      this.height / 1.5
    );
  }

  update() {
    this.x += this.vx;

    if (this.x > 800 - this.width) {
      this.vx = -2;
    } else if (this.x < 0) {
      this.vx = +2;
    }

    this.calDist();

    if (this.dist < 60) {
      this.game.hitCondition = true;
      this.hitAudio.play();

      this.xCollision = this.x;
      //console.log(this.x, this.xCollision);
      this.game.explosions.push(new Explosion(this.x, 100, this.game));
      this.game.objects.push(new Object(this.x, 100, this.game));
      this.markForDeletion = true;

      if (this.game.targetNumber < 26) {
        this.game.targetNumber += 1;
      } else {
        this.game.targetNumber = 1;
      }

      if (this.game.objectNumber < 26) {
        this.game.objectNumber += 1;
      } else {
        this.game.objectNumber = 1;
      }
      //console.log(this.hitCondition);
    }

    if (
      !this.game.hitCondition &
      (this.game.bullet.y < 60) &
      (this.game.bullet.y > 0)
    ) {
      this.hitAudioOhno.play();
    }

    /*
        if (((this.game.bullet.y)-(this.y+this.height))<3 && ((this.game.bullet.x)-(this.x+this.width))<3 ){this.markForDeletion=true;
        this.collision ()}
        */
  }

  calDist() {
    const dx = this.game.bullet.x - this.x;
    const dy = this.game.bullet.y - (this.y + this.height / 2);
    this.dist = Math.sqrt(dx * dx + dy * dy);
    //console.log (this.dist)
  }
}
