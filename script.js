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
const MAINMENU = 0;
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEGSCHERM = 3;
const UITLEGSCHERM2 = 4;
const LEVELSCHERM = 5;
const QUITSCHERM = 6;
const RETRYSCHERM = 7;
const PAUZEERSCHERM = 8;
var spelStatus = MAINMENU;

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

// speelveld level 1
var vakjes1 = [
  [1, 2, 1, 0, 1, 0, 0, 0, 0, 3, 3, 1],
  [1, 3, 0, 3, 3, 1, 1, 0, 0, 2, 0, 3],
  [2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 3, 0],
  [0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0],
  [3, 1, 1, 0, 0, 0, 0, 0, 0, 3, 3, 0],
  [0, 1, 0, 3, 3, 0, 3, 0, 0, 3, 0, 1],
  [3, 1, 1, 0, 1, 3, 0, 3, 0, 0, 1, 2],
  [0, 2, 1, 1, 3, 3, 1, 0, 3, 0, 3, 0]
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
var img16;
var img17;
var img18;
var img19;
var img20;
var img21;
var img22;
var img23;
var img24;
var img25;
var img26;
var img27;
var img28;
var img29;
var img30;

// tijd in de game
var tijd = 60;

// levels
var level = 1;


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */


/**
 * Main menu voor de game wordt hier gemaakt
*/
var mainMenu = function() {
  // achtergrond
  image(img16, 0, 0, 1280, 720);

  // buttons
  image(img14, 565, 400, 150, 150);  // play button
  image(img11, 470, 390, 70, 70);    // info button
  image(img17, 740, 390, 70, 70);    // level button

  // Button voor om te spelen (midden)
  if (mouseX > 565 && mouseX < 715 && mouseY > 400 && mouseY < 550) {
    if (mouseIsPressed === true) {
      spelStatus = SPELEN;
    }
  }

  // Button voor naar de uitlegscherm (linker)
  if (mouseX > 470 && mouseX < 540 && mouseY > 390 && mouseY < 460) {
    if (mouseIsPressed === true) {
      spelStatus = UITLEGSCHERM;
    }
  }

  // Button voor om naar de levels te gaan (rechter)
  if (mouseX > 740 && mouseX < 810 && mouseY > 390 && mouseY < 460) {
    if (mouseIsPressed === true) {
      spelStatus = LEVELSCHERM;
    }
  }

  image(img18, 280, 180);

};


/** 
 * Uitlegscherm in de main menu van de game wordt hier gemaakt
*/
var uitlegScherm = function() {
  // achtergrond
  image(img16, 0, 0, 1280, 720);

  // button om terug te gaan naar de main menu
  image(img19, 40, 600, 100, 100);

  if (mouseX > 40 && mouseX < 140 && mouseY > 600 && mouseY < 700) {
    if (mouseIsPressed === true) {
      spelStatus = MAINMENU;
    }
  }

};


/** 
 * Buttons tijdens het spelen van game
*/

// Uitlegscherm tijdens het spelen van de game wordt hier gemaakt
var uitlegScherm2 = function() {
  //achtergrond
  image(img16, 0, 0, 1280, 720);

  // button om terug te gaan naar het spel
  image(img19, 50, 600, 100, 100);

  if (mouseX > 50 && mouseX < 150 && mouseY > 600 && mouseY < 700) {
    if (mouseIsPressed === true) {
      spelStatus = SPELEN;
    }
  }
};

/** 
 * Level scherm voor de game
*/
var levelScherm = function() {
  // achtergrond
  image(img16, 0, 0, 1280, 720);

  // button om terug te gaan naar main menu
  image(img19, 40, 600, 100, 100);

  fill('white');
  textSize(30);
  
  // level 1
  image(img30, 120, 100, 252, 184);
  image(img14, 216, 162, 80, 80);
  text("Level 1", 200, 310);

  // level 2
  if(level >= 2){
  image(img30, 492, 100, 252, 184);
  image(img14, 588, 162, 80, 80);
  text("Level 2", 572, 310);
  }
  else{
  image(img30, 492, 100, 252, 184);
  image(img28, 503, 100, 230, 200);
  textSize(30);
  text("Haal eerst level 1", 502, 310);
  }

  // level 3
  if(level >= 3){
  image(img30, 864, 100, 252, 184);
  image(img14, 960, 162, 80, 80);
  text("Level 3", 944, 310);
  }
  else{
  image(img30, 864, 100, 252, 184);
  image(img28, 875, 100, 230, 200);
  text("Haal eerst level 2", 874, 310);
  }

  // level 4
  if(level >= 4){
  image(img30, 346, 400, 252, 184);
  image(img14, 440, 462, 80, 80);
  text("Level 4", 426, 610);
  }
  else{
  image(img30, 346, 400, 252, 184);
  image(img28, 357, 400, 230, 200);
  text("Haal eerst level 3", 356, 610);
  }

  // level 5
  if(level >= 5){
  image(img30, 682, 400, 252, 184);
  image(img14, 778, 462, 80, 80);
  text("Level 5", 762, 610);
  }
  else{
  image(img30, 682, 400, 252, 184);
  image(img28, 693, 400, 230, 200);
  text("Haal eerst level 4", 692, 610);
  }

  // ga level 1 spelen als je op play button klikt
  if (mouseX > 216 && mouseX < 296 && mouseY > 162 && mouseY < 242) {
    if (mouseIsPressed === true) {
      spelStatus = SPELEN;
    }
  }


  // ga naar main menu als je op pijltje terug klikt
  if (mouseX > 40 && mouseX < 140 && mouseY > 600 && mouseY < 700) {
    if (mouseIsPressed === true) {
      spelStatus = MAINMENU;
    }
  }
};

/** 
 * Retry scherm om de game opnieuw te beginnen
*/
var retryScherm = function() {
  image(img27, 350, 150, 600, 500);

  textSize(40);
  fill("white");
  text("Weet je zeker dat je wil restarten?", 250, 250);

  image(img22, 360, 350, 100, 100); // Ja button
  image(img15, 650, 350, 100, 100); // Nee button


  // Code om de game te restarten
  if (mouseX > 540 && mouseX < 640 && mouseY > 300 && mouseY < 400) {
    if (mouseIsPressed === true) {
      spelStatus = SPELEN;
      resetGlobalVariables();
    }
  }

  // Code voor de nee button 
  if (mouseX > 740 && mouseX < 840 && mouseY > 300 && mouseY < 400) {
    if (mouseIsPressed === true) {
      spelStatus = SPELEN;
    }
  }

};

/** 
 * Pauzeer de game tijdens het spelen
*/
var quitScherm = function() {
  //achtergrond
  image(img16, 100, 100, 1080, 520);

  textSize();
  fill("white");
  text("Weet je zeker dat je wil stoppen?", 100, 100);
  rect(200, 175, 30, 30);
  text("JA", 200, 200);
  rect(200, 275, 60, 30);
  text("NEE", 200, 300);

  if (mouseX > 200 && mouseX < 230 && mouseY > 175 && mouseY < 205) {
    if (mouseIsPressed === true) {
      spelStatus = MAINMENU;
      resetGlobalVariables();
    }
  }
  if (mouseX > 200 && mouseX < 260 && mouseY > 275 && mouseY < 305) {
    if (mouseIsPressed === true) {
      spelStatus = SPELEN;
    }
  }
}

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
    spelerBeweging = true;
  }

  if (keyIsDown(83)) {
    spelerY = spelerY + 4;
    spelerBeweging = true;
  }

  if (keyIsDown(87) && keyIsDown(83)) {
    spelerBeweging = false;
  }

  if (keyIsDown(68) && keyIsDown(65)) {
    spelerBeweging = false;
  }

  if (spelerX < 15) {
    spelerX = 15;
  }

  if (spelerX > 935) {
    spelerX = 935;
  }

  if (spelerY < 20) {
    spelerY = 20;
  }

  if (spelerY > 590) {
    spelerY = 590;
  }


  // vijand

  // kogel

  // tijd
  tijd = tijd - 0.012375;

};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {

  var i = floor((spelerX + 15) / 80);
  var j = floor((spelerY + 40) / 80);
  // botsing speler met lava
  if (vakjes1[j][i] === 1) {
    health = health - 1;
    spelerX = 500;
    spelerY = 355;
  }
  // speler op muntje
  if (vakjes1[j][i] === 2) {
    muntjes = muntjes + 1;
    vakjes1[j][i] = 0;
  }

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {

  // speelveld
  image(img1, 0, 0, 1280, 720);


  for (var j = 0; j < vakjes1[0].length; j++) {
    for (var i = 0; i < vakjes1.length; i++) {
      // vakje (grijs)
      if (vakjes1[i][j] === 0) {
        fill(233, 233, 233);
        rect(j * 80 + 25, i * 80 + 30, 80, 80);
        image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
      }
      // lava
      if (vakjes1[i][j] === 1) {
        rect(j * 80 + 25, i * 80 + 30, 80, 80);
        image(img10, j * 80 + 25, i * 80 + 30, 80, 80);
      }
      // muntjes
      if (vakjes1[i][j] === 2) {
        image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
        image(img3, j * 80 + 7, i * 80 + 10, 120, 120);
      }
      // ander gekleurd vakje
      if (vakjes1[i][j] === 3) {
        fill(233, 233, 233);
        rect(j * 80 + 25, i * 80 + 30, 80, 80);
        image(img9, j * 80 + 25, i * 80 + 30, 80, 80);
      }
    }
  }
  // speler richtingen tijdens het lopen
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

  // scoreboard tijdens het spelen
  noSmooth()
  image(imageToUse, spelerX, spelerY, spelerGrootteX, 75);
  image(img4, 1020, 0, 1200, 720)
  smooth()

  textSize(40);
  fill("yellow");
  text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
  textSize(30);
  text("Level:  " + level, 1070, 160);
  text("Levens:  " + health + "/3", 1070, 200);
  text("Muntjes:  " + muntjes + "/5", 1070, 240);
  text("Tijd:  " + floor(tijd) + "s", 1070, 280);
  textSize(35);
  fill("black");
  image(img11, 1120, 330, 70, 70);
  image(img12, 1120, 430, 70, 70);
  image(img13, 1120, 530, 70, 70);
  image(img15, 1120, 630, 70, 70);
  rect(1010, 0, 10, 720);

  textSize(25);

  // coordinaten muis
  // fill(0, 0, 0);
  // var label2 = mouseX + " , " + mouseY;
  // text(label2, mouseX + 20, mouseY + 10);

  // coordinaten speler 
  // fill(0, 0, 0);
  // var label = spelerX + " , " + spelerY;
  // text(label, spelerX + 40, spelerY + 20);

  /**  
   * Menu buttons in game 
  */

  // Info button
  if (mouseX > 1120 && mouseX < 1190 && mouseY > 330 && mouseY < 400) {
    if (mouseIsPressed === true) {
      spelStatus = UITLEGSCHERM2;
    }
  }

  // Quit button
  if (mouseX > 1120 && mouseX < 1190 && mouseY > 630 && mouseY < 700) {
    if (mouseIsPressed === true) {
      spelStatus = QUITSCHERM;
    }
  }

  // Retry button
  if (mouseX > 1120 && mouseX < 1190 && mouseY > 430 && mouseY < 500) {
    if (mouseIsPressed === true) {
      spelStatus = RETRYSCHERM;
    }
  }


};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
  // check of HP 0 is , of tijd op is of muntjes allemaal gepakt zijn
  if (health === 0) {
    return true;
  }
  if (muntjes === 5) {
    return true;
  }
  if (tijd <= 0) {
    return true;
  }
  return false;
};

