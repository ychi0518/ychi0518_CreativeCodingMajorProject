//This class creates a wave-like texture that has a gradient of 4 colour.
class GradientWave {
  constructor(xPos, yPos, w, h, amplitude, yPercent1, yPercent2, color0, color1, color2, color3) {
    // Set the X, Y position
    this.xPos = xPos; 
    this.yPos = yPos;
    // Width and height of the gradient background
    this.w = w; 
    this.h = h;
    // Four main colors, creating three gradient sections
    this.color0 = color0;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;
    // Set the percentages that divide the gradient sections and calculate their base lines
    this.yPercent1 = yPercent1;
    this.yPercent2 = yPercent2;
    this.yBase1 = this.yPercent1 * this.h;
    this.yBase2 = this.yPercent2 * this.h;
    // Parameters for the wave effect using Perlin noise
    this.amplitude = amplitude;
    this.frequency = 0.01;
    this.offset1 = random(100);
    this.offset2 = random(100);
    this.offset3 = random(100);
    this.offset4 = random(100);
    this.offset5 = random(100);
    this.offset6 = random(100);
  }

  //the display function draw the texture
  display() {
    push();
    translate(this.xPos, this.yPos);
    noFill();
    let nx1 = this.offset1;
    let nx2 = this.offset2;
    let nx3 = this.offset3;
    let nx4 = this.offset4;
    let nx5 = this.offset5;
    let nx6 = this.offset6;
    // Draw the background from left to right
    for (let x = 0; x <= this.w; x += 30) {
      let n1 = map(noise(nx1), 0, 1, -1, 1);
      let n2 = map(noise(nx2), 0, 1, -1, 1);
      let n3 = map(noise(nx3), 0, 1, -1, 1);
      let n4 = map(noise(nx4), 0, 1, -1, 1);
      let n5 = map(noise(nx5), 0, 1, -1, 1);
      let n6 = map(noise(nx6), 0, 1, -1, 1);
      // Add noise to the base lines to create a wave effect
      let waveHeight1 = this.yBase1 + this.amplitude * n1;
      let waveHeight2 = this.yBase2 + this.amplitude * n2;
      // Calculate the height of each section
      let gap1 = waveHeight1;
      let gap2 = waveHeight2 - waveHeight1;
      let gap3 = this.h - waveHeight2;
      // Draw the first gradient section
      for (let y = 0; y < gap1; y += 40) {
        let inter = map(y, 0, gap1, 0, 1);
        let interColor = lerpColor(this.color0, this.color1, inter);
        stroke(interColor);
        strokeWeight(100);
        // Use random deviation to create an irregular texture effect
        ellipse(x + 10 * n3, y + 10 * n4, random(5, 30), random(5, 30)); 
      }
      // Draw the second gradient section
      for (let y = 0; y < gap2; y += 40) {
        let inter = map(y, 0, gap2, 0, 1);
        let interColor = lerpColor(this.color1, this.color2, inter);
        stroke(interColor);
        strokeWeight(100);
        ellipse(x + 10 * n4, waveHeight1 + y + 10 * n5, random(5, 30), random(5, 30)); //random Deviation
      }
      // Draw the third gradient section
      for (let y = 0; y < gap3; y += 40) {
        let inter = map(y, 0, gap3, 0, 1);
        let interColor = lerpColor(this.color2, this.color3, inter);
        stroke(interColor);
        strokeWeight(100);
        ellipse(x + 10 * n5, waveHeight2 + y + 10 * n6, random(5, 30), random(5, 30)); //random Deviation
      }

      nx1 += this.frequency;
      nx2 += this.frequency;
      nx3 += this.frequency;
      nx4 += this.frequency;
      nx5 += this.frequency;
      nx6 += this.frequency;
    }
    this.offset1 += 0.05;
    this.offset2 += 0.05;
    this.offset3 += 0.05;
    this.offset4 += 0.05;
    this.offset5 += 0.05;
    this.offset6 += 0.05;
    pop();
  }
}


