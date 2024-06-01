//Class Building to constructed the main churchlike building in the centrepiece.
// parameters:
// xPos = x position
// yPos = y position
// red = red colour value
// green = green colour value
// blue = blue colour value
class Building {
  //Initiatilse the X and Y Position. Set the colour of the red, green and blue value.
  constructor(xPos, yPos, red, green, blue) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.size = 0.7;
  }

  //Display the building
  display() {
    //save the setting
    push();

    //Scale the builidng
    scale(this.size);

    //Move the building to the X and Y position as constructed
    translate(this.xPos, this.yPos);

    //Set the colour of the building
    fill(this.red, this.green, this.blue);

    //Draw the base
    beginShape()
    vertex(-800, 0);
    vertex(0, 0);
    vertex(0, -50);
    vertex(-10, -60);
    vertex(-35, -80);
    vertex(-60, -90);
    vertex(-170, -90);
    vertex(-200, -115);
    vertex(-200, -140);
    vertex(-195, -140);
    vertex(-200, -145);
    vertex(-225, -160);
    vertex(-250, -170);
    vertex(-260, -210);
    vertex(-260, -170);
    vertex(-280, -165);
    vertex(-340, -195);
    vertex(-390, -195);
    vertex(-390, -235);
    //Draw the Dome
    vertex(-400, -255);
    vertex(-430, -275);
    vertex(-430, -295);
    vertex(-440, -315);
    vertex(-450, -295);
    vertex(-450, -275);
    vertex(-470, -265);
    vertex(-480, -245);
    //Draw the Tower
    vertex(-480, -500);
    vertex(-500, -560);
    vertex(-510, -650);
    vertex(-520, -645);
    vertex(-530, -650);
    vertex(-535, -590);
    vertex(-537, -590);
    vertex(-540, -500);
    vertex(-545, -520);
    vertex(-550, -500);
    vertex(-555, -520);
    vertex(-560, -500);
    vertex(-560, -200);
    //Draw the Ledt side
    vertex(-590, -180);
    vertex(-600, -170);
    vertex(-630, -190);
    vertex(-640, -215);
    vertex(-640, -180);
    vertex(-700, -180);
    vertex(-730, -150);
    vertex(-730, -100);
    vertex(-900, -100);
    vertex(-935, -80);
    vertex(-950, -50);
    vertex(-950, 0);
    endShape(CLOSE);
    pop();
  }


  //this method creates a reflection that is split into four segments
  reflection(red, green, blue, opacity) {
    push();
    translate(this.xPos, this.yPos - 24);
    scale(this.size, -this.size);
    stroke(red, green, blue, opacity);
    //Draw the base segment
    fill(red, green, blue, opacity);
    beginShape()
    vertex(-730, -100);
    vertex(-900, -100);
    vertex(-935, -80);
    vertex(-950, -50);
    vertex(-950, 0);
    vertex(-800, 0);
    vertex(0, 0);
    vertex(0, -50);
    vertex(-10, -60);
    vertex(-35, -80);
    vertex(-60, -90);
    vertex(-170, -90);
    endShape(CLOSE);
    //Draw the city segment
    beginShape();
    vertex(-200, -115);
    vertex(-200, -140);
    vertex(-195, -140);
    vertex(-200, -145);
    vertex(-225, -160);
    vertex(-250, -170);
    vertex(-260, -210);
    vertex(-260, -170);
    vertex(-280, -165);
    vertex(-340, -195);
    vertex(-390, -195);
    vertex(-590, -180);
    vertex(-600, -170);
    vertex(-630, -190);
    vertex(-640, -215);
    vertex(-640, -180);
    vertex(-700, -180);
    vertex(-730, -150);
    vertex(-730, -125);
    endShape(CLOSE);
    beginShape();
    //Draw the dome segment
    vertex(-390, -215);
    vertex(-400, -255);
    vertex(-430, -275);
    vertex(-430, -295);
    vertex(-440, -315);
    vertex(-450, -295);
    vertex(-450, -275);
    vertex(-470, -265);
    vertex(-560, -245);
    vertex(-560, -200);
    //Draw the tower segment
    endShape(CLOSE);
    beginShape();
    vertex(-480, -285);
    vertex(-480, -500);
    vertex(-500, -560);
    vertex(-510, -650);
    vertex(-520, -645);
    vertex(-530, -650);
    vertex(-535, -590);
    vertex(-537, -590);
    vertex(-540, -500);
    vertex(-545, -520);
    vertex(-550, -500);
    vertex(-555, -520);
    vertex(-560, -500);
    vertex(-560, -275);
    endShape(CLOSE)
    pop();
  }


  // this methods updates the colours of the building
  updateColours(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
  // this methods updates the size of the building
  resize(scale) {
    this.scale = scale;
  }


}