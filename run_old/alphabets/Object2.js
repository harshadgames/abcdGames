import Explosion from "./Explosion.js";
import { CollisionBlock } from "./collisionBlock.js";
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

export default class Object2 {
  constructor(gameWidth, gameHeight, game, collisionBlocks, background) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [];
    this.currentState = this.states[0];
    this.width = 200;
    this.height = 200;
    this.x = game.player.x;
    this.y = 100;
    this.image = new Image();
    this.image.src = `../../images/objects/alphabets/1.png`;

    this.speed = 10;
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
    if (this.game.objectNumber > 0) {
      context.drawImage(
        this.image,
        0,
        0,
        250,
        250,
        this.x,
        this.y - 60,
        this.width / 2,
        this.height / 2
      );
    }
    //this.explosion.draw(context)
  }

  update(input, deltaTime) {
    //console.log(this.game.background.x);
    this.x = this.game.player.x;

    if (this.game.objectNumber > 0) {
      this.applyGravity();

      //console.log("before collision", this.onGroud);
      this.image.src = `../../images/objects/alphabets/${this.game.objectNumber}.png`;

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
          //enemy.hitAudio.play();
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
        //console.log("test");
      }

      //Horizontal
      //console.log(this.speed);
      //this.x += this.speed / this.game.speedFactor;

      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 3;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -3;
      }

      //Jump

      //this.y = this.y - this.vy;

      //console.log("before jump", this.onGroud);

      if (
        (input.keys.indexOf("ArrowUp") > -1 ||
          input.keys.indexOf("swipe up") > -1) & this.onGroud
      ) {
        //console.log(this.onGroud);
        this.vy = -13;
        this.y = this.y - 40;
        this.onGroud = 0;
      }

      /// not on fround

      if (!this.onGroud) {
        //console.log("not on ground", this.onGroud);
        this.vy += this.weight;
      }
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
