export class Bullet {
  constructor(x, y, game) {
    this.height = 20;
    this.width = 20;
    this.vy = 0;
    this.vx = 0;
    this.x = x;
    this.y = y - this.height;
    this.game = game;
    this.y = this.game.height;
    this.image1 = new Image();
    this.image1.src = `../../images/rocket.png`;
    this.audioPath = `../../audio/rocket.mp3`;
    this.hitAudio = new Audio(this.audioPath);
    this.hitAudio.currentTime = 1;
  }

  draw(context) {
    context.drawImage(
      this.image1,
      0,
      0,
      270,
      400,
      this.x,
      this.y - 120,
      80,
      160
    );
  }

  update(position, input) {
    this.y -= this.vy;
    if (input.i) {
      this.hitAudio.play();
      if (this.vy > 2) {
        this.vy = this.vy + 0.5;
      } else {
        this.vy = 3;
      }
    } else {
      this.vy = 0;
      //this.hitAudio.currentTime = 1;
    }
    //input=1;

    //console.log(this.x)

    //this.x=position+(this.game.gun.width/2)-this.width/2;

    if (this.y + 200 < 0) {
      setTimeout(() => {
        this.y = this.game.height;
      }, 1000);
      this.vy = 0;
      input.i = 0;
      this.game.hitCondition = false;
    }
  }
}
