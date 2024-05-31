// wavebrush creates a class of waves
// Based on the coding train - flocking
// with a lifespan that will remove and add the wave back in
// parameters:
// xPos = x position of valid area
// yPos = y position of valid area
// width = width of valid area
// height = height of valid area

class WaveBrush {
    constructor(xPos, yPos, width, height, red, green, blue) {
      //set the X and Y position of the area
      this.xPos = xPos;
      this.yPos = yPos;

      //set the width and height of valid area
      this.width = width;
      this.height = height;

      //set the colour
      this.red = red;
      this.green = green;
      this.blue = blue;

      //set the lifespan of the wave
      this.lifespan = random(144);

      //set the steering limit
      this.limit = createVector(width, height);

      //set the position of the wave
      this.position = createVector(this.xPos - this.width + random(this.width * 2), this.yPos - this.height + random(this.height * 2));
      
      //set the starting magnitude
      this.velocity = createVector(-5, 1);
      this.velocity.setMag(random(2, 4));
      //setup acceleration
      this.acceleration = createVector();
      this.maxForce = 0.2;
      this.maxSpeed = 3;
      //setup the size
      this.size = 1;
    }

    //this reposition any wave that goes out of bounds
    edges() {
      if (this.position.x > this.width + this.xPos) {
        this.position.x = -this.width + this.xPos;
      } else if (this.position.x < -this.width + this.xPos) {
        this.position.x = this.width+this.xPos;
      }
      if (this.position.y > this.height + this.yPos) {
        this.position.y = -this.height + this.yPos;
      } else if (this.position.y < -this.height + this.yPos) {
        this.position.y = this.height + this.yPos;
      }
    }
  
    //this aligns the waves from one to another.
    align(waves) {
      let perceptionRadius = 25;
      let steering = createVector();
      let total = 0;
      for (let other of waves) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other != this && distance < perceptionRadius) {
          steering.add(other.velocity);
          total++;
        }
      }
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  
    //this seperates the waves from one to another
    seperation(waves) {
      let perceptionRadius = 24;
      let steering = createVector();
      let total = 0;
      for (let other of waves) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other != this && distance < perceptionRadius) {
          let difference = p5.Vector.sub(this.position, other.position);
          difference.div(distance * distance);
          steering.add(difference);
          total++;
        }
      }
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }

    //this puts the waves together
    cohension(waves) {
      let perceptionRadius = 24;
      let steering = createVector();
      let total = 0;
      for (let other of waves) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other != this && distance < perceptionRadius) {
          steering.add(other.position);
          total++;
        }
      }
      if (total > 0) {
        steering.div(total);
        steering.sub(this.position);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }

    //this calculates the amount of force from all 3 forces applied to the acceleration
    flock(waves, alignmentValue, cohensionValue, seperationValue) {
      let alignment = this.align(waves);
      let cohension = this.cohension(waves);
      let seperation = this.seperation(waves);
  
      alignment.mult(alignmentValue);
      cohension.mult(cohensionValue);
      seperation.mult(seperationValue);
  
      this.acceleration.add(alignment);
      this.acceleration.add(cohension);
      this.acceleration.add(seperation);
    }

    //update the wave
    update(size, velocity, red, green, blue) {
      //update the size and colour
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.size = size*10+10;
      //change position according to the velocity
      this.position.add(this.velocity);
      //then adds the calculated acceleration from flock onto the velocity
      this.velocity.add(this.acceleration);
      //add user input velocity
      this.velocity.setMag(velocity);
      //limit the velocity by max speed
      this.velocity.limit(this.maxSpeed);
      this.acceleration.mult(0);
      //then decrease the lifespan of the wave. If it reaches 0 reset the wave to a different location.
      if (this.lifespan > 0) {
        this.lifespan -= 1;
      } else {
        this.lifespan = 144
        this.position = createVector(this.xPos - this.width + random(this.width * 2), this.yPos - this.height + random(this.height * 2));
        this.velocity = createVector(-5, 1);
      }
    }
    
    //this display the wave
    display() {
      push();
      //set up the position of the wave
      translate(this.xPos, this.yPos);
      //set up the colour of the wave
      fill(this.red,this.green,this.blue,this.lifespan*2);
      let points = []
      //animate the wave depending on the lifespan of the wave
      if (this.lifespan > 72) {
        points = [
          [this.position.x - this.size, this.position.y],
          [this.position.x, this.position.y + this.size/2],
          [this.position.x + this.size, this.position.y]
        ];
      }
      else if (this.lifespan > 48) {
        points = [
          [this.position.x - this.size, this.position.y],
          [this.position.x, this.position.y + this.size/4],
          [this.position.x + this.size, this.position.y]
        ];
      }
        else if (this.lifespan > 24) {
        points = [
          [this.position.x - this.size, this.position.y],
          [this.position.x, this.position.y - this.size/4],
          [this.position.x + this.size, this.position.y]
        ];
      }
      else if (this.lifespan > 0) {
        points = [
          [this.position.x - this.size, this.position.y],
          [this.position.x, this.position.y],
          [this.position.x + this.size, this.position.y]
        ];
      }
      //draw the shape
      beginShape();
      for(let point of points){
        vertex(point[0], point[1]);
      }
      endShape();
      pop();
    }
  }