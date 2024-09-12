//---imports--//
import { board } from "./board.js";
import { alphabet } from "./alphabet.js";
import { subSequenceArray } from "./subSequenceArray.js";
import { curve } from "./curve.js";
import { highlightSubSequenceArray } from "./highlightSubSequenceArray.js";
import { object } from "./object.js";
import { guidingCurve } from "./guidingCurve.js";
import { guidingCurve1 } from "./guidingCurve.js";
import { guidingCurve2 } from "./guidingCurve.js";
import { Pencil } from "./pencil.js";
//import { firework } from "./firework.js";

//--Defining canvas-//
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// defining start position

const videoPlayer = document.getElementById("video");
let lastTime = 0;
let gameOver = false;
let showObject = false;
let objectNumber = 1;
let curves = [];
let x, y;
let isInsideCurrentSquare = false;
let isInsideNextSquare = false;
let currentEligibleSquarePosition = subSequenceArray[0][0][0].position;
let currentEligibleSquare = subSequenceArray[0][0][0];
let nextEligibleSquarePosition = subSequenceArray[0][0][1].position;
let nextEligibleSquare = subSequenceArray[0][0][1];
let increaseSquareIndex = true;
let pushNewCurve = true;
let currentSquareIndex = 0;
let isDrawingCurve = false;
let curveStartSquare, curveEndSquare, curveStartPoint, curveEndPoint;
let currentSequenceIndex = 0;
let currentSubSequenceIndex = 0;
let currentHighlightSquareIndex = 0;
let curveStartPointTouched = false;
let curveEndPointTouched = false;
let changeSequence = false;

let isOutside = true;
let curveLengthAdjusted = false;
let objectShown = false;
let goToNextBtn = false;
let objects = [];
const fireworks = []; // Array to hold active fireworks
let GuidingCurve1 = new guidingCurve1(1, 1);
let GuidingCurve2 = new guidingCurve2(1, 1);
let GuidingCurve = new guidingCurve(GuidingCurve1.image);
let guidingCurveShowTime = false;
let subSequenceChanged = false;
let lastLeg = false;
let sequenceCompleted = false;
let metalAudioPath = `../audio/metal.mp3`;
let metalAudio = new Audio(metalAudioPath);
let goToPrevious = true;

//--sizes---//
let POINT_RADIUS = 20;
const numSquaresX = 7; // Number of squares horizontally
const numSquaresY = 7; // Number of squares vertically
let SQUARE_SIZE = 500 / 7;
const squareWidth = canvas.width / numSquaresX;
const squareHeight = canvas.height / numSquaresY;
let drawPencil = true;
let animationPlayTime = true;

//-- handling requirements for  screen width-----//
var viewportWidth = window.innerWidth;
let screenWidthRatio = 1;
let canvasWidth = canvas.width;
if (viewportWidth < canvasWidth) {
  //screenWidthRatio = 1;

  screenWidthRatio = viewportWidth / canvasWidth;
}
const sequenceArray = subSequenceArray.map((set) => set.flat());

//-------------------------- Classes--------------------------//

//--------creating objects----------------//
let Board = new board();
let Alphabet = new alphabet(currentSequenceIndex + 1);

defineCurveStartAndEnd();
let pencil = new Pencil(curveStartPoint.x, curveStartPoint.y);

// Listen to mouse and touch events and decide if curve needs to be drawn
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("touchmove", handleMouseMove);
canvas.addEventListener("touchend", handleTouchEnd);

/*

const video = document.getElementById("video");
canvas.addEventListener("click", () => {
  // Play the video
  video.play();

  // Draw each video frame onto the canvas
  video.addEventListener("play", function () {
    const draw = () => {
      if (video.paused || video.ended) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(draw);
    };
    draw();
  });
});

*/

