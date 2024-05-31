//this class creates a seagull that hovers about
// parameters:
// x = x position
// y = y position
// width = width of where the seagull flies
// height = height of where the seagull flies
// size = size of the seagull
// color = colour of the seagull

class Seagull {
  constructor(x, y, width,height, size, color) {
    //set the X and Y value
    this.x = x;
    this.y = y;

    //set the pivot point as the same as X and Y
    this.pivotX = x;
    this.pivotY = y;

    //set the area the bird will be flying
    this.width = width;
    this.height = height;

    //set the size
    this.size = size;

    //set the colour
    this.color = color;

    //set the bird parameters
    this.wingAngle = 0;
    this.wingSpeed = 0.1;

    this.noiseOffsetX = random(1000); // Offset for Perlin noise in x direction
    this.noiseOffsetY = random(1000); // Offset for Perlin noise in y direction
  }
  //this method draw the bird on X and Y position
  display() {
    push();
    //postion the bird
    translate(this.x, this.y);

    //set the colour
    stroke(this.color);
    noFill();
    strokeWeight(2);

    //set the scale of the bird
    scale(this.size);
    
    // Draw left wing
    beginShape();
    vertex(-20, 0);
    vertex(-10, -10);
    vertex(0, 0);
    endShape();
    
    // Draw right wing
    beginShape();
    vertex(0, 0);
    vertex(10, -10);
    vertex(20, 0);
    endShape();
    
    pop();

    // Update wing angle for next frame
    this.wingAngle += this.wingSpeed;
  }

  move() {
    // Update position using Perlin noise arount the pivot point
    this.x = this.pivotX + noise(this.noiseOffsetX) * this.width;
    this.y = this.pivotY + noise(this.noiseOffsetY) * this.height;

    // Increment noise offsets for next frame (slower speed)
    this.noiseOffsetX += 0.005;
    this.noiseOffsetY += 0.005;
  }
}
