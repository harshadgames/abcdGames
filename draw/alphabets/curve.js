export class curve {
  constructor(curveNumber) {
    this.curveNumber = curveNumber;
    this.coordinates = [];
  }

  draw(x, y) {
    drawPoint(x, y, POINT_RADIUS, "red");
  }

  update(coordinates) {
    this.coordinates.push(coordinates);
  }
}
