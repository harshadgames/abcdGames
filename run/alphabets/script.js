import Game from "./Game.js";
import { CollisionBlock } from "./collisionBlock.js";
import { floorCollisions } from "./collisions.js";

let gameSpeed = 8;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image1 = document.getElementById("startGame");
let startGame = false;
let loaded = false;
let gameRunning = false;
let lastTime = 0;

const collisionBlocks = [];
const floorCollision2D = [];

//----- constant to maintain the frame rate-----------//
let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;

ctx.drawImage(image1, 0, 0, 800, 500);

for (let i = 0; i < floorCollisions.length; i += 100) {
  floorCollision2D.push(floorCollisions.slice(i, i + 100));
  //console.log(floorCollisions.slice(i, i + 36));
}
floorCollision2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 192) {
      //console.log(x);
      //console.log(y);
      collisionBlocks.push(
        new CollisionBlock({ position: { x: x * 16, y: y * 16 } }, gameSpeed)
      );
      //console.log(collisionBlocks);
      //console.log("create block");
    }
  });
});

canvas.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);

const game = new Game(
  canvas.width,
  canvas.height,
  gameRunning,
  collisionBlocks,
  gameSpeed
);

window.addEventListener("load", function () {
  const loadingScreen = document.querySelector(".loading-screen");
  loadingScreen.style.display = "none";
  loaded = true;
  ctx.drawImage(image1, 0, 0, 800, 500);
});

document.getElementById("canvas").addEventListener("click", function () {
  if (loaded & !game.gameRunning) {
    startGame = true;
    game.gameRunning = true;
    game.player.y = 200;

    if (game.gameRunning) {
      game.audio.play();
    }

    animate(0);
  }
});

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    console.log("hidden");
    // Pause the music when the tab is not in view
    game.audio.pause();
  } else {
    if (game.gameRunning) {
      game.audio.play();
    }
  }
});

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  if (game.gameRunning) {
    requestAnimationFrame(animate);
  } else {
    game.audio.pause();
    console.log("paused");
  }

  //--- Code to maintain frame rate----//
  const msNow = window.performance.now();
  const msPassed = msNow - msPrev;
  if (msPassed < msPerFrame) return;
  const excessTime = msPassed % msPerFrame;
  msPrev = msNow - excessTime;

  ctx.clearRect(0, 0, 800, 500);
  game.draw(ctx);
  game.update(deltaTime, ctx);
}


document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });
});