canvas.addEventListener("click", function (event) {
  let clickX =
    (event.clientX - canvas.getBoundingClientRect().left) / screenWidthRatio;
  let clickY =
    (event.clientY - canvas.getBoundingClientRect().top) / screenWidthRatio;

  let previousBtnClick = (clickX < 100) & (clickY > 400);
  let nextBtnClick = (clickX > 400) & (clickY > 400);
  console.log(clickX, clickY);

  if (goToNextBtn & nextBtnClick) {
    showObject = true;
    //console.log("show object after clicking");
    goToNextSequence();
    //defineNewAlphabet();
    goToNextBtn = false;
    //console.log("event listener");
  } else {
    //console.log("reset");

    if ((currentSequenceIndex > 0) & previousBtnClick) {
      console.log("prev");
      goToPreviousSequence();
      currentSequenceIndex--;

      currentEligibleSquarePosition =
        subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
          currentSquareIndex
        ].position;
      nextEligibleSquarePosition =
        subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
          currentSquareIndex + 1
        ].position;

      defineCurveStartAndEnd();
      curves = [];
    }
  }
});

//-----------------------clasess-------------------//

function animate(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  //console.log(deltaTime);
  lastTime = timeStamp;

  requestAnimationFrame(animate);

  if (!gameOver) {
    //----- Check if animation not to be played, i.e. drawing needs to be drawn----//
    if (!showObject) {
      //console.log(isInsideCurrentSquare, isInsideNextSquare);
      Board.draw(ctx);
      Alphabet.draw(ctx);
      GuidingCurve.update(ctx, 3, GuidingCurve1.image, GuidingCurve2.image);
      //drawSquareReference();
      //drawNumberedSquares();
      //console.log(curves);

      if (deltaTime > 0) {
        GuidingCurve.draw(ctx);
      }

      //console.log(curves);
      if (goToNextBtn) {
        //console.log("draw next btn");
        ctx.drawImage(nextImage, 400, 400, 100, 100);
      } else {
        ctx.drawImage(previousImage, 0, 400, 100, 100);
      }

      drawCurveTillLastPoint();

      if (drawPencil) {
        //console.log("draw start point");
        pencil.update(curveStartPoint.x, curveStartPoint.y);
        pencil.draw(ctx, "yellow");
        drawGlowingCircle(curveStartPoint.x, curveStartPoint.y);
      } else {
        //console.log(sequenceCompleted);
        if (!sequenceCompleted) {
          drawGlowingCircle(curveEndPoint.x, curveEndPoint.y);
        } else {
          //console.log("end square");
        }
      }
    } else {
      //ctx.clearRect(0, 0, canvas.width, canvas.height);
      playAnimation(deltaTime);

      //goToNextSequence();
    }
  }

  //---- playe animation---------------//
}

animate();

//--------------- Support Fuctions---------------//

//-----------handle Mouse move------------//

function handleMouseMove(e) {
  //console.log("mouse move", currentSubSequenceIndex);
  e.preventDefault();
  //------------get coordinates and push it in curves---------------//
  getCoordinates(e);
  //----------- check if coordinates are inside current square or next square or outside------//
  getCoordinatePlacement();
  //--------------- Check if start  point touched-------------------//
  ifCurveStartPointTouched();
  //--------------- Check if start  point touched-------------------//
  ifCurveEndPointTouched();

  //------------ check if drawing needs to be enabled or disabled ----//

  if (currentSequenceIndex < sequenceArray.length) {
    //console.log("Alphabet", currentSequenceIndex);
    if (
      currentSubSequenceIndex < subSequenceArray[currentSequenceIndex].length
    ) {
      //console.log("Curve", currentSubSequenceIndex);
      if (
        currentSquareIndex <
        subSequenceArray[currentSequenceIndex][currentSubSequenceIndex].length -
          1
      ) {
        //console.log("logic to enable disable ");
        logicEnableDisableDrawing(x, y);
      } else {
        //console.log(currentSubSequenceIndex);
        defineNewSubSequence();
      }
    } else {
      //console.log(curveEndPointTouched);
      if (curveEndPointTouched) {
        sequenceCompleted = true;
        goToNextBtn = true;
        //alert("handle mouse move -outside");
      }
      lastLeg = true;

      if (isOutside) {
        //console.log("outside");
        isDrawingCurve = false;
      }
      //defineNewAlphabet();
    }
  }

  //----------- Push coordinates if drawing should be drawn----------------------//

  if (isDrawingCurve) {
    //console.log("push coordinates");
    if (curves.length > 0) {
      curves[curves.length - 1].coordinates.push({
        x: x,
        y: y,
      });
      //console.log(curves);
    }
  }

  //------ End of handle Mouse Move------------//
}

