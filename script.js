/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */
/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

// mogelijkheden voor de richting van vijandjes en speler
const LEFT = 0;
const RIGHT = 1;

var muntjes = 0; // muntjes gepakt in de game
var health = 3; // hp in de game

// score einde van de level
var A;
var B;
var C;
var D;
var E;
var F;

// speelveld
  var vakjes = [
               [ 1,2,1,0,1,0,0,0,0,3,3,1], 
               [ 1,3,0,3,3,1,1,0,0,2,0,3],       
               [ 2,1,1,0,0,0,0,0,0,1,3,0],
               [ 0,0,0,0,3,0,0,1,0,0,0,0],
               [ 3,1,1,0,0,0,0,0,0,3,3,0],
               [ 0,1,0,3,3,0,3,0,0,3,0,1],
               [ 3,1,1,0,1,3,0,3,0,0,1,2],
               [ 0,2,1,1,3,3,1,0,3,0,3,0]
               ];
// een vakje is 80x80 pixels
// het eerste vakje staat op x=25 en y=30

//speler
var spelerRichting = RIGHT;
var spelerBeweging = false;
var spelerX = 500; // x-positie van speler
var spelerY = 355; // y-positie van speler
var spelerGrootteX = 55;

// images
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var img13;
var img14;
var img15;

//tijd
var tijd;
var tijdOver = 6000;


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
// speler
var beweegAlles = function() {
// speler

spelerBeweging = false //walk is standaard false

if (keyIsDown(65)) {
spelerX = spelerX - 4;
spelerBeweging = true;
spelerRichting = LEFT;
}

if (keyIsDown(68)) {
spelerX = spelerX + 4;
spelerBeweging = true;
spelerRichting = RIGHT;
}

if (keyIsDown(87)) {
spelerY = spelerY - 4;
spelerBeweging= true;
}
  
if (keyIsDown(83)) {
spelerY = spelerY + 4;
spelerBeweging = true;
}

if(keyIsDown(87) && keyIsDown(83)) {
  spelerBeweging = false;
}

if(keyIsDown(68) && keyIsDown(65)) {
  spelerBeweging = false;
}
  
if (spelerX < 15) {
spelerX = 15;
}

if (spelerX > 950) {
spelerX = 950;
}

if (spelerY < 20) {
spelerY = 20;
}

if (spelerY > 590) {
spelerY = 590;
}


  // vijand

  // kogel

};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  
  var i = floor((spelerX+15)/80);
  var j = floor((spelerY+40)/80);
  // botsing speler met lava
 if(vakjes[j][i] === 1){
   health = health - 1;
   spelerX = 500;
   spelerY = 355;
 }
  // speler op muntje
 if(vakjes[j][i] === 2){
   muntjes = muntjes + 1;
   vakjes[j][i] = 0;
 }
  // botsing kogel tegen vijand

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // speelveld
  
  image(img1, 0, 0, 1280, 720);
  
  
  for (var j = 0; j < vakjes[0].length; j++) {
    for(var i = 0; i < vakjes.length; i++) {
      // vakje (grijs)
      if (vakjes[i][j] === 0) {
      fill(233,233,233);
      rect(j*80+25, i*80+30, 80, 80);
      image(img8, j*80+25, i*80+30, 80, 80);
    }
      // lava
    if (vakjes[i][j] === 1) {
      rect(j*80+25, i*80+30, 80, 80);
      image(img10, j*80+25, i*80+30, 80, 80);
    }
      // muntjes
      if (vakjes[i][j] === 2) {
      image(img8, j*80+25, i*80+30, 80, 80);
      image(img3, j*80+7, i*80+10, 120, 120);
    }
      // ander gekleurd vakje
      if (vakjes[i][j] === 3) {
      fill(233,233,233);
      rect(j*80+25, i*80+30, 80, 80);
      image(img9, j*80+25, i*80+30, 80, 80);
    }
    }
  }

  // vijand

  // kogel

  // speler


  var imageToUse = img2;
  
if (spelerRichting === RIGHT && spelerBeweging === false) {
imageToUse = img2;
spelerGrootteX = 55;
}

if (spelerRichting === LEFT && spelerBeweging === false) {
imageToUse = img5;
spelerGrootteX = 55;
}

if (spelerRichting === RIGHT && spelerBeweging === true) {
imageToUse = img6;
spelerGrootteX = 100;
}

