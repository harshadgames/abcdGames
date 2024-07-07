export class guidingCurve {
  constructor(gudingCurve1) {
    this.frameX = 0;
    this.frameTimer = 0;
    this.fps = 50;
    this.frameInterval1 = 100;
    this.frameInterval2 = 200;

    this.image = gudingCurve1;
  }

  draw(context) {
    //console.log(this.image);
    //context.drawImage(this.image, 0, 0, 1000, 1000, 0, 0, 500, 500);
  }

  update(context, deltaTime, guidingCurve1, guidingCurve2) {
    //console.log("frametimer");
    if (
      this.frameTimer > this.frameInterval1 &&
      this.frameTimer < this.frameInterval2
    ) {
      context.drawImage(guidingCurve1, 0, 0, 1000, 1000, 0, 0, 500, 500);
      //console.log(guidingCurve1);
      this.frameTimer += deltaTime;
    } else if (this.frameTimer < this.frameInterval1) {
      context.drawImage(guidingCurve2, 0, 0, 1000, 1000, 0, 0, 500, 500);
      this.frameTimer += deltaTime;
      //console.log(guidingCurve2);
    } else {
      this.frameTimer = 0;
    }
    //Anination
    /*

    if (this.frameTimer > this.frameInterval) {
      if (this.frameX == 0) {
        console.log("curve1");
        this.image = guidingCurve1.image;
        this.frameX = 1;
      } else {
        
        console.log("curve2");
        this.image = guidingCurve1.image;
        
        
        this.frameX = 0;
      }

      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
*/
  }
}

export class guidingCurve1 {
  constructor(objectNumber, curveNumber) {
    this.image = new Image();
    this.image.src = `../../images/draw_alphabets/${objectNumber}_${curveNumber}_1.png`;
    this.audioPath = `./audio/${objectNumber}.mp3`;
  }

  update(objectNumber, curveNumber, subCurveFlowNum) {
    this.image.src = `../../images/draw_alphabets/${objectNumber}_${curveNumber}_1.png`;
  }
}

export class guidingCurve2 {
  constructor(objectNumber, curveNumber) {
    this.image = new Image();
    this.image.src = `../../images/draw_alphabets/${objectNumber}_${curveNumber}_2.png`;
    this.audioPath = `./audio/${objectNumber}.mp3`;
  }

  update(objectNumber, curveNumber, subCurveFlowNum) {
    this.image.src = `../../images/draw_alphabets/${objectNumber}_${curveNumber}_2.png`;
  }
}
