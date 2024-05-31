// This class creates the water based on perlin noise wave
// parameters:
// waveHeight1 and waveHeight2 are the y limits of the wave
class Water {
    constructor(waveHeight1, waveHeight2) {
        // Set the y offset to 0;
        this.yoff = 0;
        // set the waveHeight
        if(!waveHeight1){
            this.waveHeight1 = 60;
        } else {
            this.waveHeight1 = waveHeight1;
        }
        if(!waveHeight2){
            this.waveHeight2 = 100
        }else{
            this.waveHeight2 = waveHeight2;
        }
    }

    //display the wave according the perlin noise wave
    displayPerlinNoise() {
        //set the colour
        fill(50, 0, 50, 122);
        // Start drawing the shape
        beginShape();
        noStroke();
        let xoff = 0;
        // Iterate over horizontal pixels by 10
        for (let x = -width / 2; x < width / 2; x += 10) {
            // Calculate a y value according to noise
            let y = map(noise(xoff, this.yoff), 0, 1, this.waveHeight1, this.waveHeight2);
            // Set the vertex
            vertex(x, y);
            // Increment x dimension for noise
            xoff += 0.05;
        }
        // increment y dimension for noise
        this.yoff += 0.01;
        // close off the shape
        vertex(width / 2, this.waveHeight1 + (this.waveHeight2-this.waveHeight1)*.25);
        vertex(width / 2, height);
        vertex(-width / 2, height);
        endShape(CLOSE);
    }
    //display the wave according to an array. This should recieve an FTT array to map the music to.
    displayMusic(array) {
        // setup a counter for iterating over the array
        let counter = 0;
        // set the colour
        fill(50, 0, 50, 122);
        // start drawing the shape
        beginShape();
        noStroke();
        let xoff = 0;
        // calculate the steps needed
        let steps = width / array.length;
        // Iterate over horizontal pixels
        for (let x = -width / 2; x < width / 2; x += steps) {
            // get the y value according to the array
            let y = map(array[counter] / 255, 0, 1, this.waveHeight1, this.waveHeight2);
            counter += 1;
            // Set the vertex
            vertex(x, y);
            // Increment x dimension for noise
            xoff += 0.05;
        }
        // increment y dimension for noise
        this.yoff += 0.01;
        //close off the shape
        vertex(width / 2, this.waveHeight1);
        vertex(width / 2, height);
        vertex(-width / 2, height);
        endShape(CLOSE);
    }
}