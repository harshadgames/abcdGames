import Explosion from "./Explosion.js";
let queue = new createjs.LoadQueue();
queue.installPlugin(createjs.Sound);
queue.loadManifest([
  { id: "water", src: "../../audio/water.mp3" },
  { id: "1", src: "../../audio/alphabetsObjects/1.mp3" },
  { id: "2", src: "../../audio/alphabetsObjects/2.mp3" },
  { id: "3", src: "../../audio/alphabetsObjects/3.mp3" },
  { id: "4", src: "../../audio/alphabetsObjects/4.mp3" },
  { id: "5", src: "../../audio/alphabetsObjects/5.mp3" },
  { id: "6", src: "../../audio/alphabetsObjects/6.mp3" },
  { id: "7", src: "../../audio/alphabetsObjects/7.mp3" },
  { id: "8", src: "../../audio/alphabetsObjects/8.mp3" },
  { id: "9", src: "../../audio/alphabetsObjects/9.mp3" },
  { id: "10", src: "../../audio/alphabetsObjects/10.mp3" },
  { id: "11", src: "../../audio/alphabetsObjects/11.mp3" },
  { id: "12", src: "../../audio/alphabetsObjects/12.mp3" },
  { id: "13", src: "../../audio/alphabetsObjects/13.mp3" },
  { id: "14", src: "../../audio/alphabetsObjects/14.mp3" },
  { id: "15", src: "../../audio/alphabetsObjects/15.mp3" },
  { id: "16", src: "../../audio/alphabetsObjects/16.mp3" },
  { id: "17", src: "../../audio/alphabetsObjects/17.mp3" },
  { id: "18", src: "../../audio/alphabetsObjects/18.mp3" },
  { id: "19", src: "../../audio/alphabetsObjects/19.mp3" },
  { id: "20", src: "../../audio/alphabetsObjects/20.mp3" },
  { id: "21", src: "../../audio/alphabetsObjects/21.mp3" },
  { id: "22", src: "../../audio/alphabetsObjects/22.mp3" },
  { id: "23", src: "../../audio/alphabetsObjects/23.mp3" },
  { id: "24", src: "../../audio/alphabetsObjects/24.mp3" },
  { id: "25", src: "../../audio/alphabetsObjects/25.mp3" },
  { id: "26", src: "../../audio/alphabetsObjects/26.mp3" },
]);

export class Target {
  constructor(game, x, frameX, frameY, targetNumber) {
    this.x = x;
    this.y = 0;
    this.height = 100;
    this.width = 100;
    this.vy = 3;
    this.vx = 0;
    this.game = game;
    this.markForDeletion = false;
    this.dist = 1000;
    this.image = new Image();
    this.image.src = `../../images/alphabets/alphabets.png`;
    document.getElementById("targetImage");
    this.frameX = frameX;
    this.frameY = frameY;
    this.xCollision = 0;
    this.audioPathWater = `../../audio/water.mp3`;
    this.hitAudioWater = new Audio(this.audioPathWater);
    this.audioPath = `../../audio/alphabetsObjects/${targetNumber}.mp3`;
    this.targetNumber = targetNumber;
    this.hitAudio = new Audio(this.audioPath);
    this.waterPlayed = false;
  }

  draw(context) {
    context.fillStyle = "rgba(255, 0, 0, 0.5)";
    context.fillRect(this.x, this.y, this.width / 2, this.height / 2);
    context.drawImage(
      this.image,
      120 + (this.frameX * this.width * 2.5 + this.frameX * 25),
      215 + (this.frameY * this.height * 2.5 + this.frameY * 25),
      this.width * 2.5,
      this.height * 2.5,
      this.x,
      this.y,
      this.width / 2,
      this.height / 2
    );
  }

  update() {
    this.y += this.vy;

    //console.log(this.dist);
    if (this.y > 300) {
      if (!this.waterPlayed) {
        createjs.Sound.play("water");
        this.waterPlayed = true;
      }

      //this.hitAudioWater.play();
    }

    if (this.y > 500) {
      this.markForDeletion = true;
      this.y = 0;
      //this.x = Math.random() * 600;
    }

    this.calDist();

    if (this.y > 220) {
      if (this.dist < 30) {
        this.game.input.keys = [];
        this.game.player.speed = 0;

        console.log(this.hitAudio);
        //console.log(this.x,this.xCollision);
        //this.game.explosions.push( new Explosion(this.x,this.y,this.game));
        //console.log (this.y);
        this.vy = 0;
        this.markForDeletion = true;
        this.hitAudio.play();
        //createjs.Sound.play(this.targetNumber);
        if (this.game.objectNumber < 26) {
          this.game.objectNumber += 1;
        } else {
          this.game.objectNumber = 0;
        }

        if (this.game.targetNumber < 26) {
          this.game.targetNumber += 1;
        } else {
          this.game.targetNumber = 0;
        }

        //this.game.input = [];
      }
    }

    /*
        if (((this.game.bullet.y)-(this.y+this.height))<3 && ((this.game.bullet.x)-(this.x+this.width))<3 ){this.markForDeletion=true;
        this.collision ()}
        */
  }

  calDist() {
    const dx = this.game.player.hitbox.position.x - this.x;
    const dy = this.game.player.hitbox.position.y - this.y;
    this.dist = Math.sqrt(dx * dx + dy * dy);
  }
}
