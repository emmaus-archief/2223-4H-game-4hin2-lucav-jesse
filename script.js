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
const SHOPSCHERM = 9;
var spelStatus = MAINMENU;

// mogelijkheden voor de richting van vijandjes en speler
const LEFT = 0;
const RIGHT = 1;

// muntjes gepakt in de game
var muntjes1 = 0; // muntjes in level 1
var muntjes2 = 0; // muntjes in level 2
var muntjes3 = 0; // muntjes in level 3
var muntjes4 = 0; // muntjes in level 4
var muntjes5 = 0; // muntjes in level 5

// hp in de game
var health1en2 = 3; // hp voor level 1 en 2
var health3en4 = 2; // hp voor level 3 en 4
var health5 = 1;    // hp voor level 5

// record tijden van de levels
var recordtijd1onafgerond = 0;
var recordtijd1afgerond = 0; // afgeronde tijd met 3 decimalen
var recordtijd2onafgerond = 0;
let recordtijd2afgerond = 0; // afgeronde tijd met 3 decimalen
var recordtijd3onafgerond = 0;
let recordtijd3afgerond = 0; // afgeronde tijd met 3 decimalen
var recordtijd4onafgerond = 0;
let recordtijd4afgerond = 0; // afgeronde tijd met 3 decimalen
var recordtijd5onafgerond = 0;
let recordtijd5afgerond = 0; // afgeronde tijd met 3 decimalen

// speelveld voor de levels (level staat erachter)
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
var vakjes2 = [
  [3, 1, 1, 1, 0, 0, 0, 1, 1, 0, 3, 0],
  [0, 3, 0, 3, 2, 3, 0, 0, 0, 0, 1, 3],
  [1, 3, 0, 0, 1, 0, 3, 0, 0, 1, 2, 0],
  [2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 1, 1, 3, 0, 0, 3, 1, 0, 1],
  [0, 0, 1, 2, 1, 0, 0, 1, 0, 1, 1, 1],
  [0, 1, 0, 0, 3, 0, 3, 1, 3, 3, 0, 2]
];
var vakjes3 = [
  [0, 1, 3, 0, 0, 0, 3, 0, 0, 2, 1, 0],
  [0, 3, 0, 2, 1, 0, 0, 3, 0, 1, 1, 3],
  [3, 1, 1, 1, 0, 3, 1, 3, 0, 3, 0, 0],
  [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 3, 0, 0, 0, 0, 1, 1, 2],
  [0, 1, 3, 1, 0, 0, 3, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
  [3, 0, 1, 3, 0, 2, 1, 0, 0, 3, 0, 3]
];
var vakjes4 = [
  [2, 1, 0, 0, 1, 0, 0, 3, 0, 0, 0, 3],
  [3, 1, 0, 3, 1, 2, 1, 1, 0, 3, 1, 0],
  [0, 3, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 0, 1, 0, 3, 0, 0, 0, 1, 2, 0],
  [0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0],
  [3, 2, 1, 0, 1, 0, 3, 0, 0, 1, 3, 0],
  [0, 1, 1, 0, 3, 0, 0, 1, 0, 3, 0, 0],
  [3, 0, 0, 3, 1, 1, 2, 1, 1, 0, 1, 3]
];
var vakjes5 = [
  [1, 0, 1, 2, 3, 0, 1, 0, 0, 0, 3, 1],
  [0, 2, 0, 1, 1, 0, 3, 1, 0, 1, 2, 1],
  [3, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3],
  [0, 0, 1, 1, 0, 0, 0, 0, 1, 3, 0, 0],
  [1, 3, 1, 0, 3, 0, 3, 0, 0, 0, 1, 3],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0],
  [3, 0, 1, 0, 1, 0, 0, 3, 1, 1, 0, 0],
  [2, 1, 0, 3, 0, 0, 1, 0, 0, 2, 1, 0]
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
var img31;
var img32;
var img33;
var img34;
var img35;
var img36;
var img37;
var img38;
var img39;
var img40;
var img41;
var img42;
var img43;

// tijd in de game
var tijd1 = 60; // tijd in level 1
var tijd2 = 50; // tijd in level 2
var tijd3 = 45; // tijd in level 3
var tijd4 = 30; // tijd in level 4
var tijd5 = 30; // tijd in level 5

// levels
var level = 1;
var hoogsteLevel = 1;

// punten in de hele game (kan je gebruiken in de shop)
var punten = 0;
var muntenupgrade = 0; // gaat 1 omhoog als een upgrade voor munten is gekocht in shop


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
  image(img14, 565, 370, 150, 150);  // play button
  image(img11, 490, 480, 70, 70);    // info button
  image(img17, 720, 480, 70, 70);    // level button
  image(img40, 600, 540, 80, 80);    // shop button 

  // Button voor om te spelen (midden)
  if (mouseX > 565 && mouseX < 715 && mouseY > 370 && mouseY < 520) {
    if (mouseIsPressed === true) {
      spelStatus = SPELEN;
      level = hoogsteLevel;
      resetGlobalVariables();
    }
  }

  // Button voor naar de uitlegscherm (linker)
  if (mouseX > 490 && mouseX < 560 && mouseY > 480 && mouseY < 550) {
    if (mouseIsPressed === true) {
      spelStatus = UITLEGSCHERM;
    }
  }

  // Button voor om naar de levels te gaan (rechter)
  if (mouseX > 720 && mouseX < 790 && mouseY > 480 && mouseY < 550) {
    if (mouseIsPressed === true) {
      spelStatus = LEVELSCHERM;
    }
  }

  // Button voor om naar de shop te gaan (midden onder)
  if (mouseX > 600 && mouseX < 680 && mouseY > 540 && mouseY < 620) {
    if (mouseIsPressed === true) {
      spelStatus = SHOPSCHERM;
    }
  }

  image(img18, 280, 180); // text JUNGLE ESCAPE
};

