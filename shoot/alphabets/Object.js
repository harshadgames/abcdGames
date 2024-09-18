export class Object {
  constructor(x, y, game) {
    //this.enemyNumber=enemyNumber;
    //this.gameWidth=gameWidth;
    //this.gameHeight=gameHeight;
    //this.image=document.getElementById('enemyImage'+"_"+enemyNumber);

    this.height = 200;
    this.width = 200;
    this.x = x;
    this.y = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.markForDeletion = false;
    this.maxFrame = 8;
    this.frameTimer = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    //this.frameTimer=this.frameInterval;
    this.game = game;
    //this.speedY=Math.random>0.5?5:-5;
    //this.audioPath=`/alphabets/${enemyNumber}.mp3`;
    //this.hitAudio = new Audio(this.audioPath);
    this.image = new Image();
    //this.image.src=`${enemyNumber}.png`;
    this.image.src = `../../images/objects/alphabets/1.png`;
  }

  draw(context) {
    //console.log(this.frameX);
    //context.drawImage(this.image,this.frameX*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height)
    if (this.image)
      {context.drawImage(this.image, 0, 0, 1000, 1000, 360, 100, 350, 350);
    }
    }

  update(deltaTime) {
    // Enemy sprite animation

    if (this.frameTimer * 2 > this.frameInterval) {
      //console.log(this.frameTimer, this.frameInterval);
      if (this.frameX >= this.maxFrame) {
        setTimeout(() => {
          this.markForDeletion = true;
        }, 1000); // 2000 milliseconds = 2 seconds
      } else {
        this.frameX++;
      }
      this.frameTimer = 0;
      //console.log(this.frameX);
    } else {
      //console.log(deltaTime);
      this.frameTimer += deltaTime;
    }

    this.image.src = `../../images/objects/alphabets/${this.game.objectNumber}.png`;

    //this.x-=this.speed;
    //this.x-=0;
    //this.y-=this.speedY;
  }
}
