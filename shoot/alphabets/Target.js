import { Explosion } from "./Explosion.js";
import { Object } from "./Object.js";
import { Gun } from "./Gun.js";
let hitCondition = false;

export class Target {
  constructor(game, x, frameX, frameY, targetNumber) {
    this.x = x;
    this.y = 0;
    this.height = 280;
    this.width = 277;
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
    //context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      110 + (this.frameX * this.width ),
      200 + (this.frameY * this.height ),
      this.width ,
      this.height,
      this.x,
      this.y + 100,
      this.width/3 ,
      this.height/3
    );
  }

  update() {
    this.x += this.vx;

    if (this.x > 700 - this.width) {
      this.vx = -2;
    } else if (this.x < 200) {
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

      if (this.game.targetNumber < 25) {
        this.game.targetNumber += 1;
      } else {
        console.log ("target over");
        this.game.targetNumber = 0;
      }

      if (this.game.objectNumber < 26) {
        this.game.objectNumber += 1;
      } else {
        console.log ("object over");
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
