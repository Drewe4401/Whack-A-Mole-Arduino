let score = 0;
let x = 1;
let startTime, timerIsDone, sensors, synth, sequence1, synth3;
let serialPDM;          // variable to hold an instance of the serialport library
let portName = 'COM3';  // fill in your serial port name here
let gameState = "idle";
var wins = 0;
var moleX;
var moleY;
let sequence = ["C4","D4","E4","F4","G4","A4","B4","C5"];

function setup() {

  serialPDM = new PDMSerial(portName);
  sensors = serialPDM.sensorData;
 
  createCanvas(500, 150);
  startTime = 32;
  timerIsDone = false;
  frameRate = (2);
  moleX = 0;

  var melody = ["C4","D4","E4","F4","G4","A4","B4","C5"];
  delayTime = 250/1000;

  var synth = new Tone.Synth().toDestination();
  var pattern = new Tone.Pattern(function(time, note){
  //the order of the notes passed in depends on the pattern
  synth.triggerAttackRelease(note, "4n", time);
  }, melody, "alternateDown").start(0);    

  // same as above except for .start(delayTime) instead of .start(0)
  var synth2 = new Tone.Synth().toDestination();
  var pattern2 = new Tone.Pattern(function(time, note){
  //the order of the notes passed in depends on the pattern
  synth2.triggerAttackRelease(note, "4n", time);
  }, melody, "alternateDown").start(delayTime);  
  
  const filter = new Tone.AutoFilter(4).start();

  synth.chain(filter, Tone.Destination);
  
  var tempo = 120;
  Tone.Transport.bpm.value = tempo   
  Tone.Transport.start("+0.1");



  synth = new Tone.Synth().toDestination();
  synth.volume.value = -15;
    sequence1 = new Tone.Sequence(function(time, note) { 
      synth.triggerAttackRelease(note, "4n", time);
    }, sequence, '4n');
    synth.resonance = 0.92;

synth3 = new Tone.AMSynth();
const comp = new Tone.Compressor(-30, 3);
const distortion = new Tone.Distortion(0.5);
const vol = new Tone.Volume(-12);
synth3.chain(comp,distortion,vol,  Tone.Destination);

}

function draw() {


  background("#00FFFF");

  if(gameState == "idle"){
    textSize(25);
    fill("black");
    text("press any button to begin", 100, 75);
    if(serialPDM.sensorData.sw0 === 1 || serialPDM.sensorData.sw1 === 1 ||serialPDM.sensorData.sw2 === 1 ||serialPDM.sensorData.sw3 === 1 ||serialPDM.sensorData.sw4 === 1 ){
      gameState = "start";
      Tone.Transport.stop();
    }
  }
  else if(gameState == "start"){
   

   

    Tone.start();
    Tone.Transport.start("+0.1");
  
    fill("black");
    ellipse(50, 70, 80, 80);
    ellipse(150, 70, 80, 80);
    ellipse(250, 70, 80, 80);
    ellipse(350, 70, 80, 80);
    ellipse(450, 70, 80, 80);
   timer();
  
  
    fill("#FF0000");
    rect(100, 360, 100, 90);
    fill("black");
    textSize(18);

    text("Score:" + score + "     Time Left: " + (startTime - time), 30, 20);
  

 
    var possibleX = [0,1,2,3,4];
    

  
    fill("violet");
    ellipse((moleX * 100) + 50, 70, 40, 40);

    if(serialPDM.sensorData.sw0 === 1 && moleX === 0 && serialPDM.sensorData.sw1 === 0&& serialPDM.sensorData.sw2 === 0&& serialPDM.sensorData.sw3 === 0&& serialPDM.sensorData.sw4 === 0){
      synth3.triggerAttackRelease("D5", "8n");
      serialPDM.transmit('mouse', 1);
      score++;
      var possibleX = [0,1,2,3,4];
    moleX = random(possibleX);
    }else if(serialPDM.sensorData.sw1 === 1 && moleX === 1&& serialPDM.sensorData.sw0 === 0&& serialPDM.sensorData.sw2 === 0&& serialPDM.sensorData.sw3 === 0&& serialPDM.sensorData.sw4 === 0){
      synth3.triggerAttackRelease("D5", "8n");
      serialPDM.transmit('mouse', 1);
      score++;
      var possibleX = [0,1,2,3,4];
    moleX = random(possibleX);
    }else if(serialPDM.sensorData.sw2 === 1 && moleX === 2 && serialPDM.sensorData.sw1 === 0&& serialPDM.sensorData.sw0 === 0&& serialPDM.sensorData.sw3 === 0&& serialPDM.sensorData.sw4 === 0){
      synth3.triggerAttackRelease("D5", "8n");
      serialPDM.transmit('mouse', 1);
      score++;
      var possibleX = [0,1,2,3,4];
      moleX = random(possibleX);
    }else if(serialPDM.sensorData.sw3 === 1 && moleX === 3&& serialPDM.sensorData.sw1 === 0&& serialPDM.sensorData.sw2 === 0&& serialPDM.sensorData.sw0 === 0&& serialPDM.sensorData.sw4 === 0){
      synth3.triggerAttackRelease("D5", "8n");
      serialPDM.transmit('mouse', 1);
      score++;
      var possibleX = [0,1,2,3,4];
    moleX = random(possibleX);
    }else if(serialPDM.sensorData.sw4 === 1 && moleX === 4&& serialPDM.sensorData.sw1 === 0&& serialPDM.sensorData.sw2 === 0&& serialPDM.sensorData.sw3 === 0&& serialPDM.sensorData.sw0 === 0){
      synth3.triggerAttackRelease("D5", "8n");
      serialPDM.transmit('mouse', 1);
      score++;
      var possibleX = [0,1,2,3,4];
    moleX = random(possibleX);
    }

    if(timerIsDone === true){
      gameState = "end";
      sequence1.stop();
      Tone.Transport.stop();
    }


    
    
  }
  else if(gameState == "end"){
    textSize(25);
    fill("black");
    text("Congrats your Score is: " + score, 100, 75);
  }
 

}

function timer() {
  time = int((millis() - startTime) / 1000);
  if (time % startTime === 0) {
    timerIsDone = true;
  }
  return time;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}