/** 
 * Restart de game en reset alle variables naar de standaard waarden om spel opnieuw te 
 * spelen
*/
function resetGlobalVariables() {
  muntjes = 0;
  health = 3;
  tijd = 60;
  spelerRichting = RIGHT;
  spelerBeweging = false;
  spelerX = 500;
  spelerY = 355;
  vakjes1 = [[1, 2, 1, 0, 1, 0, 0, 0, 0, 3, 3, 1],
  [1, 3, 0, 3, 3, 1, 1, 0, 0, 2, 0, 3],
  [2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 3, 0],
  [0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0],
  [3, 1, 1, 0, 0, 0, 0, 0, 0, 3, 3, 0],
  [0, 1, 0, 3, 3, 0, 3, 0, 0, 3, 0, 1],
  [3, 1, 1, 0, 1, 3, 0, 3, 0, 0, 1, 2],
  [0, 2, 1, 1, 3, 3, 1, 0, 3, 0, 3, 0]
  ];
}


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
  img16 = loadImage('afbeeldingen/mainmenu.png');
  img17 = loadImage('afbeeldingen/levelsbutton.png');
  img18 = loadImage('afbeeldingen/textmainmenu.png');
  img19 = loadImage('afbeeldingen/returnbutton.png');
  img20 = loadImage('afbeeldingen/idlecharacterzwartenwit.gif');
  img21 = loadImage('afbeeldingen/idlecharacter2zwartenwit.gif');
  img22 = loadImage('afbeeldingen/markbutton.png');
  img23 = loadImage('afbeeldingen/buttonnummer2.png');
  img24 = loadImage('afbeeldingen/buttonnummer3.png');
  img25 = loadImage('afbeeldingen/buttonnummer4.png');
  img26 = loadImage('afbeeldingen/buttonnummer5.png');
  img27 = loadImage('afbeeldingen/gameui.png');
  img28 = loadImage('afbeeldingen/levelslock.png');
  img29 = loadImage('afbeeldingen/buttonnummer1.png');
  img30 = loadImage('afbeeldingen/level1normaal.png');
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
  if (spelStatus === MAINMENU) {
    mainMenu();
  }
  if (spelStatus === UITLEGSCHERM) {
    uitlegScherm();
  }
  if (spelStatus === UITLEGSCHERM2) {
    uitlegScherm2();
  }
  if (spelStatus === LEVELSCHERM) {
    levelScherm();
  }
  if (spelStatus === QUITSCHERM) {
    quitScherm();
  }
  if (spelStatus === RETRYSCHERM) {
    retryScherm();
  }
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
    fill(0, 0, 0);
    rect(0, 0, 10000, 2000);
    fill(255, 255, 255);
    textSize(200);
    text("GAMEOVER", 80, 250);

    image(img12, 340, 420, 170, 170);   // retry button
    image(img15, 770, 420, 170, 170);   // terug button
    image(img20, 90, 300);              // plaatje links
    image(img21, 980, 300);             // plaatje rechts

    // score
    textSize(60);
    if (muntjes === 5 && tijd > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(15, 173, 12);
      text("A", 715, 400);
      level = 2;
    }
    if (muntjes === 4 && tijd > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(219, 74, 48);
      text("B", 715, 400);
    }
    if (muntjes === 3 && tijd >= 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(230, 130, 30);
      text("C", 715, 400);
    }
    if (muntjes === 2 && tijd >= 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(69, 105, 68);
      text("D", 715, 400);
    }
    if (muntjes === 1 && tijd >= 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(2, 34, 97);
      text("E", 715, 400);
    }
    if (muntjes === 0 && tijd >= 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(102, 78, 7);
      text("F", 715, 400);
    }

    // retry button
    if (mouseX > 340 && mouseX < 510 && mouseY > 420 && mouseY < 590) {
      if (mouseIsPressed === true) {
        spelStatus = SPELEN;
        resetGlobalVariables();
      }
    }

    // terug button
    if (mouseX > 770 && mouseX < 940 && mouseY > 420 && mouseY < 590) {
      if (mouseIsPressed === true) {
        spelStatus = MAINMENU;
        resetGlobalVariables();
      }
    }


  }
};