/** 
 * Shop menu voor de game wordt hier gemaakt
*/
var shopScherm = function() {
  // achtergrond
  image(img16, 0, 0, 1280, 720);
  // text bovenin
  textSize(100);
  fill("yellow");
  text("𝒮𝐻𝒪𝒫", 520, 80)
  textSize(60)
  text("Punten: " + punten, 550, 700);


  // munten upgrade
  image(img27, 80, 200, 390, 350);
  textSize(60);
  fill('black');
  text("ᴍᴜɴᴛᴇɴ", 180, 250)
  textSize(30);
  fill('black');
  rect(130, 260, 150, 150);
  image(img8, 140, 270, 130, 130); // achtergrond van het muntje
  image(img43, 320, 300, 90, 90);  // plus button
  
  if(muntenupgrade === 0){
    image(img41, 155, 285, 100, 100); // bronzen coin
    fill('yellow');
    text("Munten level 1", 120, 450);
    text("Upgrade kost: 10 punten", 120, 480);
    if (punten >= 10 && mouseX > 320 && mouseX < 410 && mouseY > 300 && mouseY < 390) {
    if (mouseIsPressed === true) {
      muntenupgrade = 1;
      punten = punten - 10;
    }
  }
  }
  if(muntenupgrade === 1){
    image(img42, 155, 285, 100, 100); // zilveren coin
    fill('yellow');
    text("Munten level 2", 120, 450);
    text("Upgrade kost: 50 punten", 120, 480);
    if (punten >= 50 && mouseX > 340 && mouseX < 430 && mouseY > 300 && mouseY < 390) {
    if (mouseIsPressed === true) {
      muntenupgrade = 2;
      punten = punten - 50;
    }
  }
  }
  if(muntenupgrade === 2){
    image(img3, 155, 285, 100, 100); // gouden coin
    fill('yellow');
    text("Munten level 3", 120, 450);
    text("Upgrade kost: MAX LEVEL", 120, 480);
  }
  

    // button om terug te gaan naar de main menu
  image(img19, 40, 600, 100, 100);

  if (mouseX > 40 && mouseX < 140 && mouseY > 600 && mouseY < 700) {
    if (mouseIsPressed === true) {
      spelStatus = MAINMENU;
    }
  }  
}