//----------- Logic to enable/disable drawing--------------------//

function logicEnableDisableDrawing(currentX, CurrentY) {
  //console.log(isInsideCurrentSquare, isInsideNextSquare, isDrawingCurve);
  //----- Check if inside the current square and if so push empty array for new curve-----//

  //console.log(isInsideNextSquare);
  /*

  console.log(
    isDrawingCurve,
    isInsideNextSquare,
    x >= ((nextEligibleSquarePosition % numSquaresX) - 1) * squareWidth,
    x <=
      ((nextEligibleSquarePosition % numSquaresX) - 1) * squareWidth +
        nextEligibleSquare.width,
    y >= Math.floor(nextEligibleSquarePosition / numSquaresY) * squareHeight,
    y <=
      Math.floor(nextEligibleSquarePosition / numSquaresY) * squareHeight +
        nextEligibleSquare.height
  );

  */

  //console.log(isInsideCurrentSquare, !showObject);

  if (isInsideCurrentSquare & !showObject) {
    actionWhenInsideCurrentSquare();
  }
  //----- if not in current square check if its in next square, if yes make this next square as new current square---//
  else if (isInsideNextSquare & isDrawingCurve) {
    //console.log("next", currentSquareIndex);
    actionWhenInsideNextSquare();
    //console.log(currentSquareIndex);
  } else if (isOutside) {
    //console.log("outside");

    actionWhenOutside();
  }
}

//-------------------- track in which square are we in and take call if we need to draw---//

//------------draw curve----------------//
function drawCurveTillLastPoint() {
  //console.log(curves);
  for (let i = 0; i < curves.length; i++) {
    const curveObject = curves[i];
    for (let j = 0; j < curveObject.coordinates.length; j++) {
      const point = curveObject.coordinates[j];
      drawPoint(point.x, point.y, POINT_RADIUS, "red");
    }
  }
}

//----- drawing points with coordinate as input-----------//

export function drawPoint(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  //Point.draw(x, y);
}

//---------------------Define Curve Start and End point-----------------//
function defineCurveStartAndEnd() {
  curveStartSquare =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][0].position;
  curveEndSquare =
    highlightSubSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentHighlightSquareIndex + 1
    ];

  curveStartPoint = {
    x:
      ((curveStartSquare - 1) % numSquaresX) * SQUARE_SIZE +
      subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][0].width /
        2,
    y:
      Math.floor(curveStartSquare / numSquaresX) * SQUARE_SIZE +
      subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][0]
        .height /
        2 -
      subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][0]
        .yAdjust,
    radius: 10,
    glowing: true,
  };

  curveEndPoint = {
    x: (curveEndSquare % numSquaresY) * SQUARE_SIZE - SQUARE_SIZE * 0.5,
    y:
      Math.floor(curveEndSquare / numSquaresY) * SQUARE_SIZE +
      SQUARE_SIZE * 0.5,
    radius: 10,
    glowing: true,
  };
}

//-------------------- function to go to next square---------------------//

