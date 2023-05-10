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

var punten = 0; // punten in de game
var health = 10; // hp in de game

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
  // botsing speler tegen vijand
  
  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // speelveld
  
  image(img1, 0, 0, 1280, 720);
  
  
  for (var j = 0; j < vakjes[0].length; j++) {
    for(var i = 0; i < vakjes.length; i++) {
      if (vakjes[i][j] === 0) {
      fill(233,233,233);
      rect(j*80+25, i*80+30, 80, 80);
      image(img8, j*80+25, i*80+30, 80, 80);
    }
    if (vakjes[i][j] === 1) {
      rect(j*80+25, i*80+30, 80, 80);
      image(img10, j*80+25, i*80+30, 80, 80);
    }
      if (vakjes[i][j] === 2) {
      image(img8, j*80+25, i*80+30, 80, 80);
      image(img3, j*80+7, i*80+10, 120, 120);
    }
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
}

if (spelerRichting === LEFT && spelerBeweging === false) {
imageToUse = img5;
}

if (spelerRichting === RIGHT && spelerBeweging === true) {
imageToUse = img6;
}

if (spelerRichting === LEFT && spelerBeweging === true) {
imageToUse = img7;
}
  
  // punten en health
  
  // scoreboard
  noSmooth()
  image(imageToUse, spelerX, spelerY, spelerGrootteX, 75);
  image(img4, 1020, 0, 1200, 720)
  smooth()
  
  textSize(40);
  fill("yellow");
  text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1040, 90);
  textSize(30);
  text("Levens: " + health + "/10", 1050, 200)
  text("Punten: " + punten, 1050, 240)
  fill("black");
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

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
  // check of HP 0 is , of tijd op is, of ...
  if(health === 0){
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

  }
}