/** 
 * Uitlegscherm in de main menu van de game wordt hier gemaakt
*/
var uitlegScherm = function() {
  // achtergrond
  image(img16, 0, 0, 1280, 720);
  // text bovenin
  textSize(100);
  fill("yellow");
  text("𝐼𝒩𝐹𝒪", 520, 80)

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
  // text bovenin
  textSize(100);
  fill("yellow");
  text("𝐼𝒩𝐹𝒪", 520, 80)

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

  // text bovenin
  textSize(100);
  fill("yellow");
  text("𝐿𝐸𝒱𝐸𝐿𝒮", 460, 80)

  // button om terug te gaan naar main menu
  image(img19, 40, 600, 100, 100);

  textSize(30);

  // level 1
  fill("yellow");
  image(img30, 120, 150, 252, 184);
  image(img14, 216, 212, 80, 80);
  text("Level 1", 200, 360);
  
  textSize(20);
  recordtijd1afgerond = recordtijd1onafgerond.toFixed(3); // afgeronde tijd met 3 decimalen
  text("Snelste tijd: " + recordtijd1afgerond + "s", 160, 180);
  textSize(30);
  
  // ga level 1 spelen als je op play button klikt
  if (mouseX > 216 && mouseX < 296 && mouseY > 212 && mouseY < 292 && hoogsteLevel >= 1) {
    if (mouseIsPressed === true) {
      spelStatus = SPELEN;
      level = 1;
      resetGlobalVariables();
    }
  }

  // level 2
  if (hoogsteLevel >= 2) {
    fill("yellow");
    image(img32, 492, 150, 252, 184);
    image(img14, 588, 212, 80, 80);
    text("Level 2", 572, 360);
    
    textSize(20);
    recordtijd2afgerond = recordtijd2onafgerond.toFixed(3); // afgeronde tijd met 3 decimalen
    text("Snelste tijd: " + recordtijd2afgerond + "s", 532, 180);
    textSize(30);

    // ga level 2 spelen als je op play button klikt
    if (mouseX > 588 && mouseX < 668 && mouseY > 212 && mouseY < 292) {
      if (mouseIsPressed === true) {
        spelStatus = SPELEN;
        level = 2;
        resetGlobalVariables();
      }
    }
  }
  else {
    fill("white");
    image(img33, 492, 150, 252, 184);
    image(img28, 503, 150, 230, 200);
    textSize(30);
    text("Haal eerst level 1", 502, 360);
  }

  // level 3
  if (hoogsteLevel >= 3) {
    fill("yellow");
    image(img34, 864, 150, 252, 184);
    image(img14, 960, 212, 80, 80);
    text("Level 3", 944, 360);
    
    textSize(20);
    recordtijd3afgerond = recordtijd3onafgerond.toFixed(3); // afgeronde tijd met 3 decimalen
    text("Snelste tijd: " + recordtijd3afgerond + "s", 904, 180);
    textSize(30);

    // ga level 3 spelen als je op play button klikt
    if (mouseX > 960 && mouseX < 1040 && mouseY > 212 && mouseY < 292) {
      if (mouseIsPressed === true) {
        spelStatus = SPELEN;
        level = 3;
        resetGlobalVariables();
      }
    }
  }
  else {
    fill("white");
    image(img35, 864, 150, 252, 184);
    image(img28, 875, 150, 230, 200);
    text("Haal eerst level 2", 874, 360);
  }

  // level 4
  if (hoogsteLevel >= 4) {
    fill("yellow");
    image(img36, 346, 400, 252, 184);
    image(img14, 440, 462, 80, 80); // play button
    text("Level 4", 426, 610);

    textSize(20);
    recordtijd4afgerond = recordtijd4onafgerond.toFixed(3); // afgeronde tijd met 3 decimalen
    text("Snelste tijd: " + recordtijd4afgerond + "s", 386, 430);
    textSize(30);

    // ga level 4 spelen als je op play button klikt
    if (mouseX > 426 && mouseX < 506 && mouseY > 462 && mouseY < 542) {
      if (mouseIsPressed === true) {
        spelStatus = SPELEN;
        level = 4;
        resetGlobalVariables();
      }
    }
  }
  else {
    fill("white");
    image(img37, 346, 400, 252, 184);
    image(img28, 357, 400, 230, 200);
    text("Haal eerst level 3", 356, 610);
  }

  // level 5
  if (hoogsteLevel >= 5) {
    fill("yellow");
    image(img38, 682, 400, 252, 184);
    image(img14, 778, 462, 80, 80); // play button
    text("Level 5", 762, 610);
    
    textSize(20);
    recordtijd5afgerond = recordtijd5onafgerond.toFixed(3); // afgeronde tijd met 3 decimalen
    text("Snelste tijd: " + recordtijd5afgerond + "s", 722, 430);
    textSize(30);

    // ga level 5 spelen als je op play button klikt
    if (mouseX > 778 && mouseX < 858 && mouseY > 462 && mouseY < 542) {
      if (mouseIsPressed === true) {
        spelStatus = SPELEN;
        level = 5;
        resetGlobalVariables();
      }
    }
  }
  else {
    fill("white");
    image(img39, 682, 400, 252, 184);
    image(img28, 693, 400, 230, 200);
    text("Haal eerst level 4", 692, 610);
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
  image(img27, 185, 150, 650, 500);

  textSize(35);
  fill("yellow");
  text("Weet je zeker dat je wil restarten?", 250, 250);
  text("Level: " + level, 450, 350);

  image(img22, 320, 400, 100, 100); // Ja button
  image(img15, 600, 400, 100, 100); // Nee button


  // Code om de game te restarten
  if (mouseX > 320 && mouseX < 420 && mouseY > 400 && mouseY < 500) {
    if (mouseIsPressed === true) {
      spelStatus = SPELEN;
      resetGlobalVariables();
    }
  }

  // Code voor de nee button 
  if (mouseX > 600 && mouseX < 700 && mouseY > 400 && mouseY < 500) {
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
  image(img27, 185, 150, 650, 500);

  textSize(35);
  fill("yellow");
  text("Weet je zeker dat je wil stoppen?", 250, 250);
  text("Level: " + level, 450, 350);


  image(img22, 320, 400, 100, 100); // Ja button
  image(img15, 600, 400, 100, 100); // Nee button

  // code om naar mainmenu te gaan
  if (mouseX > 320 && mouseX < 420 && mouseY > 400 && mouseY < 500) {
    if (mouseIsPressed === true) {
      spelStatus = MAINMENU;
      resetGlobalVariables();
    }
  }

  // Code voor de nee button 
  if (mouseX > 600 && mouseX < 700 && mouseY > 400 && mouseY < 500) {
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

  spelerBeweging = false // walk is standaard false

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

  // tijd
  if (level === 1) {
    tijd1 = tijd1 - 0.012375;
  } // tijd van level 1 gaat lopen als level 1 aan staat
  if (level === 2) {
    tijd2 = tijd2 - 0.012375;
  } // tijd van level 2 gaat lopen als level 2 aan staat
  if (level === 3) {
    tijd3 = tijd3 - 0.012375;
  } // tijd van level 3 gaat lopen als level 3 aan staat
  if (level === 4) {
    tijd4 = tijd4 - 0.012375;
  } // tijd van level 4 gaat lopen als level 4 aan staat
  if (level === 5) {
    tijd5 = tijd5 - 0.012375;
  } // tijd van level 5 gaat lopen als level 5 aan staat

};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {

  var i = floor((spelerX + 15) / 80);
  var j = floor((spelerY + 40) / 80);
  if (level === 1) {
    // botsing speler met lava
    if (vakjes1[j][i] === 1) {
      health1en2 = health1en2 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes1[j][i] === 2) {
      muntjes1 = muntjes1 + 1;
      vakjes1[j][i] = 0;
      if(muntenupgrade === 0){
      punten = punten + 1;
      }
      if(muntenupgrade === 1){
      punten = punten + 2;
      }
      if(muntenupgrade === 2){
      punten = punten + 3;
      }
    }
  }; // botsingen voor level 1
  if (level === 2) {
    // botsing speler met lava
    if (vakjes2[j][i] === 1) {
      health1en2 = health1en2 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes2[j][i] === 2) {
      muntjes2 = muntjes2 + 1;
      vakjes2[j][i] = 0;
      if(muntenupgrade === 0){
      punten = punten + 1;
      }
      if(muntenupgrade === 1){
      punten = punten + 2;
      }
      if(muntenupgrade === 2){
      punten = punten + 3;
      }
    }
  }; // botsingen voor level 2
  if (level === 3) {
    // botsing speler met lava
    if (vakjes3[j][i] === 1) {
      health3en4 = health3en4 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes3[j][i] === 2) {
      muntjes3 = muntjes3 + 1;
      vakjes3[j][i] = 0;
      if(muntenupgrade === 0){
      punten = punten + 1;
      }
      if(muntenupgrade === 1){
      punten = punten + 2;
      }
      if(muntenupgrade === 2){
      punten = punten + 3;
      }
    }
  }; // botsingen voor level 3
  if (level === 4) {
    // botsing speler met lava
    if (vakjes4[j][i] === 1) {
      health3en4 = health3en4 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes4[j][i] === 2) {
      muntjes4 = muntjes4 + 1;
      vakjes4[j][i] = 0;
      if(muntenupgrade === 0){
      punten = punten + 1;
      }
      if(muntenupgrade === 1){
      punten = punten + 2;
      }
      if(muntenupgrade === 2){
      punten = punten + 3;
      }
    }
  }; // botsingen voor level 4
  if (level === 5) {
    // botsing speler met lava
    if (vakjes5[j][i] === 1) {
      health5 = health5 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes5[j][i] === 2) {
      muntjes5 = muntjes5 + 1;
      vakjes5[j][i] = 0;
      if(muntenupgrade === 0){
      punten = punten + 1;
      }
      if(muntenupgrade === 1){
      punten = punten + 2;
      }
      if(muntenupgrade === 2){
      punten = punten + 3;
      }
    }
  }; // botsingen voor level 5
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {

  // speelveld
  image(img1, 0, 0, 1280, 720);

  if (level === 1) {
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
          if(muntenupgrade === 0){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
        }
            if(muntenupgrade === 1){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
            if(muntenupgrade === 2){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img3, j * 80 + 25, i * 80 + 25, 80, 80); // gouden coin
          }
        }
        // ander gekleurd vakje
        if (vakjes1[i][j] === 3) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img9, j * 80 + 25, i * 80 + 30, 80, 80);
        }
      }
    }
  }  // vakjes tekenen voor level 1
  if (level === 2) {
    for (var j = 0; j < vakjes2[0].length; j++) {
      for (var i = 0; i < vakjes2.length; i++) {
        // vakje (grijs)
        if (vakjes2[i][j] === 0) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // lava
        if (vakjes2[i][j] === 1) {
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img10, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // muntjes
        if (vakjes2[i][j] === 2) {
          if(muntenupgrade === 0){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if(muntenupgrade === 1){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if(muntenupgrade === 2){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img3, j * 80 + 25, i * 80 + 25, 80, 80); // gouden coin
          }
        }
        // ander gekleurd vakje
        if (vakjes2[i][j] === 3) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img9, j * 80 + 25, i * 80 + 30, 80, 80);
        }
      }
    }
  }  // vakjes tekenen voor level 2
  if (level === 3) {
    for (var j = 0; j < vakjes3[0].length; j++) {
      for (var i = 0; i < vakjes3.length; i++) {
        // vakje (grijs)
        if (vakjes3[i][j] === 0) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // lava
        if (vakjes3[i][j] === 1) {
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img10, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // muntjes
        if (vakjes3[i][j] === 2) {
          if(muntenupgrade === 0){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if(muntenupgrade === 1){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if(muntenupgrade === 2){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img3, j * 80 + 25, i * 80 + 25, 80, 80); // gouden coin
          }
        }
        // ander gekleurd vakje
        if (vakjes3[i][j] === 3) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img9, j * 80 + 25, i * 80 + 30, 80, 80);
        }
      }
    }
  }  // vakjes tekenen voor level 3
  if (level === 4) {
    for (var j = 0; j < vakjes4[0].length; j++) {
      for (var i = 0; i < vakjes4.length; i++) {
        // vakje (grijs)
        if (vakjes4[i][j] === 0) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // lava
        if (vakjes4[i][j] === 1) {
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img10, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // muntjes
        if (vakjes4[i][j] === 2) {
          if(muntenupgrade === 0){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if(muntenupgrade === 1){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if(muntenupgrade === 2){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img3, j * 80 + 25, i * 80 + 25, 80, 80); // gouden coin
          }
        }
        // ander gekleurd vakje
        if (vakjes4[i][j] === 3) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img9, j * 80 + 25, i * 80 + 30, 80, 80);
        }
      }
    }
  }  // vakjes tekenen voor level 4
  if (level === 5) {
    for (var j = 0; j < vakjes5[0].length; j++) {
      for (var i = 0; i < vakjes5.length; i++) {
        // vakje (grijs)
        if (vakjes5[i][j] === 0) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // lava
        if (vakjes5[i][j] === 1) {
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img10, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // muntjes
        if (vakjes5[i][j] === 2) {
          if(muntenupgrade === 0){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if(muntenupgrade === 1){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if(muntenupgrade === 2){
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
          image(img3, j * 80 + 25, i * 80 + 25, 80, 80); // gouden coin
          }
        }
        // ander gekleurd vakje
        if (vakjes5[i][j] === 3) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img9, j * 80 + 25, i * 80 + 30, 80, 80);
        }
      }
    }
  }  // vakjes tekenen voor level 5

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
    spelerGrootteX = 80;
  }

  if (spelerRichting === LEFT && spelerBeweging === true) {
    imageToUse = img7;
    spelerGrootteX = 105;
  }

  // scoreboard tijdens het spelen
  noSmooth()
  image(imageToUse, spelerX, spelerY, spelerGrootteX, 75);
  image(img4, 1020, 0, 1200, 720)
  smooth()

  if (level === 1) {
    textSize(40);
    fill("yellow");
    text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
    textSize(30);
    text("Level:  " + level, 1070, 160);
    text("Levens:  " + health1en2 + "/3", 1070, 200);
    text("Muntjes:  " + muntjes1 + "/5", 1070, 240);
    text("Tijd:  " + floor(tijd1) + "s", 1070, 280);
    text("Punten: " + punten, 1070, 700);
    textSize(35);
    fill("black");
    image(img11, 1120, 330, 70, 70); // info button
    image(img12, 1120, 430, 70, 70); // retry button 
    image(img15, 1120, 530, 70, 70); // quit button
    rect(1010, 0, 10, 720);
  } // scoreboard van level 1
  if (level === 2) {
    textSize(40);
    fill("yellow");
    text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
    textSize(30);
    text("Level:  " + level, 1070, 160);
    text("Levens:  " + health1en2 + "/3", 1070, 200);
    text("Muntjes:  " + muntjes2 + "/5", 1070, 240);
    text("Tijd:  " + floor(tijd2) + "s", 1070, 280);
    text("Punten: " + punten, 1070, 700);
    textSize(35);
    fill("black");
    image(img11, 1120, 330, 70, 70); // info button
    image(img12, 1120, 430, 70, 70); // retry button 
    image(img15, 1120, 530, 70, 70); // quit button
    rect(1010, 0, 10, 720);
  } // scoreboard van level 2
  if (level === 3) {
    textSize(40);
    fill("yellow");
    text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
    textSize(30);
    text("Level:  " + level, 1070, 160);
    text("Levens:  " + health3en4 + "/2", 1070, 200);
    text("Muntjes:  " + muntjes3 + "/5", 1070, 240);
    text("Tijd:  " + floor(tijd3) + "s", 1070, 280);
    text("Punten: " + punten, 1070, 700);
    textSize(35);
    fill("black");
    image(img11, 1120, 330, 70, 70); // info button
    image(img12, 1120, 430, 70, 70); // retry button 
    image(img15, 1120, 530, 70, 70); // quit button
    rect(1010, 0, 10, 720);
  } // scoreboard van level 3
  if (level === 4) {
    textSize(40);
    fill("yellow");
    text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
    textSize(30);
    text("Level:  " + level, 1070, 160);
    text("Levens:  " + health3en4 + "/2", 1070, 200);
    text("Muntjes:  " + muntjes4 + "/5", 1070, 240);
    text("Tijd:  " + floor(tijd4) + "s", 1070, 280);
    text("Punten: " + punten, 1070, 700);
    textSize(35);
    fill("black");
    image(img11, 1120, 330, 70, 70); // info button
    image(img12, 1120, 430, 70, 70); // retry button 
    image(img15, 1120, 530, 70, 70); // quit button
    rect(1010, 0, 10, 720);
  } // scoreboard van level 4
  if (level === 5) {
    textSize(40);
    fill("yellow");
    text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
    textSize(30);
    text("Level:  " + level, 1070, 160);
    text("Levens:  " + health5 + "/1", 1070, 200);
    text("Muntjes:  " + muntjes5 + "/5", 1070, 240);
    text("Tijd:  " + floor(tijd5) + "s", 1070, 280);
    text("Punten: " + punten, 1070, 700);
    textSize(35);
    fill("black");
    image(img11, 1120, 330, 70, 70); // info button
    image(img12, 1120, 430, 70, 70); // retry button 
    image(img15, 1120, 530, 70, 70); // quit button
    rect(1010, 0, 10, 720);
  } // scoreboard van level 5

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
  if (mouseX > 1120 && mouseX < 1190 && mouseY > 530 && mouseY < 600) {
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
  if (health1en2 === 0 || health3en4 === 0 || health5 === 0) {
    return true;
  }
  if (muntjes1 === 5 || muntjes2 === 5 || muntjes3 === 5 || muntjes4 === 5 || muntjes5 === 5) {
    return true;
  }
  if (tijd1 <= 0 || tijd2 <= 0 || tijd3 <= 0 || tijd4 <= 0 || tijd5 <= 0) {
    return true;
  }
  return false;
};