function goToNextSquare() {
  if (increaseSquareIndex) {
    currentSquareIndex++;
  }

  sequenceCompleted = false;

  increaseSquareIndex = false;

  currentEligibleSquare =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex
    ];

  //------ Increase the next square index only when current eligible square is not last square of sequence----//

  if (
    currentEligibleSquare !=
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      subSequenceArray[currentSequenceIndex][currentSubSequenceIndex].length - 1
    ]
  ) {
    nextEligibleSquare =
      subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
        currentSquareIndex + 1
      ];
  }

  currentEligibleSquarePosition = currentEligibleSquare.position;
  nextEligibleSquarePosition = nextEligibleSquare.position;

  //isInsideNextSquare();

  isOutside = !isInsideCurrentSquare && !isInsideNextSquare;
}

//------------------ function to go to next sub Seqhence----------------//

function goToNextSubSequence() {
  //console.log("go to next subsequence");
  currentSubSequenceIndex++;
  subSequenceChanged = true;

  currentSquareIndex = 0;
  currentHighlightSquareIndex = 0;
  currentEligibleSquare =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex
    ];
  nextEligibleSquare =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex + 1
    ];
  currentEligibleSquarePosition =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex
    ].position;
  nextEligibleSquarePosition =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex + 1
    ].position;

  //console.log("go to next subsequence");
}

function goToNextSequence() {
  currentSequenceIndex++;
  currentSubSequenceIndex = 0;
  currentSquareIndex = 0;
  currentHighlightSquareIndex = 0;
  pushNewCurve = true;
  //alert(pushNewCurve);
  //console.log(currentSequenceIndex);

  currentEligibleSquare =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex
    ];
  nextEligibleSquare =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex + 1
    ];

  currentEligibleSquarePosition =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex
    ].position;
  nextEligibleSquarePosition =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex + 1
    ].position;

  defineCurveStartAndEnd();

  Alphabet.update(currentSequenceIndex + 1);
  drawPencil = true;
  GuidingCurve1.update(currentSequenceIndex + 1, currentSubSequenceIndex + 1);
  GuidingCurve2.update(currentSequenceIndex + 1, currentSubSequenceIndex + 1);
  GuidingCurve.update(ctx, 3, GuidingCurve1.image, GuidingCurve2.image);

  //ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function adjustCurveLength() {
  //console.log("adjust curve length", curveLengthAdjusted);
  if (!curveLengthAdjusted) {
    curves.pop();
    curveLengthAdjusted = true;
    currentSquareIndex = 0;
  }

  currentEligibleSquare =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex
    ];
  nextEligibleSquare =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex + 1
    ];

  currentEligibleSquarePosition =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex
    ].position;
  nextEligibleSquarePosition =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      currentSquareIndex + 1
    ].position;
  //console.log("curve length adjusted");
}

function adjustCurveStartAndEnd() {
  currentHighlightSquareIndex = 0;
  let subCurveLength =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex].length - 1;

  curveStartSquare =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][0].position;
  curveEndSquare =
    subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
      subCurveLength
    ].position;

  curveStartPoint = {
    x:
      ((curveStartSquare - 1) % numSquaresX) * SQUARE_SIZE +
      subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][0].width /
        2,
    y:
      Math.floor(curveStartSquare / numSquaresY) * SQUARE_SIZE +
      subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][0]
        .height /
        2 -
      subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][0]
        .yAdjust,
    radius: 10,
    glowing: true,
  };

  curveEndPoint = {
    x:
      ((curveEndSquare % numSquaresX) - 1) * SQUARE_SIZE +
      subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
        subCurveLength
      ].width /
        2,
    y:
      Math.floor(curveEndSquare / numSquaresY) * SQUARE_SIZE +
      subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
        subCurveLength
      ].height /
        2 -
      subSequenceArray[currentSequenceIndex][currentSubSequenceIndex][
        subCurveLength
      ].yAdjust,
    radius: 10,
    glowing: true,
  };
}

function getCoordinates(e) {
  if (e.touches) {
    //console.log(e);
    // Handle touch events
    x =
      (e.touches[0].clientX - canvas.getBoundingClientRect().left) /
      screenWidthRatio;
    y =
      (e.touches[0].clientY - canvas.getBoundingClientRect().top) /
      screenWidthRatio;
  } else {
    // Handle mouse events
    x = (e.clientX - canvas.getBoundingClientRect().left) / screenWidthRatio;
    y = (e.clientY - canvas.getBoundingClientRect().top) / screenWidthRatio;
  }
}

