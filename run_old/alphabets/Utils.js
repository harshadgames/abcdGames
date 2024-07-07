export function displayStatusText(context, gameOver,image) {
  if (gameOver) {
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText("Game Over,try again", 50, 50);
    context.drawImage(image, 0, 0, 800, 500);

    //console.log ("Game Over")
  }
}