/** 
 * Restart de game en reset alle variables naar de standaard waarden om spel opnieuw te 
 * spelen
*/
function resetGlobalVariables() {
  if (level === 1) {
    muntjes1 = 0;
    health1en2 = 3;
    tijd1 = 60;
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
  } // reset alles voor level 1
  if (level === 2) {
    muntjes2 = 0;
    health1en2 = 3;
    tijd2 = 50;
    spelerRichting = RIGHT;
    spelerBeweging = false;
    spelerX = 500;
    spelerY = 355;
    vakjes2 = [
      [3, 1, 1, 1, 0, 0, 0, 1, 1, 0, 3, 0],
      [0, 3, 0, 3, 2, 3, 0, 0, 0, 0, 1, 3],
      [1, 3, 0, 0, 1, 0, 3, 0, 0, 1, 2, 0],
      [2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 1, 1, 3, 0, 0, 3, 1, 0, 1],
      [0, 0, 1, 2, 1, 0, 0, 1, 0, 1, 1, 1],
      [0, 1, 0, 0, 3, 0, 3, 1, 3, 3, 0, 2]
    ];
  } // reset alles voor level 2
  if (level === 3) {
    muntjes3 = 0;
    health3en4 = 2;
    tijd3 = 45;
    spelerRichting = RIGHT;
    spelerBeweging = false;
    spelerX = 500;
    spelerY = 355;
    vakjes3 = [
      [0, 1, 3, 0, 0, 0, 3, 0, 0, 2, 1, 0],
      [0, 3, 0, 2, 1, 0, 0, 3, 0, 1, 1, 3],
      [3, 1, 1, 1, 0, 3, 1, 3, 0, 3, 0, 0],
      [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 3, 0, 0, 0, 0, 1, 1, 2],
      [0, 1, 3, 1, 0, 0, 3, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
      [3, 0, 1, 3, 0, 2, 1, 0, 0, 3, 0, 3]
    ];
  } // reset alles voor level 3
  if (level === 4) {
    muntjes4 = 0;
    health3en4 = 2;
    tijd4 = 30;
    spelerRichting = RIGHT;
    spelerBeweging = false;
    spelerX = 500;
    spelerY = 355;
    vakjes4 = [
      [2, 1, 0, 0, 1, 0, 0, 3, 0, 0, 0, 3],
      [3, 1, 0, 3, 1, 2, 1, 1, 0, 3, 1, 0],
      [0, 3, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 1, 0, 3, 0, 0, 0, 1, 2, 0],
      [0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0],
      [3, 2, 1, 0, 1, 0, 3, 0, 0, 1, 3, 0],
      [0, 1, 1, 0, 3, 0, 0, 1, 0, 3, 0, 0],
      [3, 0, 0, 3, 1, 1, 2, 1, 1, 0, 1, 3]
    ];
  } // reset alles voor level 4
  if (level === 5) {
    muntjes5 = 0;
    health5 = 1;
    tijd5 = 30;
    spelerRichting = RIGHT;
    spelerBeweging = false;
    spelerX = 500;
    spelerY = 355;
    vakjes5 = [
      [1, 0, 1, 2, 3, 0, 1, 0, 0, 0, 3, 1],
      [0, 2, 0, 1, 1, 0, 3, 1, 0, 1, 2, 1],
      [3, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3],
      [0, 0, 1, 1, 0, 0, 0, 0, 1, 3, 0, 0],
      [1, 3, 1, 0, 3, 0, 3, 0, 0, 0, 1, 3],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0],
      [3, 0, 1, 0, 1, 0, 0, 3, 1, 1, 0, 0],
      [2, 1, 0, 3, 0, 0, 1, 0, 0, 2, 1, 0]
    ];
  } // reset alles voor level 5
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
  img3 = loadImage('afbeeldingen/goudencoin.gif');
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
  img31 = loadImage('afbeeldingen/volgendebutton.png');
  img32 = loadImage('afbeeldingen/level2normaal.png');
  img33 = loadImage('afbeeldingen/level2zwartenwit.png');
  img34 = loadImage('afbeeldingen/level3normaal.png');
  img35 = loadImage('afbeeldingen/level3zwartenwit.png');
  img36 = loadImage('afbeeldingen/level4normaal.png');
  img37 = loadImage('afbeeldingen/level4zwartenwit.png');
  img38 = loadImage('afbeeldingen/level5normaal.png');
  img39 = loadImage('afbeeldingen/level5zwartenwit.png');
  img40 = loadImage('afbeeldingen/shopbutton.png');
  img41 = loadImage('afbeeldingen/bronzencoin.gif');
  img42 = loadImage('afbeeldingen/zilverencoin.gif');
  img43 = loadImage('afbeeldingen/plusbutton.png');
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
  if (spelStatus === SHOPSCHERM) {
    shopScherm();
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

    // score level 1
    textSize(60);
    if (muntjes1 === 5 && tijd1 > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(15, 173, 12);
      text("A", 715, 400);
      hoogsteLevel = 2;

      // record tijd van level 1
      if (tijd1 > 0 && recordtijd1afgerond <= recordtijd1onafgerond) {
        recordtijd1onafgerond = 60 - tijd1;
      }

      image(img31, 340, 420, 170, 170);   // volgend level button
      // volgend level button
      if (mouseX > 340 && mouseX < 510 && mouseY > 420 && mouseY < 590) {
        if (mouseIsPressed === true) {
          spelStatus = SPELEN;
          level = hoogsteLevel;
          resetGlobalVariables();
          muntjes1 = 0;
        }
      }
    }  // unlock volgende level
    if (level === 1) {
      if (muntjes1 === 4) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(219, 74, 48);
        text("B", 715, 400);
      }
      if (muntjes1 === 3) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(230, 130, 30);
        text("C", 715, 400);
      }
      if (muntjes1 === 2) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(69, 105, 68);
        text("D", 715, 400);
      }
      if (muntjes1 === 1) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(2, 34, 97);
        text("E", 715, 400);
      }
      if (muntjes1 === 0) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(102, 78, 7);
        text("F", 715, 400);
      }
    }  // toon de score aan van level 1

    // score level 2
    textSize(60);
    if (muntjes2 === 5 && tijd2 > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(15, 173, 12);
      text("A", 715, 400);
      hoogsteLevel = 3;
      
      // record tijd van level 2
      if (tijd2 > 0 && recordtijd2afgerond <= recordtijd2onafgerond) {
        recordtijd2onafgerond = 50 - tijd2;
      }

      image(img31, 340, 420, 170, 170);   // volgend level button
      // volgend level button
      if (mouseX > 340 && mouseX < 510 && mouseY > 420 && mouseY < 590) {
        if (mouseIsPressed === true) {
          spelStatus = SPELEN;
          level = hoogsteLevel;
          resetGlobalVariables();
          muntjes1 = 0;
          muntjes2 = 0;
        }
      }
    } // unlock volgende level
    if (level === 2) {
      if (muntjes2 === 4) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(219, 74, 48);
        text("B", 715, 400);
      }
      if (muntjes2 === 3) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(230, 130, 30);
        text("C", 715, 400);
      }
      if (muntjes2 === 2) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(69, 105, 68);
        text("D", 715, 400);
      }
      if (muntjes2 === 1) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(2, 34, 97);
        text("E", 715, 400);
      }
      if (muntjes2 === 0) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(102, 78, 7);
        text("F", 715, 400);
      }
    } // toon de score aan van level 2

    // score level 3
    if (muntjes3 === 5 && tijd3 > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(15, 173, 12);
      text("A", 715, 400);
      hoogsteLevel = 4;
      
      // record tijd van level 3
      if (tijd3 > 0 && recordtijd3afgerond <= recordtijd3onafgerond) {
        recordtijd3onafgerond = 45 - tijd3;
      }

      image(img31, 340, 420, 170, 170);   // volgend level button
      // volgend level button
      if (mouseX > 340 && mouseX < 510 && mouseY > 420 && mouseY < 590) {
        if (mouseIsPressed === true) {
          spelStatus = SPELEN;
          level = hoogsteLevel;
          resetGlobalVariables();
          muntjes1 = 0;
          muntjes2 = 0;
          muntjes3 = 0;
        }
      }
    } // unlock volgende level
    if (level === 3) {
      if (muntjes3 === 4) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(219, 74, 48);
        text("B", 715, 400);
      }
      if (muntjes3 === 3) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(230, 130, 30);
        text("C", 715, 400);
      }
      if (muntjes3 === 2) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(69, 105, 68);
        text("D", 715, 400);
      }
      if (muntjes3 === 1) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(2, 34, 97);
        text("E", 715, 400);
      }
      if (muntjes3 === 0) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(102, 78, 7);
        text("F", 715, 400);
      }
    } // toon de score aan van level 3

    // score level 4
    if (muntjes4 === 5 && tijd4 > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(15, 173, 12);
      text("A", 715, 400);
      hoogsteLevel = 5;
      
      // record tijd van level 4
      if (tijd4 > 0 && recordtijd4afgerond <= recordtijd4onafgerond) {
        recordtijd4onafgerond = 30 - tijd4;
      }

      image(img31, 340, 420, 170, 170);   // volgend level button
      // volgend level button
      if (mouseX > 340 && mouseX < 510 && mouseY > 420 && mouseY < 590) {
        if (mouseIsPressed === true) {
          spelStatus = SPELEN;
          level = hoogsteLevel;
          resetGlobalVariables();
          muntjes1 = 0;
          muntjes2 = 0;
          muntjes3 = 0;
          muntjes4 = 0;
        }
      }
    } // unlock volgende level
    if (level === 4) {
      if (muntjes4 === 4) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(219, 74, 48);
        text("B", 715, 400);
      }
      if (muntjes4 === 3) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(230, 130, 30);
        text("C", 715, 400);
      }
      if (muntjes4 === 2) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(69, 105, 68);
        text("D", 715, 400);
      }
      if (muntjes4 === 1) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(2, 34, 97);
        text("E", 715, 400);
      }
      if (muntjes4 === 0) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(102, 78, 7);
        text("F", 715, 400);
      }
    } // toon de score aan van level 4

    // score level 5
    if (muntjes5 === 5 && tijd5 > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(15, 173, 12);
      text("A", 715, 400);
      hoogsteLevel = 5;
      
      // record tijd van level 5
      if (tijd5 > 0 && recordtijd5afgerond <= recordtijd5onafgerond) {
        recordtijd5onafgerond = 30 - tijd5;
      }
    } // unlock volgende level
    if (level === 5) {
      if (muntjes5 === 4) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(219, 74, 48);
        text("B", 715, 400);
      }
      if (muntjes5 === 3) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(230, 130, 30);
        text("C", 715, 400);
      }
      if (muntjes5 === 2) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(69, 105, 68);
        text("D", 715, 400);
      }
      if (muntjes5 === 1) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(2, 34, 97);
        text("E", 715, 400);
      }
      if (muntjes5 === 0) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(102, 78, 7);
        text("F", 715, 400);
      }
    } // toon de score aan van level 5

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