function getCoordinatePlacement() {
  //-----------------Check if mouse is inside current square---------//

  checkInsideCurrentSquare();

  //-----------Check if inside the next Square-------//

  checkInsideNextSuare();

  //-----------Check if outside-----///
  isOutside = !isInsideCurrentSquare && !isInsideNextSquare;
}

function ifCurveStartPointTouched() {
  curveStartPointTouched =
    Math.sqrt(
      (curveStartPoint.x * 1 - x) * (curveStartPoint.x * 1 - x) +
        (curveStartPoint.y * 1 - y) * (curveStartPoint.y * 1 - y)
    ) < 30;
}

function ifCurveEndPointTouched() {
  curveEndPointTouched =
    Math.sqrt(
      (curveEndPoint.x * 1 - x) * (curveEndPoint.x * 1 - x) +
        (curveEndPoint.y * 1 - y) * (curveEndPoint.y * 1 - y)
    ) < 90;

  //console.log(curveEndPointTouched);
}

function defineNewAlphabet() {
  showObject = true;
  changeSequence = true;

  //goToNextSequence();
  /*
  defineCurveStartAndEnd();
  Alphabet.update(objectNumber);
  objectNumber++;
  drawPencil = true;
  GuidingCurve1.update(currentSequenceIndex + 1, currentSubSequenceIndex + 1);
  GuidingCurve2.update(currentSequenceIndex + 1, currentSubSequenceIndex + 1);
  GuidingCurve.update(ctx, 3, GuidingCurve1.image, GuidingCurve2.image);
  */
}

function defineNewSubSequence() {
  //console.log("define new subSequence");
  goToNextSubSequence();
  drawPencil = true;
  curves.push(new curve(currentSquareIndex));
  curveLengthAdjusted = false;
  defineCurveStartAndEnd();
  //currentSquareIndex = 0;

  /*

        SubCurve.update(
          currentSequenceIndex + 1,
          currentSubSequenceIndex + 1,
          1
        );

        */

  GuidingCurve1.update(currentSequenceIndex + 1, currentSubSequenceIndex + 1);

  GuidingCurve2.update(currentSequenceIndex + 1, currentSubSequenceIndex + 1);

  GuidingCurve.update(ctx, 3, GuidingCurve1.image, GuidingCurve2.image);
}

function actionWhenStartPointTouched() {
  isDrawingCurve = true;
  drawPencil = false;
}

function actionWhenEndPointTouched() {
  console.log("curve end touched");
  currentHighlightSquareIndex++;
  //subCurveNumber++;
  defineCurveStartAndEnd();
  //goToNextSquare();
}

function actionWhenOutside() {
  //console.log("actionwhenout");
  isDrawingCurve = false;
  pushNewCurve = true;

  //----- if outside, remove last unwanted part of the curve-----//

  if ((curves.length > 0) & !subSequenceChanged) {
    //console.log(currentSquareIndex, nextSquareIndex);
    //console.log("adjust curve", curves.length > 0, curves);
    adjustCurveLength();
    //console.log(curves);
    adjustCurveStartAndEnd();
    //console.log(curves);

    drawPencil = true;
  }
}

function actionWhenInsideCurrentSquare() {
  //console.log("inside current", pushNewCurve);
  increaseSquareIndex = true;
  subSequenceChanged = false;
  curveLengthAdjusted = false;

  if (pushNewCurve) {
    //console.log(curves);
    curves.push(new curve(currentSquareIndex));
    //console.log(curves);
    pushNewCurve = false;
  }

  //----- Check if start point is touched, if so take actions needed to take after start point was touched----//

  if (curveStartPointTouched) {
    actionWhenStartPointTouched();
  }

  //------------ if current square is end square take necessary actions----------//
  if (
    curveEndPointTouched &
    (currentEligibleSquarePosition == curveEndSquare)
  ) {
    //goToNextBtn = true;
    //alert("action when inside");
    //actionWhenEndPointTouched();
  }
}

