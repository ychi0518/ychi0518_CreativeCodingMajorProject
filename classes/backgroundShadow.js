// This class creates the background foggy building
// parameters:
// xPos = x position
// yPos = y position
// opacity of the building

class BackgroundShadow {
  constructor(xPos, yPos, opacity) {
    // the X and Y position and the opacity of the image
    this.xPos = xPos;
    this.yPos = yPos;
    this.opacity = opacity;
  }

  display() {
    push();
    // Move the lighthouse to position
    translate(this.xPos, this.yPos);
    scale(3);
    // Draw the shadow with a blur effect
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = 5;
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = 'rgba(93, 80, 96, 0.7)'; // Shadow color with transparency

    // Disable the stroke for the shape
    noStroke();

    // Draw the original lighthouse shape
    this.drawLighthouse();
    pop();
  }


  //Draw the Lighthouse
  drawLighthouse() {

    // Shape color with the opactiy of the object
    fill(112, 103, 114,this.opacity); 
    beginShape();
    vertex(53, 0);
    vertex(55, 2);
    vertex(59, 16);
    vertex(61, 16);
    vertex(63, 24);
    vertex(68, 24);
    vertex(71, 34);
    vertex(71, 47);
    vertex(76, 51);
    vertex(76, 55);
    vertex(81, 58);
    vertex(81, 72);
    vertex(0, 72);
    vertex(0, 60);
    vertex(4, 52);
    vertex(9, 52);
    vertex(9, 43);
    vertex(14, 36);
    vertex(26, 36);
    vertex(30, 41);
    vertex(31, 51);
    vertex(36, 51);
    vertex(38, 46);
    vertex(38, 38);
    vertex(38, 34);
    vertex(45, 24);
    vertex(50, 24);
    vertex(50, 17);
    vertex(53, 17);
    vertex(53, 0);
    endShape(CLOSE);
  }
}