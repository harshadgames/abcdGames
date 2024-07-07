import { Player } from "./Player.js";
import Enemy from "./Enemy.js";
import InputHandler from "./InputHandler.js";
import Background from "./Background.js";
import { displayStatusText } from "./Utils.js";
import Explosion from "./Explosion.js";
import { floorCollisions } from "./collisions.js";
import { CollisionBlock } from "./collisionBlock.js";
import Object2 from "./Object2.js";

// Detect device type based on screen width
const currentDPI = window.devicePixelRatio;

const desktopSpeedFactor = 1; // Adjust as needed
const mobileSpeedFactor = 2; // Adjust as needed
export const isMobile = window.innerWidth < 768;
const speedFactor = isMobile ? mobileSpeedFactor : desktopSpeedFactor;
let gameSpeed = (10 / currentDPI) * speedFactor;
export let startGame = false;
let clicked = false;
let frames = 0;

//----- constant to maintain the frame rate-----------//
let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;
let loop = 0;
let gameOver = false;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image1 = document.getElementById("startGame");
ctx.drawImage(image1, 0, 0, 800, 500);

window.addEventListener("load", function () {
  const loadingScreen = document.querySelector(".loading-screen");
  loadingScreen.style.display = "none";

  startGame = false;

  document.getElementById("canvas").addEventListener("click", function () {
    console.log(startGame);
    if (!startGame) {
      startGame = true;

      if (startGame) {
        const loading = document.getElementById("loading");
        //loading.style.display='none';
        const canvas = document.getElementById("canvas");
        const audio = document.getElementById("audio");
        const ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 500;
        canvas.addEventListener("click", function () {
          console.log("status changed");
          clicked = true;
        });
        //let enemies=[];
        //let gameOver = false;

        //window.addEventListener('keydown', function(e){ console.log(e.key)});

        const floorCollision2D = [];
        for (let i = 0; i < floorCollisions.length; i += 100) {
          floorCollision2D.push(floorCollisions.slice(i, i + 100));
          //console.log(floorCollisions.slice(i, i + 36));
        }

        const collisionBlocks = [];
        floorCollision2D.forEach((row, y) => {
          row.forEach((symbol, x) => {
            if (symbol === 192) {
              //console.log(x);
              //console.log(y);
              collisionBlocks.push(
                new CollisionBlock(
                  { position: { x: x * 16, y: y * 16 } },
                  gameSpeed
                )
              );
              //console.log(collisionBlocks);
              //console.log("create block");
            }
          });
        });

        // Avoid unwanted scroll
        canvas.addEventListener(
          "touchmove",
          function (e) {
            e.preventDefault();
          },
          { passive: false }
        );

        document.addEventListener("keydown", (event) => {
          // check if the focused element is within the canvas or any of its child elements
          //console.log(document.activeElement);

          if (canvas.contains(document.activeElement)) {
            // if it is, prevent the default arrow key behavior
            //console.log("test");
            if (
              event.key === "ArrowUp" ||
              event.key === "ArrowDown" ||
              event.key === "ArrowLeft" ||
              event.key === "ArrowRight"
            ) {
              event.preventDefault();
            }
          }
        });

        class Game {
          constructor(width, height) {
            this.width = width;
            this.height = height;
            this.input = new InputHandler();
            this.background = new Background(
              this.width,
              this.height,
              this,
              gameSpeed
            );
            this.player = new Player(
              this.width,
              this.height,
              this,
              collisionBlocks,
              this.background
            );

            //this.explosion=new Explosion(this.width,this.height,this)
            this.enemies = [];
            this.explosions = [];
            this.collisionBlocks = collisionBlocks;
            this.enemyTimer = 0;
            this.enemyInterval = 6000;
            this.enemyNumber = 0;
            this.objectNumber = 0;
            this.object = new Object2(
              this.width,
              this.height,
              this,
              collisionBlocks,
              this.background
            );
            this.speedFactor = speedFactor;

            let gameOver = false;
          }
          draw(context) {
            this.background.draw(context);

            this.enemies.forEach((enemy) => {
              enemy.draw(ctx);
            });

            this.player.draw(context);
            this.object.draw(context);
            this.explosions.forEach((explosion) => {
              explosion.draw(context);
            });

            //this.collisionBlocks.draw(ctx);
          }

          update(deltaTime, clicked) {
            this.background.update();

            //this.collisionBlocks[0].update(ctx);
            //this.explosion.update(deltaTime)
            //console.log("in game class",gameOver);

            this.collisionBlocks.forEach((collisionBlock) => {
              //console.log(collisionBlock);
              collisionBlock.update(ctx);
            });

            this.player.update(this.input, 3, clicked);
            this.object.update(this.input, 3);

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
              this.enemies = this.enemies.filter(
                (enemy) => !enemy.markForDeletion
              );
              //console.log(enemies)
            });

            //handle explosion
            this.explosions.forEach((explosion) => {
              explosion.update(deltaTime);
              this.explosions = this.explosions.filter(
                (explosion) => !explosion.markForDeletion
              );
            });
          }

          // fuctions

          addEnemy() {
            this.enemies.push(
              new Enemy(
                canvas.width,
                canvas.height,
                this,
                this.objectNumber,
                this.background.x1 + 930
              )
            );
          }
        }

        //Object declaration
        const game = new Game(canvas.width, canvas.height);
        //Constant for animate
        let lastTime = 0;
        //let enemyTimer=0;
        //let enemyInterval=100;

        // Handle horizontal scroll

        canvas.addEventListener(
          "touchmove",
          function (e) {
            e.preventDefault();
          },
          { passive: false }
        );

        //Animate function
        function animate(timeStamp) {
          if (!game.gameOver) {
            //console.log(collisionBlocks.length);
            requestAnimationFrame(animate);
            //console.log(game.gameOver);
            //ctx.drawImage(image1, 0, 0, 800, 500);
          } else {
            gameOver = true;
            audio.pause();
            audio.currentTime = 0;
            startGame = false;
          }

          //--- Code to maintain frame rate----//
          const msNow = window.performance.now();
          const msPassed = msNow - msPrev;
          if (msPassed < msPerFrame) return;
          const excessTime = msPassed % msPerFrame;
          msPrev = msNow - excessTime;

          ctx.clearRect(0, 0, 800, 500);
          const deltaTime = timeStamp - lastTime;
          lastTime = timeStamp;
          audio.play();

          game.draw(ctx);
          game.update(deltaTime, clicked);
          //handleEnemies(deltaTime);

          displayStatusText(ctx, game.gameOver, image1);
          //console.log("in animate",gameOver);

          //console.log("test")
          //console.log(floorCollision2D);
        }

        animate(0);
      }
    }
  });
});
