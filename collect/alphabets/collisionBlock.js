export class CollisionBlock {
  constructor({ position }, game) {
    this.position = position;
    this.width = 16;
    this.height = 16;
    this.game = game;
    this.vx = 5;
  }

  draw(context) {
    //context.fillStyle = "rgba(255, 0, 0, 0.5)";

    //context.fillRect(this.position.x, this.position.y, this.width, this.height);

  }

  update(context) {

  
    //this.draw(context);
   /* 
    //console.log(game);
    this.position.x -= this.vx;
    if (this.position.x < 0) {
      this.position.x = 800;
    }

  */
  }
}
