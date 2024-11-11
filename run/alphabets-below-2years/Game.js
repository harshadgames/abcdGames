import { Player } from "./Player.js";
import Enemy from "./Enemy.js";
import InputHandler from "./InputHandler.js";
import Background from "./Background.js";
import Object2 from "./Object2.js";
import Explosion from "./Explosion.js";

export default class Game {
  constructor(width, height, gameRunning, collisionBlocks, gameSpeed) {
    this.width = width;
    this.height = height;
    this.input = new InputHandler(this);
    this.collisionBlocks = collisionBlocks;
    this.gameSpeed = gameSpeed;
    this.background = new Background(this.width, this.height, this);
    this.player = new Player(
      this.width,
      this.height,
      this,
      this.collisionBlocks,
      this.background
    );

    //this.explosion=new Explosion(this.width,this.height,this)
    this.enemies = [];
    this.explosions = [];
    this.enemyTimer = 0;
    this.enemyInterval = 6000;
    this.enemyNumber = 0;
    this.objectNumber = 0;
    this.object = new Object2(
      this.width,
      this.height,
      this,
      this.collisionBlocks,
      this.background
    );

    let gameOver = false;
    this.audio = document.getElementById("audio");
    this.gameRunning = gameRunning;
  }
  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });

    this.object.draw(context);
    this.explosions.forEach((explosion) => {
      explosion.draw(context);
    });
  }

  update(deltaTime, context) {
    this.player.update(3);
    this.background.update();
    this.collisionBlocks.forEach((collisionBlock) => {
      //console.log(collisionBlock);
      collisionBlock.update(context);
    });

    //Handle enemies
    if ((this.background.x2 + 250 < 0) & (this.enemies < 1)) {
      if (this.enemyNumber > 25) {
        this.enemyNumber = 1;
      } else {
        this.enemyNumber += 1;
      }
      this.addEnemy();
      this.enemyTimer = 0;
    }

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
      this.enemies = this.enemies.filter((enemy) => !enemy.markForDeletion);
      //console.log(enemies)
    });

    this.object.update(this.input, 3);

    //-----------handle explosion-------------------------//

    this.explosions.forEach((explosion) => {
      explosion.update(deltaTime);
      this.explosions = this.explosions.filter(
        (explosion) => !explosion.markForDeletion
      );
    });

    //---------------------check collision--------------//

    this.enemies.forEach((enemy) => {
      const dx =
        enemy.x + enemy.width / 2 - (this.player.x + this.player.width / 2);
      const dy =
        enemy.y + enemy.height / 2 - (this.player.y + this.player.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 80) {
        this.explosions.push(
          new Explosion(enemy.x + enemy.width / 6, 600, this.game)
        );

        enemy.markForDeletion = true;

        if (this.objectNumber < 25) {
          this.objectNumber += 1;
        } else {
          this.objectNumber = 0;
        }

        enemy.hitAudio.play();
      }

      //this.explosion.update(deltaTime);
    });

    //---------------------- done checking collision----------//
  }

  addEnemy() {
    this.enemies.push(
      new Enemy(
        canvas.width,
        canvas.height,
        this,
        this.objectNumber,
        this.background.x1 + 750
      )
    );
  }
}
