export class Player {
  constructor(gameWidth, gameHeight, game, background) {
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
  }

  update(deltaTime) {
    //Anination

    this.applyGravity();
    this.updateHitbox();
    this.checkForVCollisions();

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

    if (!this.onGroud) {
      this.game.input.keys = [];
      this.vy += this.weight;
    }

    if ((this.y > this.gameHeight + this.height) & this.game.gameRunning) {
      this.game.gameRunning = false;
      this.vy = 0;

      //this.game.collisionBlocks = [];
    }

    if (
      (this.game.input.keys.indexOf("ArrowUp") > -1 ||
        this.game.input.keys.indexOf("swipe up") > -1) & this.onGroud
    ) {
      this.vy = -15;
      this.y = this.y - 20;
      this.onGroud = 0;
    }
  }

  applyGravity() {
    this.y += this.vy;
  }

  //---------------------------------jump------------------//

  //----------------------------------check V collison-----------------------------//
  checkForVCollisions() {
    for (let i = 0; i < this.game.collisionBlocks.length; i++) {
      const collisionBlock = this.game.collisionBlocks[i];
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

  //---------------------------End Vcollison---------------------//

  //------------- update hitbox--------------//
  updateHitbox() {
    this.hitbox = {
      position: { x: this.x + 32, y: this.y + 26 },
      width: 20,
      height: 28,
    };
  }
  //--------------End Update Hitbox--------------------------//
}

function collision({ object1, object2 }) {
  //console.log(object1.position.y, object2.position.y);
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x >= object2.position.x
  );
}
