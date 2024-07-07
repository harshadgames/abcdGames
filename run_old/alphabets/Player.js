import Explosion from "./Explosion.js";
import { CollisionBlock } from "./collisionBlock.js";
import { startGame } from "./script.js";

function collision({ object1, object2 }) {
  //console.log(object1.position.y, object2.position.y);
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x >= object2.position.x
  );
}

function collisionX({ object1, object2 }) {
  //console.log(object1.position.y, object2.position.y);
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y > object2.position.y + object1.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  );
}

const currentDPI = window.devicePixelRatio;

export class Player {
  constructor(gameWidth, gameHeight, game, collisionBlocks, background) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [];
    this.currentState = this.states[0];
    this.width = 200;
    this.height = 200;
    this.x = 200;
    this.y = 200;
    this.image = document.getElementById("playerImage");
    this.speed = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.vy = 0;
    this.weight = 0.5;
    this.maxFrame = 8;
    this.frameTimer = 0;
    this.fps = 50;
    this.frameInterval = 500 / this.fps;
    this.game = game;
    this.collisionBlocks = collisionBlocks;
    this.hitbox = {
      position: { x: this.x, y: this.y },
      width: 10,
      height: 10,
    };
    this.onGroud = 0;
    this.background = background;
    this.hcollions = 0;

    //this.explosion=new Explosion(this.width,this.height,this);

    //this.explosion=explosion;
  }

  draw(context) {
    //console.log(currentDPI);
    //context.fillstyle='white';
    //context.fillRect(this.x,this.y,this.width,this.height);
    /*
        context.strokeStyle='white';
        context.strokeRect(this.x,this.y,this.width, this.height)
        context.arc(this.x+this.width/2,this.y+this.width/2,this.width/2,0,Math.PI*2);
        context.stroke();
        */
    //console.log (this.frameX);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width / 2,
      this.height / 2
    );
    //this.explosion.draw(context)
  }

  update(input, deltaTime, clicked) {
    //console.log(this.y);

    if (this.y < 110) {
      this.game.input.keys = [];
    }

    //console.log(this.game.background.x);
    this.applyGravity();

    //console.log("before collision", this.onGroud);

    this.checkForVCollisions();
    //this.checkForHCollisions();
    //this.checkForHCollisions2();

    //console.log(this.hcollions);

    this.updateHitbox();
    // Collision detection
    this.game.enemies.forEach((enemy) => {
      const dx = enemy.x + enemy.width / 2 - (this.x + this.width / 2);
      //console.log(enemy.x);
      const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2);
      //console.log("dis_y", dy);
      //console.log("player",this.y);

      const distance = Math.sqrt(dx * dx + dy * dy);
      //console.log(this.y);
      //console.log(distance);

      if (distance < 80) {
        this.game.explosions.push(
          new Explosion(enemy.x + enemy.width / 6, 600, this.game)
        );
        enemy.markForDeletion = true;

        //this.game.object.y = 0;

        if (this.game.objectNumber < 25) {
          this.game.objectNumber += 1;
        } else {
          this.game.objectNumber = 0;
        }

        enemy.hitAudio.play();
        //console.log(distance);
      }

      //this.explosion.update(deltaTime);
    });

    //Anination

    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrame) {
        this.frameX = 0;
      } else {
        this.frameX++;
      }

      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    //Boundries
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > this.gameWidth - this.width) {
      this.x = this.gameWidth - this.width;
    }

    //This can be amended for game over

    if (this.y > this.gameHeight + this.height) {
      //this.y = this.gameHeight - this.height;
      this.game.gameOver = true;
      clicked = false;

      //console.log("test");
    }

    //Horizontal
    //console.log(this.speed);
    this.x += this.speed * currentDPI;

    if (input.keys.indexOf("ArrowRight") > -1) {
      this.speed = 3 * currentDPI;
    } else if (input.keys.indexOf("ArrowLeft") > -1) {
      this.speed = -3 * currentDPI;
    }

    //Jump

    if (
      (input.keys.indexOf("ArrowUp") > -1 ||
        input.keys.indexOf("swipe up") > -1) &
      this.onGroud &
      clicked
    ) {
      console.log(clicked);
      this.vy = -13;
      this.y = this.y - 40;
      this.onGroud = 0;
    }

    /// not on fround

    if (!this.onGroud) {
      //console.log("not on ground", this.onGroud);
      //clicked = fasle;
      this.vy += this.weight;
    }
  }

  updateHitbox() {
    this.hitbox = {
      position: { x: this.x + 32, y: this.y + 26 },
      width: 20,
      height: 28,
    };
  }

  // Check for vCollision

  checkForVCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (collision({ object1: this.hitbox, object2: collisionBlock })) {
        //console.log("inside collision");
        this.onGroud = 1;

        if (this.vy > 0) {
          //console.log("vy>0");
          //this.vy = 0;
          this.speed = 0;
          //const offset = 200;
          const offset = this.hitbox.position.y - this.y + this.hitbox.height;
          this.y = collisionBlock.position.y - offset - 0.01;
          break;
        }

        if (this.vy < 0) {
          //this.vy = 0;
          const offset = this.hitbox.position.y - this.y;
          this.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      } else {
        this.onGroud = 0;
      }
    }
  }

  //Check for H collision

  checkForHCollisions() {
    //console.log("check h collision");
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (collisionX({ object1: this.hitbox, object2: collisionBlock })) {
        if (this.game.enemies) {
          this.game.enemies.speed = 0;
        }
        this.background.vx = 0;
        this.hcollions = 1;

        for (let j = 0; j < this.collisionBlocks.length; j++) {
          const collisionBlock2 = this.collisionBlocks[j];
          collisionBlock2.vx = 0;
        }
      }
    }
  }

  checkForHCollisions2() {
    let test = 0;
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (collisionX({ object1: this.hitbox, object2: collisionBlock })) {
        test = 1;
        break;
      }
    }
    if (!test) {
      //this.background.vx = 6;
      for (let j = 0; j < this.collisionBlocks.length; j++) {
        const collisionBlock2 = this.collisionBlocks[j];
        collisionBlock2.vx = 4;
      }
    }
  }

  applyGravity() {
    this.y += this.vy;
    //this.vy += 0;
  }

  //Utility fuctions of player
  /*
  onGroud() {
    return this.y >= this.game.height - this.height;
  }
  */
}