if (spelerRichting === LEFT && spelerBeweging === true) {
imageToUse = img7;
spelerGrootteX = 100;
}
  
  // punten en health
  
  // scoreboard
  noSmooth()
  image(imageToUse, spelerX, spelerY, spelerGrootteX, 75);
  image(img4, 1020, 0, 1200, 720)
  smooth()
  
  textSize(40);
  fill("yellow");
  text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
  textSize(30);
  text("Levens:  " + health + "/3", 1070, 200);
  text("Muntjes:  " + muntjes + "/5", 1070, 240);
  text("Tijd:  " + tijdOver +"s", 1070, 280);
  textSize(35);
  fill("black");
  image(img11, 1120, 330, 70, 70);
  image(img12, 1120, 430, 70, 70);
  image(img13, 1120, 530, 70, 70);
  image(img15, 1120, 630, 70, 70);
  rect(1010, 0 , 10, 720);

  textSize(25);

// coordinaten muis
  fill(0,0,0);
  var label2 = mouseX + " , " + mouseY;
  text(label2, mouseX + 20, mouseY + 10);
  
  // coordinaten speler 
  fill(0,0,0);
  var label = spelerX + " , " + spelerY;
  text(label, spelerX + 40, spelerY + 20);
  
};

// menu buttons

// info button
/* 
if(mouseIsPressed && mouseX > 1120 && mouseX < 1190 && mouseY > 330 && mouseY < 400){
  fill("black");

}
*/



//tijd in game over
function beginTijd () {
  tijd = setInterval(updateTijd, 1000);
}
beginTijd();
updateTijd();
function updateTijd() {
  tijdOver = tijdOver - 1;
}

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
  // check of HP 0 is , of tijd op is, of muntjes allemaal gepakt zijn
  if(health === 0){
    return true;
  }
  if(muntjes === 5){
    return true;
    }
  if(tijdOver  <= 0){
    return true;
  }
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * preload
 * deze code wordt 1x uitgevoerd voor setup voor het laden van plaatjes
 */
function preload() {
  img1 = loadImage('afbeeldingen/achtergrond-foto.jpg');
  img2 = loadImage('afbeeldingen/idlecharacter.gif');
  img3 = loadImage('afbeeldingen/coin.gif');
  img4 = loadImage('afbeeldingen/junglewood.jpeg');
  img5 = loadImage('afbeeldingen/idlecharacter2.gif');
  img6 = loadImage('afbeeldingen/runningcharacter.gif');
  img7 = loadImage('afbeeldingen/runningcharacter2.gif');
  img8 = loadImage('afbeeldingen/vloersteen.jpeg');
  img9 = loadImage('afbeeldingen/vloersteen2.jpeg');
  img10 = loadImage('afbeeldingen/lava.gif');
  img11 = loadImage('afbeeldingen/infobutton.png');
  img12 = loadImage('afbeeldingen/retrybutton.png');
  img13 = loadImage('afbeeldingen/pausebutton.png');
  img14 = loadImage('afbeeldingen/playbutton.png');
  img15 = loadImage('afbeeldingen/quitbutton.png');
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
    spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    fill(0,0,0);
    rect(0,0,10000, 2000);
    fill(255,255,255);
    textSize(200);
    text("GAMEOVER", 90, 200);
    
    textSize(100);
    fill("lime");
    text("Retry", 190, 500);
    fill("red");
    text("Quit", 950, 500);

  textSize(40);
  if(muntjes === 5 && tijd > 0){
            fill(255,255,255);
            text("Score:", 600, 400);
            fill(15, 173, 12);
            text("A", 725, 400);
}
  if(muntjes === 4 && tijd > 0){
            fill(255,255,255);
            text("Score:", 600, 400);
            fill(219, 74, 48);
            text("B", 725, 400);
  }
    if(muntjes === 3 && tijd >= 0){
            fill(255,255,255);
            text("Score:", 600, 400);
            fill(230, 130, 30);
            text("C", 725, 400);
    }
      if(muntjes === 2 && tijd >= 0){
            fill(255,255,255);
            text("Score:", 600, 400);
            fill(69, 105, 68);
            text("D", 725, 400);
      }
        if(muntjes === 1 && tijd >= 0){
            fill(255,255,255);
            text("Score:", 600, 400);
            fill(2, 34, 97);
            text("E", 725, 400);
          }
          if(muntjes === 0 && tijd >= 0){
            fill(255,255,255);
            text("Score:", 600, 400);
            fill(102, 78, 7);
            text("F", 725, 400);
          }
  }
}
