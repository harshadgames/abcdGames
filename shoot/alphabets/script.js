import { Target } from "./Target.js";
import { Gun } from "./Gun.js";
import { Bullet } from "./Bullet.js";
import { Explosion } from "./Explosion.js";
import Background from "./Background.js";
import { Object } from "./Object.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const audio = document.getElementById("audio");

//----- constant to maintain the frame rate-----------//
let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;

let input = {
  i: 0,
};

document.addEventListener("click", function () {
  //console.log("test")
  input.i = 1;

  //console.log(cl);
  //console.log(input);
  //console.log(bullets[0]);
});

//context.fillStyle = "rgba(255, 0, 0, 0.5)";
//context.fillRect(0, 0, 200, 200);

//ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
//ctx.fillRect(400,400,400,400);

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    //this.target=new Target (this);
    this.gun = new Gun(this.width / 2, this.height);
    //this.input=input;
    this.bullet = new Bullet(this.width / 2 - 50, this.height, this);
    this.targets = [];
    this.explosion = {};
    this.explosions = [];
    this.object = {};
    this.objects = [];

    this.targetNumber = 1;
    this.objectNumber = 0;
    this.background = new Background(this.width * 1.3, this.height * 1.2, this);
    this.hitcondition = false;
  }

  draw(ctx) {
    this.background.draw(ctx);
    if (this.targets[0]) {
      this.targets[0].draw(ctx);
    }
    //this.targets.forEach((target)=>{target.draw(ctx)});
    //this.gun.draw(ctx);
    this.bullet.draw(ctx);
    //this.explosion.draw(ctx)

    this.objects.forEach((object) => {
      object.draw(ctx);
    });

    this.explosions.forEach((explosion) => {
      explosion.draw(ctx);
    });
  }

  update(deltaTime) {
    //this.target.update();
    this.gun.update(ctx);
    this.bullet.update(this.gun.x, input);
    this.addTarget();
    //console.log(this.targets);

    this.targets.forEach((target) => {
      //console.log (target)
      target.update();
      this.targets = this.targets.filter((target) => !target.markForDeletion);
    });

    //console.log(this.targets)
    //console.log (this.explosions)

    //handle explosion

    this.explosions.forEach((explosion) => {
      explosion.update(deltaTime);
      this.explosions = this.explosions.filter(
        (explosion) => !explosion.markForDeletion
      );
    });

    this.objects.forEach((object) => {
      object.update(deltaTime);
      this.objects = this.objects.filter((object) => !object.markForDeletion);
    });
  }

  addTarget() {
    if (this.targets.length == 0) {
      let frameX = 0;
      if (this.targetNumber % 6 == 0) {
        frameX = (this.targetNumber / 6) * 6;
      } else {
        frameX = (this.targetNumber % 6) - 1;
      }

      console.log();
      const frameY = Math.floor(this.targetNumber / 6);
      const randomXValue = (Math.random() * 2 - 1) * 1000;
      this.targets.push(
        new Target(this, randomXValue, frameX, frameY, this.targetNumber)
      );
      //this.explosions.push( new Explosion(this.targets[0].x,100,this));
      console.log(this.targets[0].x);
    }

    /*
    else if(this.targets[0]){
    if (this.targets[0].markForDeletion){
    this.targets.push(new Target(this))}}
    */
  }
}

const game = new Game(canvas.width, canvas.height);
let lastTime = 0;

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    console.log("hidden");
    // Pause the music when the tab is not in view
    audio.pause();
  } else {
    if (game.gameRunning) {
      audio.play();
    }
  }
});

function animate(timeStamp) {
  //console.log(input);
  requestAnimationFrame(animate);
  //--- Code to maintain frame rate----//
  const msNow = window.performance.now();
  const msPassed = msNow - msPrev;
  if (msPassed < msPerFrame) return;
  const excessTime = msPassed % msPerFrame;
  msPrev = msNow - excessTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  game.draw(ctx);
  game.update(deltaTime);
  audio.play();
}

animate(0);
