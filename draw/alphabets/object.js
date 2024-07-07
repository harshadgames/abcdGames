export class object {
  constructor(objectNumber) {
    this.x = 0;
    this.y = 0;
    this.height = 500;
    this.width = 500;
    this.vy = 0;
    this.vx = 0;
    this.markForDeletion = false;
    this.dist = 1000;
    this.animationImage = new Image();
    this.objectImage = new Image();
    this.animationImage.src = `./images/animation.png`;
    this.objectImage.src = `../../images/objects/alphabets/${
      objectNumber - 1
    }.png`;

    this.xCollision = 0;
    this.hitCondition = false;
    this.audioPath = `../../audio/alphabetsObjects/${objectNumber - 1}.mp3`;
    this.hitAudio = new Audio(this.audioPath);
    this.objectNumber = objectNumber - 1;
    this.audioPlayed = false;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 4;
    this.frameTimer = 0;
    this.fps = 40;
    this.frameInterval = 166;
  }

  draw(ctx) {
    //context.drawImage(this.image, 0, 0, 2000, 2000, this.x, this.y, 500, 500);
    //context.fillStyle = "rgba(255, 0, 0, 0.5)";
    //context.fillRect(this.x, this.y, this.width, this.height);

    /*

    // Play the video
    videoPlayer.play();

    // Draw each video frame onto the canvas
    videoPlayer.addEventListener("play", function () {
      const draw = () => {
        if (videoPlayer.paused || videoPlayer.ended) return;
        ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(draw);
      };
      draw();
    });

    */

    ctx.drawImage(
      this.objectImage,
      0,
      0,

      this.width,
      this.height,
      this.width / 4,
      0,
      this.width,
      this.height
    );

    ctx.drawImage(
      this.animationImage,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (!this.audioPlayed) {
      this.hitAudio.play();
    }
  }

  update(deltaTime) {
    //console.log(this.frameInterval, this.frameTimer, deltaTime);
    this.y += this.vy;
    this.audioPlayed = true;

    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrame) {
        this.frameX = 0;
      } else {
        this.frameX++;
      }

      this.frameTimer = 0;
    } else {
      this.frameTimer += 15;
      //console.log(this.frameTimer);
    }

    //console.log(this.markForDeletion);
  }

  //this.hitAudio = new Audio(this.audioPath);
  //console.log(this.audioPath);
}
