export class PencilHighlight {
  constructor(x, y) {
    this.height = 130;
    this.width = 200;
    this.vy = 0;
    this.vx = 0;
    this.image1 = new Image();
    this.image1.src = `images/pencil.png`;
    this.x = x;
    this.y = y;

    //this.image1 = document.getElementById("bow1");
  }

  draw(context) {
    context.fillStyle = "rgba(255, 0, 0, 0.5)";
    context.fillRect(this.x, this.y - 100, this.height, this.width);
  }

  update(currentX, currentY) {
    this.x = currentX;
    this.y = currentY;
  }
}
