export class Pencil {
  constructor(x, y) {
    this.height = 200;
    this.width = 200;
    this.vy = 0;
    this.vx = 0;
    this.image1 = new Image();
    this.image1.src = `images/chalk.png`;
    this.x = x;
    this.y = y;

    //this.image1 = document.getElementById("bow1");
  }

  draw(context, color) {
    //context.fillStyle = "rgba(255, 0, 0, 0.5)";
    //context.fillRect(this.x, this.y - this.height, this.height, this.width);

    ///context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    //context.arc(this.x, this.y, 20, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();

    context.drawImage(
      this.image1,
      0,
      0,
      180,
      180,
      this.x - 40,
      this.y - 175,
      this.width,
      this.height
    );
  }

  update(currentX, currentY) {
    this.x = currentX;
    this.y = currentY;
  }
}
