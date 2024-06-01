
// Array to hold all the soundfiles
let soundfiles = [];
let fft;
// The number of bins that the FTT object will be using
let numBins = 128;
// Smoothing value for the FTT
let smoothing = 0.8;

// Set up the two gradient waves that will be used
let gradientSky;
let gradientSea;

// Set up the waves array 
let waves = [];

// Preload all the songs
function preload() {
  soundfiles.push(loadSound('assets/PMM-Bach-Cello-Suite-No.-1-G-Major-MASTER_V1.wav'));
  soundfiles.push(loadSound('assets/PMM-Ride-of-The-Valkyries-MASTER-V1.wav'));
  soundfiles.push(loadSound('assets/PMM-Russian-Dance-Tchaikovsky-MASTER-V1.wav'));
  soundfiles.push(loadSound('assets/PMM-Romeo-and-Julliet-MASTER-V1.wav'));
}

// This method redraws the waves and gradient wave whenever the user resizes the window.  
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gradientWavesSetup();
}

// This method sets up the variables for the gradient and waves
function gradientWavesSetup() {
  let skyXPos = -windowWidth / 2;
  let skyYPos = -windowHeight / 2;
  let skyWidth = windowWidth;
  let skyHeight = windowHeight / 2 + 120
  let amplitude = 50;
  let yPercent1 = 0.2;
  let yPercent2 = 0.5;
  let color0 = color(30, 70, 140, 100); // Navy
  let color1 = color(100, 150, 105); // Green
  let color2 = color(230, 180, 50, 100); // Yellow
  let color3 = color(160, 80, 50, 100); // Red
  waves = [];
  for (let i = 0; i < 99; i++) {
    waves.push(new WaveBrush(0, 148, width / 2, 200));
  }
  gradientSky = new GradientWave(skyXPos, skyYPos, skyWidth + 200, skyHeight, amplitude, yPercent1, yPercent2, color0, color1, color2, color3);
  gradientSea = new GradientWave(skyXPos, 150, skyWidth + 200, skyHeight, amplitude, yPercent1, yPercent2, color3, color2, color1, color0);
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // create a new Amplitude analyzer, this will analyze the volume of the song
  analyzer = new p5.Amplitude();

  // Create a new instance of p5.FFT() object
  fft = new p5.FFT(smoothing, numBins);

  // Connect all the soundfiles to the ftt
  for (let i = 0; i < soundfiles.length; i++) {
    soundfiles[i].connect(fft);
  }

  angleMode(DEGREES);

  // Create all objects: Water, BackgroundShadow, Building, Gradient Wave, Wave Brushes, Seagulls
  water = new Water();
  seagull1 = new Seagull(-width/2, -300, width,100, 1, color(0));          // Original seagull
  seagull2 = new Seagull(-width/2, -100, width, 100, 0.7, color(100),55); // Smaller, lighter-colored seagull
  backgroundShadow = new BackgroundShadow(400, -120, 122);
  building = new Building(0, 120, 0, 0, 0);
  gradientWavesSetup();
}

// Function for Key Press
function keyPressed() {
  // Check if any of the soundfiles is playing
  for (let song of soundfiles) {
    if (song.isPlaying()) {
      song.stop();
    }
  }
  // Check if keyCode is enter. If it is don't play any song 
  if (keyCode !== ENTER) {
    // Check the KeyCode if it is an arrow key has been pressed and set the songValue
    if (keyCode === LEFT_ARROW) {
      this.songValue = 0;
    } else if (keyCode === RIGHT_ARROW) {
      this.songValue = 1;
    }
    else if (keyCode === UP_ARROW) {
      this.songValue = 2;
    }
    else if (keyCode === DOWN_ARROW) {
      this.songValue = 3;
    } else {
      // If the key press is not an arrow key then return nothing
      return;
    }
    // Set the analyzer to the new song nad connect it to fft.
    analyzer.setInput(soundfiles[this.songValue]);
    soundfiles[this.songValue].loop();
  }
}

// The draw and update function
function draw() {
  // Get the current spectrum and energy for the current audio
  let spectrum = fft.analyze();
  let treble = fft.getEnergy("treble");
  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");

  // change the frameRate and make sure the framerate is above 24 and below 60
  frameRate(24 + round(treble) / 255 * 36);

  // display the sky and sea
  gradientSky.display();
  gradientSea.display();

  // Display the background
  backgroundShadow.display();

  // Depending on the song update the colour of the building centrepiece
  if (this.songValue == 0) {
    building.updateColours(0, mid);

  } else if
    (this.songValue == 1) {
    building.updateColours(mid);

  } else if
    (this.songValue == 2) {
    building.updateColours(0, 0, mid);
  }
  else if
    (this.songValue == 3) {
    building.updateColours(mid, mid, mid);
  }

  // Display the building
  building.display();

  // Display the reflection
  building.reflection(20, 20, 20, 120);
  water.displayMusic(spectrum);
  
  // Display the seagulls
  seagull1.move(spectrum);
  seagull2.move(spectrum);
  seagull1.display();
  seagull2.display();
  // Display the wave brush strokes
  for (let wave of waves) {
    // Check if the waves reach the edges 
    wave.edges();
    // Depending on the song change the flocking behaviour
    if (this.songValue == 0) {
      wave.flock(waves, 0, 0, 1);
    } else if
    (this.songValue == 1) {
      wave.flock(waves, 1, 0, 1);
    } else if
    (this.songValue == 2) {
      wave.flock(waves, 0, 1, 1);
    } else if
      (this.songValue == 3) {
      wave.flock(waves, .5, .5, .5);
    } else {
      wave.flock(waves, 1, 0, 1);
    }
    // Update the size and velocity of the wave
    wave.update(treble / 255 * 10, 2 + bass / 255 * 2, 55, 0, 255);
    // Display the wave
    wave.display(spectrum);
  }
}