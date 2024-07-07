export class Gun {
  constructor(x, y) {
    this.height = 130;
    this.width = 200;
    this.vy = 0;
    this.vx = 0;
    this.x = x;
    this.y = y;
    this.image1 = new Image();
    this.image1.src = `bow2.png`;
    //this.image1 = document.getElementById("bow1");
  }

  draw(context) {
    //context.fillStyle = "rgba(255, 0, 0, 0.5)";
    //context.fillRect(this.x, this.y - this.height, this.height, this.width);
    context.drawImage(
      this.image1,
      0,
      0,
      1200,
      800,
      410,
      380,
      this.width,
      this.height
    );
  }

  update(context) {}
}