function actionWhenInsideNextSquare() {
  goToNextSquare();
}

function playAnimation(deltaTime) {
  //console.log("Play Animation");
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (animationPlayTime) {
    objects.forEach((object) => {
      object.update();
      objects = objects.filter((object) => !object.markForDeletion);
    });

    //console.log(objects);

    addObject();
    setTimeout(function () {
      showObject = false;
      goToNextBtn = false;
      //console.log(currentSequenceIndex);
      animationPlayTime = true;

      if (currentSequenceIndex > sequenceArray.length - 1) {
        currentSequenceIndex = 0;
        currentSubSequenceIndex = 0;
        currentSquareIndex = 0;
        currentHighlightSquareIndex = 0;
        pushNewCurve = true;
        isDrawingCurve = false;
        Alphabet.update(currentSequenceIndex + 1);
        GuidingCurve1.update(
          currentSequenceIndex + 1,
          currentSubSequenceIndex + 1
        );
        GuidingCurve2.update(
          currentSequenceIndex + 1,
          currentSubSequenceIndex + 1
        );
        GuidingCurve.update(ctx, 3, GuidingCurve1.image, GuidingCurve2.image);
        defineCurveStartAndEnd();
        drawPencil = true;
        currentEligibleSquarePosition = subSequenceArray[0][0][0].position;
        nextEligibleSquarePosition = subSequenceArray[0][0][1].position;
        console.log("reset");
      }

      //curves = [];
      //currentSquareIndex = 0;

      objects[0].markForDeletion = true;
    }, 3000);

    animationPlayTime = false;
  }

  Board.draw(ctx);
  drawCurveTillLastPoint();

  //if (goToNextBtn) {
  //adjustCurveLength();

  objects[0].draw(ctx);
  objects[0].update(deltaTime);
  //console.log("draw object");

  curves = [];

  /*

    fireworks.forEach((firework) => {
      firework.update();
      firework.draw();
    });

    launchFirework();

    */

  //}
}

function addObject() {
  if (objects.length == 0) {
    objects.push(new object(currentSequenceIndex + 1));
  }
}

function launchFirework() {
  fireworks.push(new Firework());
}

function drawGlowingCircle(x, y) {
  //console.log(glowingCircle.x, glowingCircle.y);
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 20);
  ctx.shadowColor = "rgba(255, 223, 186, 0.8)";
  ctx.shadowBlur = 10; // Set shadow blur based on circle radius
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.shadowBlur = 1; // Reset shadow blur
  //metalAudio.play();
}

function drawSquareReference() {
  let squareCount = 0;

  for (let y = 0; y < numSquaresY; y++) {
    for (let x = 0; x < numSquaresX; x++) {
      squareCount++;
      const squareX = x * squareWidth;
      const squareY = y * squareHeight;

      const isEligible = isSquareEligible(squareCount);

      // Draw the square
      ctx.beginPath();
      ctx.rect(squareX, squareY, squareWidth, squareHeight);

      // Set the square color based on eligibility
      if (isEligible) {
        ctx.fillStyle = "green"; // Eligible square color
      } else {
        ctx.fillStyle = "white"; // Non-eligible square color
      }

      ctx.fill();
      ctx.strokeStyle = "white"; // Square border color
      ctx.lineWidth = 2; // Square border width
      ctx.stroke();

      // Draw the square number in the center
      ctx.fillStyle = "green"; // Number color
      ctx.font = "16px Arial";
      ctx.fillText(
        squareCount,
        squareX + squareWidth / 2 - 8,
        squareY + squareHeight / 2 + 6
      );
    }
  }
}

function isSquareEligible(squareNumber) {
  return sequenceArray[currentSequenceIndex].includes(squareNumber);
}

