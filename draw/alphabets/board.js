export class board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.height = 500;
    this.width = 500;

    this.image = new Image();
    this.image.src = `../../images/board.png`;
  }

  draw(context) {
    //context.drawImage(this.image, 0, 0, 250, 250, 0, 0, 500, 500);
    context.fillStyle = "rgba(0, 70, 0, 1)";
    context.fillRect(0, 0, 500, 500);
  }

  update(objectNumber) {}
}
