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

export class Object {
  constructor(gameWidth, gameHeight, game, collisionBlocks, background) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [];
    this.currentState = this.states[0];
    this.width = 150;
    this.height = 120;
    this.x = 0;
    this.y = 200;
    this.image = new Image();
    this.image.src = `../../images/objects/alphabets/1.png`;
    this.speed = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.vy = 0;
    this.weight = 0.5;
    this.maxFrame = 8;
    this.frameTimer = 0;
    this.fps = 50;
    this.frameInterval = 1000 / this.fps;
    this.game = game;
    this.collisionBlocks = collisionBlocks;
    this.hitbox = {
      position: { x: this.x + 60, y: this.y },
      width: this.width,
      height: this.height,
    };
    this.onGroud = 1;
    this.background = background;
    this.hcollions = 0;
    this.oldX = 0;
    //this.explosion=new Explosion(this.width,this.height,this);

    //this.explosion=explosion;
  }

  draw(context) {
    if (this.game.objectNumber > 0) {
      //context.fillStyle = "rgba(255, 0, 0, 0.5)";
      //context.fillRect(this.hitbox.position.x, this.y, 30, 50);

      context.drawImage(
        this.image,
        0,
        0,
        250,
        250,
        this.x + 13,
        this.y - 20,
        this.width / 1.25,
        this.height / 1.25
      );

      //this.explosion.draw(context)

      // Create gradient

      const gradientStops = [
        { color: "rgba(0, 0, 255, 0)", position: 0 }, // Transparent blue at the top
        { color: "rgba(0, 0, 255, 0.8)", position: 0.3 }, // Semi-transparent blue halfway
        { color: "rgba(0, 0, 255, 1)", position: 1 }, // Fully opaque blue at the bottom
      ];

      const startColor = "rgba(0, 0, 255, 0)"; // Transparent blue
      const endColor = "rgba(0, 0, 255, 1)"; // Fully opaque blue
      var grd = context.createLinearGradient(0, 300, 0, 500);
      gradientStops.forEach((stop) =>
        grd.addColorStop(stop.position, stop.color)
      );

      // Fill with gradient
      context.fillStyle = grd;
      context.fillRect(0, 300, 1200, 300);
    }
  }

  update(input, deltaTime) {
    if (this.game.objectNumber > 0) {
      this.x = this.game.player.x;
      this.image.src = `../../images/objects/alphabets/${this.game.objectNumber}.png`;
      this.updateHitbox();

      if (
        (this.hitbox.position.x < this.game.randomXValue) &
        (this.hitbox.position.x + 12 > this.game.randomXValue)
      ) {
        this.speed = 0;
      }

      if (
        (this.hitbox.position.x > this.game.randomXValue) &
        (this.hitbox.position.x - 12 < this.game.randomXValue)
      ) {
        this.speed = 0;
      }

      if (this.hitbox.position.x < 0) {
        this.x = 0;
        this.speed = 0;
      }

      if (this.hitbox.position.x > this.game.width) {
        this.x = this.game.width - 100;
        this.speed = 0;
      }

      //This can be amended for game over

      /*
    if (this.y > this.gameHeight - this.height) {
      this.y = 0;
      this.x=0
    }
 */

      //Horizontal
      //console.log(this.speed);
      this.x += this.speed;

      if (input.keys.length > 0) {
        if (
          input.keys.indexOf("ArrowRight") > -1 ||
          input.keys.indexOf("swipe right") > -1
        ) {
          //console.log(input.keys);
          this.speed = 5;
        } else if (
          input.keys.indexOf("ArrowLeft") > -1 ||
          input.keys.indexOf("swipe left") > -1
        ) {
          this.speed = -5;
          //console.log(input.keys);
        }

        //Jump

        //console.log("before jump", this.onGroud);

        if (
          input.keys.indexOf("ArrowUp") > -1 ||
          (input.keys.indexOf("swipe up") > -1) & this.onGroud
        ) {
          //console.log(input.keys);
          this.y = this.y - 20;
          this.onGroud = 0;
        }
      }

      /// not on fround

      if (!this.onGroud) {
        //console.log("not on ground", this.onGroud);
        this.vy += this.weight;
      }
    }
  }

  updateHitbox() {
    this.hitbox.position.x = this.x + 50;
  }

  // Check for vCollision

  checkForVCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (collision({ object1: this.hitbox, object2: collisionBlock })) {
        //console.log("inside collision");
        this.onGroud = 1;
        //console.log(this.x,this.y);

        if (this.vy > 0) {
          //console.log("vy>0");
          this.vy = 0;
          //this.speed = 0;
          //const offset = 200;
          const offset = this.hitbox.position.y - this.y + this.hitbox.height;
          this.y = collisionBlock.position.y - offset - 0.01;
          break;
        }

        if (this.vy < 0) {
          this.vy = 0;
          const offset = this.hitbox.position.y - this.y;
          this.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }
  }

  //Check for H collision

  /* 
  checkForHCollisions() {
    //console.log("check h collision");

      if (this.x>560) {
        this.speed=-5;
        //console.log ("test")
      }
      else{
        this.speed=5;
      }
    }
  */

  applyGravity() {
    this.y += this.vy;
    this.vy += 0.5;
  }

  //Utility fuctions of player
  /*
  onGroud() {
    return this.y >= this.game.height - this.height;
  }
  */
}
