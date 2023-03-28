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

var spelerX = 505; // x-positie van speler
var spelerY = 360; // y-positie van speler
var punten = 0; // punten in de game
var health = 100; // hp in de game

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
// speler
var beweegAlles = function() {

  if(keyIsDown(65)) {
     spelerX = spelerX - 5;
 } 
 if (keyIsDown(68)) {
     spelerX = spelerX + 5;
 }
  if (keyIsDown(87)) {
     spelerY = spelerY - 5;
 }
  if (keyIsDown(83)) {
     spelerY = spelerY + 5;
 }


  if (spelerX < 50) {
       spelerX = 50;
  }
  if (spelerX > 960) {
       spelerX = 960;
  }
  if (spelerY < 65) {
    spelerY = 65;
  }
  if (spelerY > 655) {
    spelerY = 655;
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
  
background("blue");
  
  var vakjes = [ "1","2","3","4","5","6","7","8","9","10","11","12"];
  
  for (var j = 0; j < vakjes.length; j++) {
  fill(233,233,233)  
  rect(j*80+25, 40, 80, 80);
  rect(j*80+25, 120, 80, 80);
  rect(j*80+25, 200, 80, 80);
  fill("red")
  rect(185, 200, 80, 80)
  fill(233,233,233) 
  rect(j*80+25, 280, 80, 80);
  rect(j*80+25, 360, 80, 80);
  rect(j*80+25, 440, 80, 80);
  rect(j*80+25, 520, 80, 80);
  rect(j*80+25, 600, 80, 80);
  }

  // vijand

  // kogel

  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10); 
  
  // punten en health
    if (spelerX < 291 & spelerX > 159 & spelerY < 306 & spelerY > 174) {
      spelerX = 505;
      spelerY= 360;
      health= health - 5;
  }

  // scoreboard
  fill("white");
  rect(1020, 40, 225, 640);
  textSize(40);
  fill("black");
  text("Scoreboard", 1030,90);
  textSize(25);
  text("Levens: " + health + "/100", 1050, 130)

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
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background("blue");
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
