import { Target } from "./Target.js";
import { Bullet } from "./Bullet.js";
import Background from "./Background.js";
import { Player } from "./player.js";
import { floorCollisions } from "./collisions.js";
import { CollisionBlock } from "./collisionBlock.js";
import InputHandler from "./InputHandler.js";
import { Object } from "./object.js";

const canvas = document.getElementById("canvas");
canvas.height = 500;
canvas.width = 800;
const ctx = canvas.getContext("2d");
const floorCollision2D = [];

for (let i = 0; i < floorCollisions.length; i += 70) {
  floorCollision2D.push(floorCollisions.slice(i, i + 70));
  //console.log(floorCollisions.slice(i, i + 36));
}

const collisionBlocks = [];
floorCollision2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 192) {
      //console.log(x);
      //console.log(y);
      collisionBlocks.push(
        new CollisionBlock({ position: { x: x * 16, y: y * 16 } })
      );
      //console.log(collisionBlocks);
      //console.log("create block");
    }
  });
});

//----- constant to maintain the frame rate-----------//
let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    //this.bullet=new Bullet (this.width/2+this.gun.width/2,this.height,this);
    this.targets = [];
    this.input = new InputHandler(this);
    this.explosion = {};
    this.explosions = [];
    this.background = new Background(this.width, this.height, this);

    this.object = new Object(
      this.width,
      this.height,
      this,
      collisionBlocks,
      this.background
    );

    this.player = new Player(
      this.width,
      this.height,
      this,
      collisionBlocks,
      this.background
    );

    this.targetNumber = 0;
    this.objectNumber = 0;
    this.collisionBlocks = collisionBlocks;
    this.randomXValue = 0;
  }

  draw(ctx) {
    this.background.draw(ctx);

    if (this.targets[0]) {
      this.targets[0].draw(ctx);
    }

    this.object.draw(ctx);

    this.player.draw(ctx);

    this.collisionBlocks.forEach((collisionBlock) => {
      //console.log(collisionBlock);
      collisionBlock.draw(ctx);
    });

    this.explosions.forEach((explosion) => {
      explosion.draw(ctx);
    });

    ctx.drawImage(nextImage, 410, 400, 100, 100);
    ctx.drawImage(previousImage, 300, 404, 100, 100);
  }

  update(deltaTime, ctx) {
    this.addTarget();
    //console.log(this.targets);

    //this.background.update(ctx);
    this.player.update(this.input, deltaTime);
    this.object.update(this.input, deltaTime);
    this.targets.forEach((target) => {
      //console.log (target)
      target.update();
      this.targets = this.targets.filter((target) => !target.markForDeletion);
    });

    this.explosions.forEach((explosion) => {
      explosion.update(deltaTime);
      this.explosions = this.explosions.filter(
        (explosion) => !explosion.markForDeletion
      );
    });
  }

  addTarget() {
    if (this.targets.length == 0) {
      const frameX = (this.targetNumber % 6);
      const frameY = Math.floor(this.targetNumber / 6);
      this.randomXValue = Math.random() * 600;
      //console.log(this.randomXValue);
      this.targets.push(
        new Target(this, this.randomXValue, frameX, frameY, this.targetNumber+1)
      );

      //this.targets.push(new Target(this,360,frameX,frameY));
      //this.explosions.push( new Explosion(this.targets[0].x,100,this));
      //console.log (this.targets[0].x)
    }
  }
}

const game = new Game(800, 500);
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
  //console.log (game.input)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  game.draw(ctx);
  game.update(deltaTime);
  audio.play();

  requestAnimationFrame(animate);

  //--- Code to maintain frame rate----//
  const msNow = window.performance.now();
  const msPassed = msNow - msPrev;
  if (msPassed < msPerFrame) return;
  const excessTime = msPassed % msPerFrame;
  msPrev = msNow - excessTime;
}

animate(0);
