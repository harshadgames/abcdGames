//const currentDPI = (window.devicePixelRatio);
const currentDPI = Math.cbrt(window.devicePixelRatio);
const desktopSpeedFactor = 1; // Adjust as needed
const mobileSpeedFactor = 2; // Adjust as needed

// Detect device type based on screen width
const isMobile = window.innerWidth < 768; // Example threshold for mobile devices

// Calculate speed based on device type
const speedFactor = isMobile ? mobileSpeedFactor : desktopSpeedFactor;

export class CollisionBlock {
  constructor({ position }, gameSpeed) {
    this.position = position;
    this.width = 16;
    this.height = 16;
    this.game = game;
    this.vx = gameSpeed;
  }

  draw(context) {
    //context.fillStyle = "rgba(255, 0, 0, 0.5)";
    //context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(context) {
    this.draw(context);
    //console.log(gameSpeed);
    this.position.x -= this.vx;
    if (this.position.x < -800) {
      this.position.x = this.position.x + 1600;
    }
  }
}
