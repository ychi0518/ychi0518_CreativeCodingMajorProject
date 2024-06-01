let soundfiles = [];
//Let's make a variate to hold the FFT object
let fft;

//Let's make a variate for the number of bins in the FFT object
//This is how many frequency bands we will have
//The number of bins must be a power of 2 between 16 and 1024 -
//Try changing this value
let numBins = 128;
//We will also have a variable for the smoothing of the FFT
//This averages the values of the frequency bands over time so it doesn't jump around too much
//Smoothing can be a value between 0 and 1
//try changing this value
let smoothing = 0.8;
function preload(){
  soundfiles.push(loadSound('assets/PMM-Bach-Cello-Suite-No.-1-G-Major-MASTER_V1.wav'));
  soundfiles.push(loadSound('assets/PMM-Ride-of-The-Valkyries-MASTER-V1.wav'));
  soundfiles.push(loadSound('assets/PMM-Russian-Dance-Tchaikovsky-MASTER-V1.wav'));
  soundfiles.push(loadSound('assets/PMM-Romeo-and-Julliet-MASTER-V1.wav'));
}


function windowResized() {
  print("resized")
  resizeCanvas(windowWidth, windowHeight);
  let skyXPos = -windowWidth/2;
  let skyYPos = -windowHeight/2;
  let skyWidth = windowWidth;
  let skyHeight = windowHeight/2+120
  let amplitude = 50;
  let yPercent1 = 0.2;
  let yPercent2 = 0.5;
  let color0 = color(30, 70, 140, 100); // Navy
  let color1 = color(100, 150, 105); // Green
  let color2 = color(230, 180, 50, 100); // Yellow
  let color3 = color(160, 80, 50, 100); // Red
  waves = [];
  for (let i = 0; i < 99; i++) {
    waves.push(new WaveBrush(0, 148, width/2, 200));
  }
  gradientSky = new GradientWave(skyXPos, skyYPos, skyWidth+200, skyHeight, amplitude, yPercent1, yPercent2, color0, color1, color2, color3);
  gradientSea = new GradientWave(skyXPos, 150, skyWidth+200, skyHeight, amplitude, yPercent1, yPercent2, color3, color2, color1, color0); 
}
let gradientSky;
let gradientSea;
let waves = [];
function setup() {
  createCanvas(400, 400);

  // create a new Amplitude analyzer, this will analyze the volume of the song
  analyzer = new p5.Amplitude();

  // Create a new instance of p5.FFT() object
  fft = new p5.FFT(smoothing, numBins);

  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  let skyXPos = -windowWidth/2;
  let skyYPos = -windowHeight/2;
  let skyWidth = windowWidth;
  let skyHeight = windowHeight/2+120
  let amplitude = 50;
  let yPercent1 = 0.2;
  let yPercent2 = 0.5;
  let color0 = color(30, 70, 140, 100); // Navy
  let color1 = color(100, 150, 105); // Green
  let color2 = color(230, 180, 50, 100); // Yellow
  let color3 = color(160, 80, 50, 100); // Red
  water = new Water();
  gradientSky = new GradientWave(skyXPos, skyYPos, skyWidth+200, skyHeight, amplitude, yPercent1, yPercent2, color0, color1, color2, color3);
  gradientSea = new GradientWave(skyXPos, 150, skyWidth+200, skyHeight, amplitude, yPercent1, yPercent2, color3, color2, color1, color0);
  backgroundShadow = new BackgroundShadow(400, -120, 122);
  building = new Building(0, 120, 0, 0, 0);
  for (let i = 0; i < 99; i++) {
    waves.push(new WaveBrush(0, 148, width/2, 200));
  }
}
function keyPressed(){
  for(let song of soundfiles){
    console.log(song)
    if(song.isPlaying()){
      song.stop();
    }
  }
  if(keyCode !== ENTER){
    if (keyCode === LEFT_ARROW) {
      this.value = 0;
    } else if (keyCode === RIGHT_ARROW) {
      this.value = 1;
    }
    else if (keyCode === UP_ARROW) {
      this.value = 2;
    }
    else if (keyCode === DOWN_ARROW) {
      this.value = 3;
    }
    analyzer.setInput(soundfiles[value]);
    soundfiles[this.value].connect(fft);
    soundfiles[this.value].loop();
  }
}

function draw() {
  background("#FFFFFF")
  let spectrum = fft.analyze();
  let treble = fft.getEnergy("treble");
  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");
  frameRate(24+round(treble)/255*36);
  gradientSky.display();
  gradientSea.display();
  backgroundShadow.display();
  if(this.value==0){
    building.updateColours(0,mid);
    
  } else if 
  (this.value==1){
    building.updateColours(mid);
    
  } else if
    (this.value==2){
    building.updateColours(0,0,mid);
  }
  else if
    (this.value==3){
    building.updateColours(mid,mid,mid);
  }
  building.display();
  building.reflection(20,20,20,120);
  water.displayMusic(spectrum);
  for (let wave of waves) {
    wave.edges();
    wave.flock(waves, 1, 0, 1);
    wave.update(treble, 2+bass/255*2, 55,0,255);
    wave.display();
  }
}