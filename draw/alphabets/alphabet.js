export class alphabet {
  constructor(objectNumber) {
    this.x = 0;
    this.y = 0;
    this.height = 500;
    this.width = 500;
    this.markForDeletion = false;
    this.image = new Image();
    this.image.src = `../../images/draw_alphabets/${objectNumber}.png`;
    this.audioPath = `../../audio/alphabetSObjects/${objectNumber}.mp3`;
    this.hitAudio = new Audio(this.audioPath);
    this.objectNumber = objectNumber;
  }

  draw(context) {
    //console.log(this.image.src);
    context.drawImage(this.image, 0, 0, 1000, 1000, 0, 0, 500, 500);
  }

  update(objectNumber) {
    this.image.src = `../../images/draw_alphabets/${objectNumber}.png`;
    this.x += this.vx;
  }
}