function drawNumberedSquares() {
  for (let i = 0; i < subSequenceArray[currentSequenceIndex].length; i++) {
    for (let j = 0; j < subSequenceArray[currentSequenceIndex][i].length; j++) {
      const squareX =
        ((subSequenceArray[currentSequenceIndex][i][j].position % numSquaresX) -
          1) *
        squareWidth;
      const squareY =
        Math.floor(
          subSequenceArray[currentSequenceIndex][i][j].position / numSquaresY
        ) * squareHeight;

      // Draw the square
      ctx.beginPath();
      ctx.rect(
        squareX,
        squareY - subSequenceArray[currentSequenceIndex][i][j].yAdjust,
        subSequenceArray[currentSequenceIndex][i][j].width,
        subSequenceArray[currentSequenceIndex][i][j].height
      );
      ctx.fillStyle = "green"; // Eligible square color

      ctx.fill();
      ctx.strokeStyle = "white"; // Square border color
      ctx.lineWidth = 2; // Square border width
      ctx.stroke();

      ctx.fillStyle = "green"; // Number color
      ctx.font = "16px Arial";
      ctx.fillText(
        subSequenceArray[currentSequenceIndex][i][j].position,
        squareX + squareWidth / 2 - 8,
        squareY + squareHeight / 2 + 6
      );
    }
  }
}

function checkInsideCurrentSquare() {
  isInsideCurrentSquare =
    x >=
      ((currentEligibleSquarePosition % numSquaresX) - 1) * squareWidth * 1 &&
    x <=
      (((currentEligibleSquarePosition % numSquaresX) - 1) * squareWidth +
        currentEligibleSquare.width) *
        1 &&
    y >=
      Math.floor(currentEligibleSquarePosition / numSquaresY) *
        squareHeight *
        1 &&
    y <=
      (Math.floor(currentEligibleSquarePosition / numSquaresY) * squareHeight +
        currentEligibleSquare.height) *
        1;
}

function checkInsideNextSuare() {
  isInsideNextSquare =
    x >= ((nextEligibleSquarePosition % numSquaresX) - 1) * squareWidth * 1 &&
    x <=
      (((nextEligibleSquarePosition % numSquaresX) - 1) * squareWidth +
        nextEligibleSquare.width) *
        1 &&
    y >=
      Math.floor(nextEligibleSquarePosition / numSquaresY) * squareHeight * 1 &&
    y <=
      (Math.floor(nextEligibleSquarePosition / numSquaresY) * squareHeight +
        nextEligibleSquare.height) *
        1;
}

function handleTouchEnd(e) {
  //console.log(currentSquareIndex);
  if (currentSquareIndex != 0) {
    e.preventDefault();
    adjustCurveLength();
    pushNewCurve = true;

    /*

    if (currentSquareIndex != 0) {
      adjustCurveLength();
      drawPencil = true;
    }

    */

    drawPencil = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquareReference();
    //drawNumberedSquares();
    drawCurveTillLastPoint();
    Board.draw(ctx);
    isDrawingCurve = false;
    //drawGlowingCircle(curveStartPoint.x, curveStartPoint.y);
  }

  //console.log("test");
}

function goToPreviousSequence() {
  //console.log("go to previous sequence");

  console.log(currentSequenceIndex);
  currentSequenceIndex = currentSequenceIndex;
  currentSubSequenceIndex = 0;
  currentSquareIndex = 0;
  currentHighlightSquareIndex = 0;
  pushNewCurve = true;

  //alert(pushNewCurve);
  //console.log(currentSequenceIndex);

  Alphabet.update(currentSequenceIndex);
  drawPencil = true;
  GuidingCurve1.update(currentSequenceIndex, 1);
  GuidingCurve2.update(currentSequenceIndex, 1);
  GuidingCurve.update(ctx, 3, GuidingCurve1.image, GuidingCurve2.image);

  //ctx.clearRect(0, 0, canvas.width, canvas.height);
}


document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });
});