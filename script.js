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
const LEVELSCHERM2 = 6;
const QUITSCHERM = 7;
const RETRYSCHERM = 8;
const PAUZEERSCHERM = 9;
const SHOPSCHERM = 10;
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
var muntjes6 = 0; // muntjes in level 6
var muntjes7 = 0; // muntjes in level 7
var muntjes8 = 0; // muntjes in level 8
var muntjes9 = 0; // muntjes in level 9
var muntjes10 = 0; // muntjes in level 10

// hp in de game
var health3 = 3; // hp voor levels met 3 hp
var health2 = 2; // hp voor levels met 2 hp
var health1 = 1; // hp voor levels met 1 hp

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
var recordtijd6onafgerond = 0;
let recordtijd6afgerond = 0; // afgeronde tijd met 3 decimalen
var recordtijd7onafgerond = 0;
let recordtijd7afgerond = 0; // afgeronde tijd met 3 decimalen
var recordtijd8onafgerond = 0;
let recordtijd8afgerond = 0; // afgeronde tijd met 3 decimalen
var recordtijd9onafgerond = 0;
let recordtijd9afgerond = 0; // afgeronde tijd met 3 decimalen
var recordtijd10onafgerond = 0;
let recordtijd10afgerond = 0; // afgeronde tijd met 3 decimalen

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
var vakjes6 = [
  [0, 0, 0, 0, 1, 0, 2, 1, 0, 1, 1, 0],
  [1, 1, 3, 0, 0, 0, 1, 0, 0, 0, 3, 0],
  [3, 2, 1, 0, 0, 0, 0, 3, 0, 0, 0, 1],
  [0, 1, 1, 0, 0, 3, 0, 0, 1, 3, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 2, 0, 0, 0],
  [3, 1, 0, 0, 0, 0, 0, 3, 1, 0, 1, 3],
  [0, 1, 2, 1, 3, 0, 1, 0, 0, 1, 0, 0],
  [1, 1, 0, 0, 0, 3, 0, 0, 0, 1, 2, 0]
];
var vakjes7 = [
  [0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 1, 2],
  [3, 0, 1, 2, 3, 0, 1, 0, 3, 0, 1, 0],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 3, 1, 0, 0, 0, 0, 0, 1, 2, 0],
  [0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 0, 0, 0, 0, 0, 1, 3, 0, 0],
  [0, 1, 3, 0, 0, 3, 1, 1, 0, 0, 1, 0],
  [3, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 3]
];
var vakjes8 = [
  [2, 1, 0, 0, 0, 1, 1, 0, 1, 0, 3, 0],
  [0, 1, 0, 3, 1, 2, 0, 3, 0, 0, 0, 1],
  [0, 3, 0, 0, 0, 1, 1, 1, 0, 0, 1, 3],
  [1, 0, 0, 3, 0, 0, 0, 0, 0, 1, 2, 0],
  [0, 0, 1, 0, 0, 3, 0, 0, 3, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 2, 0, 1, 0, 0, 1, 1, 1, 0, 0, 3],
  [0, 1, 0, 3, 0, 0, 0, 2, 3, 1, 0, 0]
];
var vakjes9 = [
  [3, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0],
  [1, 2, 1, 3, 0, 1, 0, 3, 0, 1, 0, 0],
  [0, 1, 0, 1, 1, 2, 1, 0, 0, 1, 2, 0],
  [0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 2, 1, 0, 3, 1, 0, 0],
  [0, 2, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0]
];
var vakjes10 = [
      [2, 3, 1, 3, 0, 0, 1, 0, 3, 0, 1, 2],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3],
      [1, 0, 1, 0, 1, 3, 0, 0, 1, 0, 1, 0],
      [1, 3, 1, 3, 1, 2, 0, 3, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 3, 1, 0],
      [1, 0, 1, 3, 1, 0, 1, 0, 1, 0, 1, 0],
      [2, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 2]
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
var img44;
var img45;
var img46;
var img47;
var img48;
var img49;
var img50;
var img51;
var img52;
var img53;
var img54;
var img55;
var img56;
var img57;
var img58;
var img59;
var img60;
var img61;
var img62;
var img63;

// tijd in de game
var tijd1 = 60; // tijd in level 1
var tijd2 = 50; // tijd in level 2
var tijd3 = 45; // tijd in level 3
var tijd4 = 30; // tijd in level 4
var tijd5 = 30; // tijd in level 5
var tijd6 = 45; // tijd in level 6
var tijd7 = 45; // tijd in level 7
var tijd8 = 45; // tijd in level 8
var tijd9 = 45; // tijd in level 9
var tijd10 = 45; // tijd in level 10

// levels
var level = 1;
var hoogsteLevel = 1;

var punten = 0;            // punten in de hele game (kan je gebruiken in de shop)
var muntenupgrade = 0;     // gaat 1 omhoog als een upgrade voor munten is gekocht in shop
var levelsupgrade = 0;     // gaat 1 omhoog als een upgrade voor levels is gekocht in shop
var vermenigvuldiging = 0; // gaat 1 omhoog als een upgrade voor vermenigvuldiging is gekocht in 
                           //  shop


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
  image(img27, 20, 200, 390, 350); // achtergrond
  textSize(60);
  fill('black');
  text("ᴍᴜɴᴛᴇɴ", 120, 250)
  textSize(30);
  fill('black');
  rect(70, 260, 150, 150);
  image(img8, 80, 270, 130, 130); // achtergrond van het muntje
  image(img43, 260, 300, 90, 90);  // plus button

  if (muntenupgrade === 0) {
    image(img41, 95, 285, 100, 100); // bronzen coin
    fill('yellow');
    text("Munten level 1", 60, 450);
    text("Upgrade kost: 15 punten", 60, 480);
    if (punten >= 15 && mouseX > 260 && mouseX < 350 && mouseY > 300 && mouseY < 390) {
      if (mouseIsPressed === true) {
        muntenupgrade = 1;
        punten = punten - 15;
      }
    }
  }
  if (muntenupgrade === 1) {
    image(img42, 95, 285, 100, 100); // zilveren coin
    fill('yellow');
    text("Munten level 2", 60, 450);
    text("Upgrade kost: 50 punten", 60, 480);
    if (punten >= 50 && mouseX > 260 && mouseX < 350 && mouseY > 300 && mouseY < 390) {
      if (mouseIsPressed === true) {
        muntenupgrade = 2;
        punten = punten - 50;
      }
    }
  }
  if (muntenupgrade === 2) {
    image(img3, 95, 285, 100, 100); // gouden coin
    fill('yellow');
    text("Munten level 3", 60, 450);
    text("Upgrade kost: MAX LEVEL", 60, 480);
  }


  // levels upgrade
  image(img27, 450, 200, 390, 350); // achtergrond
  textSize(60);
  fill('black');
  text("ʟᴇᴠᴇʟꜱ", 550, 250)
  textSize(30);
  fill('black');
  rect(500, 260, 150, 150);
  image(img8, 510, 270, 130, 130); // achtergrond klein vakje
  image(img52, 537, 300, 75, 75); // plus 1 image
  image(img43, 690, 300, 90, 90);  // plus button

  if (levelsupgrade === 0) {
    fill('yellow');
    text("Levelsupgrade level 1", 490, 450);
    text("Upgrade kost: 25 punten", 490, 480);
    if (punten >= 25 && mouseX > 690 && mouseX < 780 && mouseY > 300 && mouseY < 390) {
      if (mouseIsPressed === true) {
        levelsupgrade = 1;
        punten = punten - 25;
      }
    }
  }
  if (levelsupgrade === 1) {
    fill('yellow');
    text("Levelsupgrade level 2", 490, 450);
    text("Upgrade kost: 50 punten", 490, 480);
    if (punten >= 50 && mouseX > 690 && mouseX < 780 && mouseY > 300 && mouseY < 390) {
      if (mouseIsPressed === true) {
        levelsupgrade = 2;
        punten = punten - 50;
      }
    }
  }  // level 6 koopoptie
  if (levelsupgrade === 2) {
    fill('yellow');
    text("Levelsupgrade level 3", 490, 450);
    text("Upgrade kost: 100 punten", 490, 480);
    if (punten >= 100 && mouseX > 690 && mouseX < 780 && mouseY > 300 && mouseY < 390) {
      if (mouseIsPressed === true) {
        levelsupgrade = 3;
        punten = punten - 100;
      }
    }
  }  // level 7 koopoptie
  if (levelsupgrade === 3) {
    fill('yellow');
    text("Levelsupgrade level 4", 490, 450);
    text("Upgrade kost: 150 punten", 490, 480);
    if (punten >= 150 && mouseX > 690 && mouseX < 780 && mouseY > 300 && mouseY < 390) {
      if (mouseIsPressed === true) {
        levelsupgrade = 4;
        punten = punten - 150;
      }
    }
  }  // level 8 koopoptie
  if (levelsupgrade === 4) {
    fill('yellow');
    text("Levelsupgrade level 5", 490, 450);
    text("Upgrade kost: 200 punten", 490, 480);
    if (punten >= 200 && mouseX > 690 && mouseX < 780 && mouseY > 300 && mouseY < 390) {
      if (mouseIsPressed === true) {
        levelsupgrade = 5;
        punten = punten - 200;
      }
    }
  }  // level 9 koopoptie
  if (levelsupgrade === 5) {
    fill('yellow');
    text("Levelsupgrade level 6", 490, 450);
    text("Upgrade kost: MAX LEVEL", 490, 480);
  }  // level 10 koopoptie


  // multiplier upgrade
  image(img27, 880, 200, 390, 350); // achtergrond
  textSize(60);
  fill('black');
  text("ᴍᴜʟᴛɪᴘʟɪᴇʀ", 940, 250)
  textSize(30);
  fill('black');
  rect(930, 260, 150, 150);
  image(img8, 940, 270, 130, 130);  // achtergrond klein vakje
  image(img43, 1120, 300, 90, 90);  // plus button

  if (vermenigvuldiging === 0) {
    image(img51, 955, 285, 100, 100); // 1x multiplier
    fill('yellow');
    text("Multiplier level 1", 920, 450);
    text("Upgrade kost: 50 punten", 920, 480);
    if (punten >= 50 && mouseX > 1120 && mouseX < 1210 && mouseY > 300 && mouseY < 390) {
      if (mouseIsPressed === true) {
        vermenigvuldiging = 1;
        punten = punten - 50;
      }
    }
  }
  if (vermenigvuldiging === 1) {
    image(img49, 955, 285, 100, 100); // 1.5x multiplier
    fill('yellow');
    text("Multiplier level 2", 920, 450);
    text("Upgrade kost: 150 punten", 920, 480);
    if (punten >= 150 && mouseX > 1120 && mouseX < 1210 && mouseY > 300 && mouseY < 390) {
      if (mouseIsPressed === true) {
        vermenigvuldiging = 2;
        punten = punten - 150;
      }
    }
  }
  if (vermenigvuldiging === 2) {
    image(img50, 955, 285, 100, 100); // 2x multiplier
    fill('yellow');
    text("Multiplier level 3", 920, 450);
    text("Upgrade kost: MAX LEVEL", 920, 480);
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
  //achtergrond
  image(img8, 645, 365, 635, 355);
  image(img8, 0, 0, 635, 355);
  image(img9, 645, 0, 635, 355);
  image(img9, 0, 365, 635, 355);
  fill('black');
  rect(635, 0, 10, 720);  // lijnen die 4 vakken maken
  rect(0, 355, 1280, 10);
  // text bovenin
  rect(500, 0, 300, 100); // zwart hokje om text INFO
  textSize(100);
  fill("yellow");
  text("𝐼𝒩𝐹𝒪", 520, 80);

  // vakje linksboven
  image(img2, 100, 20, 155, 200);  // idlecharacter
  image(img44, 100, 240, 150, 100) // WASD image
  textSize(25);
  text("Gebruik WASD om te bewegen", 250, 200);

  // vakje linksonder
  image(img3, 290, 500, 150, 100)  // gouden muntje
  image(img41, 60, 500, 150, 100)  // bronzen muntje
  image(img42, 175, 500, 150, 100) // zilveren muntje
  image(img5, 450, 450, 155, 200);  // idlecharacter
  textSize(20);
  text("Pak de muntjes om punten te krijgen en het level te voltooien", 65, 425);
  if (vermenigvuldiging === 0) {
    text("1", 127, 520); // aantal punten per bronze muntje
    text("2", 242, 520); // aantal punten per zilvere muntje
    text("4", 357, 520); // aantal punten per goude muntje
  }
  if (vermenigvuldiging === 1) {
    text("1.5", 127, 520); // aantal punten per bronze muntje
    text("3", 242, 520); // aantal punten per zilvere muntje
    text("6", 357, 520); // aantal punten per goude muntje
  }
  if (vermenigvuldiging === 2) {
    text("2", 127, 520); // aantal punten per bronze muntje
    text("4", 242, 520); // aantal punten per zilvere muntje
    text("8", 357, 520); // aantal punten per goude muntje
  }

  // vakje rechtsboven
  image(img10, 1100, 140, 120, 120); // lava image
  image(img2, 700, 120, 105, 150);   // idlecharacter
  image(img46, 840, 150, 200, 100);  // pijltje naar rechts
  image(img48, 880, 140, 120, 120);  // kruisje door het pijltje
  textSize(40);
  text("Vermijd de lava", 850, 330);

  // vakje rechtsonder
  image(img40, 680, 450, 100, 100);  // shop button
  image(img45, 730, 500, 40, 50);    // mouse cursor
  image(img46, 830, 450, 200, 100);  // pijltje naar rechts
  image(img47, 1055, 400, 200, 200); // shop voorbeeld
  textSize(30);
  text("Gebruik je punten in de shop", 700, 650);
  // button om terug te gaan naar het spel
  image(img19, 50, 600, 100, 100);

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
  image(img8, 645, 365, 635, 355);
  image(img8, 0, 0, 635, 355);
  image(img9, 645, 0, 635, 355);
  image(img9, 0, 365, 635, 355);
  fill('black');
  rect(635, 0, 10, 720);  // lijnen die 4 vakken maken
  rect(0, 355, 1280, 10);
  // text bovenin
  rect(500, 0, 300, 100); // zwart hokje om text INFO
  textSize(100);
  fill("yellow");
  text("𝐼𝒩𝐹𝒪", 520, 80);

  // vakje linksboven
  image(img2, 100, 20, 155, 200);  // idlecharacter
  image(img44, 100, 240, 150, 100) // WASD image
  textSize(25);
  text("Gebruik WASD om te bewegen", 250, 200);

  // vakje linksonder
  image(img3, 290, 500, 150, 100)  // gouden muntje
  image(img41, 60, 500, 150, 100)  // bronzen muntje
  image(img42, 175, 500, 150, 100) // zilveren muntje
  image(img5, 450, 450, 155, 200);  // idlecharacter
  textSize(20);
  text("Pak de muntjes om punten te krijgen en het level te voltooien", 65, 425);
  if (vermenigvuldiging === 0) {
    text("1", 127, 520); // aantal punten per bronze muntje
    text("2", 242, 520); // aantal punten per zilvere muntje
    text("4", 357, 520); // aantal punten per goude muntje
  }
  if (vermenigvuldiging === 1) {
    text("1.5", 127, 520); // aantal punten per bronze muntje
    text("3", 242, 520); // aantal punten per zilvere muntje
    text("6", 357, 520); // aantal punten per goude muntje
  }
  if (vermenigvuldiging === 2) {
    text("2", 127, 520); // aantal punten per bronze muntje
    text("4", 242, 520); // aantal punten per zilvere muntje
    text("8", 357, 520); // aantal punten per goude muntje
  }

  // vakje rechtsboven
  image(img10, 1100, 140, 120, 120); // lava image
  image(img2, 700, 120, 105, 150);   // idlecharacter
  image(img46, 840, 150, 200, 100);  // pijltje naar rechts
  image(img48, 880, 140, 120, 120);  // kruisje door het pijltje
  textSize(40);
  text("Vermijd de lava", 850, 330);

  // vakje rechtsonder
  image(img40, 680, 450, 100, 100);  // shop button
  image(img45, 730, 500, 40, 50);    // mouse cursor
  image(img46, 830, 450, 200, 100);  // pijltje naar rechts
  image(img47, 1055, 400, 200, 200); // shop voorbeeld
  textSize(30);
  text("Gebruik je punten in de shop", 700, 650);
  // button om terug te gaan naar het spel
  image(img19, 50, 600, 100, 100);


  if (mouseX > 50 && mouseX < 150 && mouseY > 600 && mouseY < 700) {
    if (mouseIsPressed === true) {
      spelStatus = SPELEN;
    }
  }
};

/** 
 * Level schermen 1 en 2 voor de game
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
  // button om naar level scherm 2 te gaan
  image(img53, 1140, 600, 100, 100);

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
    image(img32, 492, 150, 252, 184); // achtergrond
    image(img14, 588, 212, 80, 80);   // play button
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
    image(img33, 492, 150, 252, 184); // achtergrond
    image(img28, 503, 150, 230, 200); // lock
    textSize(30);
    text("Haal eerst level 1", 502, 360);
  }

  // level 3
  if (hoogsteLevel >= 3) {
    fill("yellow");
    image(img34, 864, 150, 252, 184); // achtergrond
    image(img14, 960, 212, 80, 80);   // play button
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
    image(img35, 864, 150, 252, 184); // achtergrond
    image(img28, 875, 150, 230, 200); // lock
    text("Haal eerst level 2", 874, 360);
  }

  // level 4
  if (hoogsteLevel >= 4) {
    fill("yellow");
    image(img36, 346, 400, 252, 184); // achtergrond
    image(img14, 440, 462, 80, 80);   // play button
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
    image(img37, 346, 400, 252, 184); // achtergrond
    image(img28, 357, 400, 230, 200); // lock
    text("Haal eerst level 3", 356, 610);
  }

  // level 5
  if (hoogsteLevel >= 5) {
    fill("yellow");
    image(img38, 682, 400, 252, 184); // achtergrond
    image(img14, 778, 462, 80, 80);   // play button
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
    image(img39, 682, 400, 252, 184); // achtergrond
    image(img28, 693, 400, 230, 200); // lock
    text("Haal eerst level 4", 692, 610);
  }


  // ga naar main menu als je op pijltje terug klikt
  if (mouseX > 40 && mouseX < 140 && mouseY > 600 && mouseY < 700) {
    if (mouseIsPressed === true) {
      spelStatus = MAINMENU;
    }
  }
  // ga naar level scherm 2 als je op pijltje terug klikt
  if (mouseX > 1140 && mouseX < 1240 && mouseY > 600 && mouseY < 700) {
    if (mouseIsPressed === true) {
      spelStatus = LEVELSCHERM2;
    }
  }
};

var levelScherm2 = function() {
  // achtergrond
  image(img16, 0, 0, 1280, 720);

  // text bovenin
  textSize(100);
  fill("yellow");
  text("𝐿𝐸𝒱𝐸𝐿𝒮", 460, 80)

  // button om terug te gaan naar de eerste pagina
  image(img19, 590, 600, 100, 100);
  // ga naar level scherm 1 als je op pijltje terug klikt
  if (mouseX > 590 && mouseX < 690 && mouseY > 600 && mouseY < 700) {
    if (mouseIsPressed === true) {
      spelStatus = LEVELSCHERM;
    }
  }

  // level 6
  if (levelsupgrade >= 1) {
    textSize(30);
    fill("yellow");
    image(img54, 120, 150, 252, 184); // achtergrond
    image(img14, 216, 212, 80, 80);   // play button
    text("Level 6", 200, 360);

    textSize(20);
    recordtijd6afgerond = recordtijd6onafgerond.toFixed(3); // afgeronde tijd met 3 decimalen
    text("Snelste tijd: " + recordtijd6afgerond + "s", 160, 180);
    textSize(30);

    // ga level 6 spelen als je op play button klikt
    if (mouseX > 216 && mouseX < 296 && mouseY > 212 && mouseY < 292 && levelsupgrade >= 1) {
      if (mouseIsPressed === true) {
        spelStatus = SPELEN;
        level = 6;
        resetGlobalVariables();
      }
    }
  }
  else {
    fill("white");
    image(img55, 120, 150, 252, 184); // achtergrond
    image(img28, 131, 150, 230, 200); // lock
    textSize(20);
    text("Koop eerst levels upgrade 1", 130, 360);
  }

  // level 7
  if (levelsupgrade >= 2) {
    textSize(30);
    fill("yellow");
    image(img56, 492, 150, 252, 184); // achtergrond
    image(img14, 588, 212, 80, 80);   // play button
    text("Level 7", 572, 360);

    textSize(20);
    recordtijd7afgerond = recordtijd7onafgerond.toFixed(3); // afgeronde tijd met 3 decimalen
    text("Snelste tijd: " + recordtijd7afgerond + "s", 532, 180);
    textSize(30);

    // ga level 7 spelen als je op play button klikt
    if (mouseX > 588 && mouseX < 668 && mouseY > 212 && mouseY < 292 && levelsupgrade >= 2) {
      if (mouseIsPressed === true) {
        spelStatus = SPELEN;
        level = 7;
        resetGlobalVariables();
      }
    }
  }
  else {
    fill("white");
    image(img57, 492, 150, 252, 184); // achtergrond
    image(img28, 503, 150, 230, 200); // lock
    textSize(20);
    text("Koop eerst levels upgrade 2", 502, 360);
  }

  // level 8
  if (levelsupgrade >= 3) {
    textSize(30);
    fill("yellow");
    image(img58, 864, 150, 252, 184); // achtergrond
    image(img14, 960, 212, 80, 80);   // play button
    text("Level 8", 944, 360);

    textSize(20);
    recordtijd8afgerond = recordtijd8onafgerond.toFixed(3); // afgeronde tijd met 3 decimalen
    text("Snelste tijd: " + recordtijd8afgerond + "s", 904, 180);
    textSize(30);

    // ga level 8 spelen als je op play button klikt
    if (mouseX > 960 && mouseX < 1040 && mouseY > 212 && mouseY < 292 && levelsupgrade >= 3) {
      if (mouseIsPressed === true) {
        spelStatus = SPELEN;
        level = 8;
        resetGlobalVariables();
      }
    }
  }
  else {
    fill("white");
    image(img59, 864, 150, 252, 184); // achtergrond
    image(img28, 875, 150, 230, 200); // lock
    textSize(20);
    text("Koop eerst levels upgrade 3", 874, 360);
  }

  // level 9
  if (levelsupgrade >= 4) {
    textSize(30);
    fill("yellow");
    image(img60, 346, 400, 252, 184); // achtergrond
    image(img14, 440, 462, 80, 80);   // play button
    text("Level 9", 426, 610);

    textSize(20);
    recordtijd9afgerond = recordtijd9onafgerond.toFixed(3); // afgeronde tijd met 3 decimalen
    text("Snelste tijd: " + recordtijd9afgerond + "s", 386, 430);
    textSize(30);

    // ga level 9 spelen als je op play button klikt
    if (mouseX > 426 && mouseX < 506 && mouseY > 462 && mouseY < 542 && levelsupgrade >= 4) {
      if (mouseIsPressed === true) {
        spelStatus = SPELEN;
        level = 9;
        resetGlobalVariables();
      }
    }
  }
  else {
    fill("white");
    image(img61, 346, 400, 252, 184); // achtergrond
    image(img28, 357, 400, 230, 200); // lock
    textSize(20);
    text("Koop eerst levels upgrade 4", 356, 610);
  }

  // level 10
  if (levelsupgrade >= 5) {
    textSize(30);
    fill("yellow");
    image(img62, 682, 400, 252, 184); // achtergrond
    image(img14, 778, 462, 80, 80);   // play button
    text("Level 10", 762, 610);

    textSize(20);
    recordtijd10afgerond = recordtijd10onafgerond.toFixed(3); // afgeronde tijd met 3 decimalen
    text("Snelste tijd: " + recordtijd10afgerond + "s", 722, 430);
    textSize(30);

    // ga level 10 spelen als je op play button klikt
    if (mouseX > 778 && mouseX < 858 && mouseY > 462 && mouseY < 542 && levelsupgrade >= 5) {
      if (mouseIsPressed === true) {
        spelStatus = SPELEN;
        level = 10;
        resetGlobalVariables();
      }
    }
  }
  else {
    fill("white");
    image(img63, 682, 400, 252, 184); // achtergrond
    image(img28, 693, 400, 230, 200); // lock
    textSize(20);
    text("Koop eerst levels upgrade 5", 692, 610);
  }

}
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
  if (level === 6) {
    tijd6 = tijd6 - 0.012375;
  } // tijd van level 6 gaat lopen als level 6 aan staat
  if (level === 7) {
    tijd7 = tijd7 - 0.012375;
  } // tijd van level 7 gaat lopen als level 7 aan staat
  if (level === 8) {
    tijd8 = tijd8 - 0.012375;
  } // tijd van level 8 gaat lopen als level 8 aan staat
  if (level === 9) {
    tijd9 = tijd9 - 0.012375;
  } // tijd van level 9 gaat lopen als level 9 aan staat
  if (level === 10) {
    tijd10 = tijd10 - 0.012375;
  } // tijd van level 10 gaat lopen als level 10 aan staat

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
      health3 = health3 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes1[j][i] === 2) {
      muntjes1 = muntjes1 + 1;
      vakjes1[j][i] = 0;
      if (muntenupgrade === 0) {
        if (vermenigvuldiging === 0 || vermenigvuldiging === 1) {
          punten = punten + 1;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 2;
        }
      }

      if (muntenupgrade === 1) {
        if (vermenigvuldiging === 0) {
          punten = punten + 2;
        }
        if (vermenigvuldiging === 1) {
          punten = punten + 3;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 4;
        }
      }
      if (muntenupgrade === 2) {
        if (vermenigvuldiging === 0) {
          punten = punten + 4;
        }
        if (vermenigvuldiging === 1) {
          punten = punten + 6;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 8;
        }
      }
    }
  }; // botsingen voor level 1
  if (level === 2) {
    // botsing speler met lava
    if (vakjes2[j][i] === 1) {
      health3 = health3 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes2[j][i] === 2) {
      muntjes2 = muntjes2 + 1;
      vakjes2[j][i] = 0;
      if (muntenupgrade === 0) {
        punten = punten + 1;
      }
      if (muntenupgrade === 1) {
        punten = punten + 2;
      }
      if (muntenupgrade === 2) {
        punten = punten + 4;
      }
    }
  }; // botsingen voor level 2
  if (level === 3) {
    // botsing speler met lava
    if (vakjes3[j][i] === 1) {
      health2 = health2 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes3[j][i] === 2) {
      muntjes3 = muntjes3 + 1;
      vakjes3[j][i] = 0;
      if (muntenupgrade === 0) {
        punten = punten + 1;
      }
      if (muntenupgrade === 1) {
        punten = punten + 2;
      }
      if (muntenupgrade === 2) {
        punten = punten + 4;
      }
    }
  }; // botsingen voor level 3
  if (level === 4) {
    // botsing speler met lava
    if (vakjes4[j][i] === 1) {
      health2 = health2 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes4[j][i] === 2) {
      muntjes4 = muntjes4 + 1;
      vakjes4[j][i] = 0;
      if (muntenupgrade === 0) {
        punten = punten + 1;
      }
      if (muntenupgrade === 1) {
        punten = punten + 2;
      }
      if (muntenupgrade === 2) {
        punten = punten + 4;
      }
    }
  }; // botsingen voor level 4
  if (level === 5) {
    // botsing speler met lava
    if (vakjes5[j][i] === 1) {
      health1 = health1 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes5[j][i] === 2) {
      muntjes5 = muntjes5 + 1;
      vakjes5[j][i] = 0;
      if (muntenupgrade === 0) {
        punten = punten + 1;
      }
      if (muntenupgrade === 1) {
        punten = punten + 2;
      }
      if (muntenupgrade === 2) {
        punten = punten + 4;
      }
    }
  }; // botsingen voor level 5
  if (level === 6) {
    // botsing speler met lava
    if (vakjes6[j][i] === 1) {
      health3 = health3 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes6[j][i] === 2) {
      muntjes6 = muntjes6 + 1;
      vakjes6[j][i] = 0;
      if (muntenupgrade === 0) {
        punten = punten + 1;
      }
      if (muntenupgrade === 1) {
        punten = punten + 2;
      }
      if (muntenupgrade === 2) {
        punten = punten + 4;
      }
    }
  }; // botsingen voor level 6
  if (level === 7) {
    // botsing speler met lava
    if (vakjes7[j][i] === 1) {
      health3 = health3 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes7[j][i] === 2) {
      muntjes7 = muntjes7 + 1;
      vakjes7[j][i] = 0;
      if (muntenupgrade === 0) {
        if (vermenigvuldiging === 0 || vermenigvuldiging === 1) {
          punten = punten + 1;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 2;
        }
      }
      if (muntenupgrade === 1) {
        if (vermenigvuldiging === 0) {
          punten = punten + 2;
        }
        if (vermenigvuldiging === 1) {
          punten = punten + 3;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 4;
        }
      }
      if (muntenupgrade === 2) {
        if (vermenigvuldiging === 0) {
          punten = punten + 4;
        }
        if (vermenigvuldiging === 1) {
          punten = punten + 6;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 8;
        }
      }
    }
  }; // botsingen voor level 7
  if (level === 8) {
    // botsing speler met lava
    if (vakjes8[j][i] === 1) {
      health3 = health3 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes8[j][i] === 2) {
      muntjes8 = muntjes8 + 1;
      vakjes8[j][i] = 0;
      if (muntenupgrade === 0) {
        if (vermenigvuldiging === 0 || vermenigvuldiging === 1) {
          punten = punten + 1;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 2;
        }
      }
      if (muntenupgrade === 1) {
        if (vermenigvuldiging === 0) {
          punten = punten + 2;
        }
        if (vermenigvuldiging === 1) {
          punten = punten + 3;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 4;
        }
      }
      if (muntenupgrade === 2) {
        if (vermenigvuldiging === 0) {
          punten = punten + 4;
        }
        if (vermenigvuldiging === 1) {
          punten = punten + 6;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 8;
        }
      }
    }
  }; // botsingen voor level 8
  if (level === 9) {
    // botsing speler met lava
    if (vakjes9[j][i] === 1) {
      health3 = health3 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes9[j][i] === 2) {
      muntjes9 = muntjes9 + 1;
      vakjes9[j][i] = 0;
      if (muntenupgrade === 0) {
        if (vermenigvuldiging === 0 || vermenigvuldiging === 1) {
          punten = punten + 1;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 2;
        }
      }
      if (muntenupgrade === 1) {
        if (vermenigvuldiging === 0) {
          punten = punten + 2;
        }
        if (vermenigvuldiging === 1) {
          punten = punten + 3;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 4;
        }
      }
      if (muntenupgrade === 2) {
        if (vermenigvuldiging === 0) {
          punten = punten + 4;
        }
        if (vermenigvuldiging === 1) {
          punten = punten + 6;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 8;
        }
      }
    }
  }; // botsingen voor level 9
  if (level === 10) {
    // botsing speler met lava
    if (vakjes10[j][i] === 1) {
      health3 = health3 - 1;
      spelerX = 500;
      spelerY = 355;
    }
    // speler op muntje
    if (vakjes10[j][i] === 2) {
      muntjes10 = muntjes10 + 1;
      vakjes10[j][i] = 0;
      if (muntenupgrade === 0) {
        if (vermenigvuldiging === 0 || vermenigvuldiging === 1) {
          punten = punten + 1;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 2;
        }
      }
      if (muntenupgrade === 1) {
        if (vermenigvuldiging === 0) {
          punten = punten + 2;
        }
        if (vermenigvuldiging === 1) {
          punten = punten + 3;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 4;
        }
      }
      if (muntenupgrade === 2) {
        if (vermenigvuldiging === 0) {
          punten = punten + 4;
        }
        if (vermenigvuldiging === 1) {
          punten = punten + 6;
        }
        if (vermenigvuldiging === 2) {
          punten = punten + 8;
        }
      }
    }
  }; // botsingen voor level 10
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
          if (muntenupgrade === 0) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if (muntenupgrade === 1) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if (muntenupgrade === 2) {
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
          if (muntenupgrade === 0) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if (muntenupgrade === 1) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if (muntenupgrade === 2) {
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
          if (muntenupgrade === 0) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if (muntenupgrade === 1) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if (muntenupgrade === 2) {
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
          if (muntenupgrade === 0) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if (muntenupgrade === 1) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if (muntenupgrade === 2) {
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
          if (muntenupgrade === 0) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if (muntenupgrade === 1) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if (muntenupgrade === 2) {
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
  if (level === 6) {
    for (var j = 0; j < vakjes6[0].length; j++) {
      for (var i = 0; i < vakjes6.length; i++) {
        // vakje (grijs)
        if (vakjes6[i][j] === 0) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // lava
        if (vakjes6[i][j] === 1) {
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img10, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // muntjes
        if (vakjes6[i][j] === 2) {
          if (muntenupgrade === 0) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if (muntenupgrade === 1) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if (muntenupgrade === 2) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img3, j * 80 + 25, i * 80 + 25, 80, 80); // gouden coin
          }
        }
        // ander gekleurd vakje
        if (vakjes6[i][j] === 3) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img9, j * 80 + 25, i * 80 + 30, 80, 80);
        }
      }
    }
  }  // vakjes tekenen voor level 6
  if (level === 7) {
    for (var j = 0; j < vakjes7[0].length; j++) {
      for (var i = 0; i < vakjes7.length; i++) {
        // vakje (grijs)
        if (vakjes7[i][j] === 0) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // lava
        if (vakjes7[i][j] === 1) {
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img10, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // muntjes
        if (vakjes7[i][j] === 2) {
          if (muntenupgrade === 0) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if (muntenupgrade === 1) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if (muntenupgrade === 2) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img3, j * 80 + 25, i * 80 + 25, 80, 80); // gouden coin
          }
        }
        // ander gekleurd vakje
        if (vakjes7[i][j] === 3) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img9, j * 80 + 25, i * 80 + 30, 80, 80);
        }
      }
    }
  }  // vakjes tekenen voor level 7
  if (level === 8) {
    for (var j = 0; j < vakjes8[0].length; j++) {
      for (var i = 0; i < vakjes8.length; i++) {
        // vakje (grijs)
        if (vakjes8[i][j] === 0) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // lava
        if (vakjes8[i][j] === 1) {
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img10, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // muntjes
        if (vakjes8[i][j] === 2) {
          if (muntenupgrade === 0) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if (muntenupgrade === 1) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if (muntenupgrade === 2) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img3, j * 80 + 25, i * 80 + 25, 80, 80); // gouden coin
          }
        }
        // ander gekleurd vakje
        if (vakjes8[i][j] === 3) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img9, j * 80 + 25, i * 80 + 30, 80, 80);
        }
      }
    }
  }  // vakjes tekenen voor level 8
  if (level === 9) {
    for (var j = 0; j < vakjes9[0].length; j++) {
      for (var i = 0; i < vakjes9.length; i++) {
        // vakje (grijs)
        if (vakjes9[i][j] === 0) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // lava
        if (vakjes9[i][j] === 1) {
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img10, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // muntjes
        if (vakjes9[i][j] === 2) {
          if (muntenupgrade === 0) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if (muntenupgrade === 1) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if (muntenupgrade === 2) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img3, j * 80 + 25, i * 80 + 25, 80, 80); // gouden coin
          }
        }
        // ander gekleurd vakje
        if (vakjes9[i][j] === 3) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img9, j * 80 + 25, i * 80 + 30, 80, 80);
        }
      }
    }
  }  // vakjes tekenen voor level 9
  if (level === 10) {
    for (var j = 0; j < vakjes10[0].length; j++) {
      for (var i = 0; i < vakjes10.length; i++) {
        // vakje (grijs)
        if (vakjes10[i][j] === 0) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // lava
        if (vakjes10[i][j] === 1) {
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img10, j * 80 + 25, i * 80 + 30, 80, 80);
        }
        // muntjes
        if (vakjes10[i][j] === 2) {
          if (muntenupgrade === 0) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img41, j * 80 + 25, i * 80 + 25, 80, 80); // bronzen coin
          }
          if (muntenupgrade === 1) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img42, j * 80 + 25, i * 80 + 25, 80, 80); // zilveren coin
          }
          if (muntenupgrade === 2) {
            image(img8, j * 80 + 25, i * 80 + 30, 80, 80);
            image(img3, j * 80 + 25, i * 80 + 25, 80, 80); // gouden coin
          }
        }
        // ander gekleurd vakje
        if (vakjes10[i][j] === 3) {
          fill(233, 233, 233);
          rect(j * 80 + 25, i * 80 + 30, 80, 80);
          image(img9, j * 80 + 25, i * 80 + 30, 80, 80);
        }
      }
    }
  }  // vakjes tekenen voor level 10

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
    text("Levens:  " + health3 + "/3", 1070, 200);
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
    text("Levens:  " + health3 + "/3", 1070, 200);
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
    text("Levens:  " + health2 + "/2", 1070, 200);
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
    text("Levens:  " + health2 + "/2", 1070, 200);
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
    text("Levens:  " + health1 + "/1", 1070, 200);
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
  if (level === 6) {
    textSize(40);
    fill("yellow");
    text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
    textSize(30);
    text("Level:  " + level, 1070, 160);
    text("Levens:  " + health3 + "/3", 1070, 200);
    text("Muntjes:  " + muntjes6 + "/5", 1070, 240);
    text("Tijd:  " + floor(tijd6) + "s", 1070, 280);
    text("Punten: " + punten, 1070, 700);
    textSize(35);
    fill("black");
    image(img11, 1120, 330, 70, 70); // info button
    image(img12, 1120, 430, 70, 70); // retry button 
    image(img15, 1120, 530, 70, 70); // quit button
    rect(1010, 0, 10, 720);
  } // scoreboard van level 6
  if (level === 7) {
    textSize(40);
    fill("yellow");
    text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
    textSize(30);
    text("Level:  " + level, 1070, 160);
    text("Levens:  " + health3 + "/3", 1070, 200);
    text("Muntjes:  " + muntjes7 + "/5", 1070, 240);
    text("Tijd:  " + floor(tijd7) + "s", 1070, 280);
    text("Punten: " + punten, 1070, 700);
    textSize(35);
    fill("black");
    image(img11, 1120, 330, 70, 70); // info button
    image(img12, 1120, 430, 70, 70); // retry button 
    image(img15, 1120, 530, 70, 70); // quit button
    rect(1010, 0, 10, 720);
  } // scoreboard van level 7
  if (level === 8) {
    textSize(40);
    fill("yellow");
    text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
    textSize(30);
    text("Level:  " + level, 1070, 160);
    text("Levens:  " + health3 + "/3", 1070, 200);
    text("Muntjes:  " + muntjes8 + "/5", 1070, 240);
    text("Tijd:  " + floor(tijd8) + "s", 1070, 280);
    text("Punten: " + punten, 1070, 700);
    textSize(35);
    fill("black");
    image(img11, 1120, 330, 70, 70); // info button
    image(img12, 1120, 430, 70, 70); // retry button 
    image(img15, 1120, 530, 70, 70); // quit button
    rect(1010, 0, 10, 720);
  } // scoreboard van level 8
  if (level === 9) {
    textSize(40);
    fill("yellow");
    text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
    textSize(30);
    text("Level:  " + level, 1070, 160);
    text("Levens:  " + health3 + "/3", 1070, 200);
    text("Muntjes:  " + muntjes9 + "/5", 1070, 240);
    text("Tijd:  " + floor(tijd9) + "s", 1070, 280);
    text("Punten: " + punten, 1070, 700);
    textSize(35);
    fill("black");
    image(img11, 1120, 330, 70, 70); // info button
    image(img12, 1120, 430, 70, 70); // retry button 
    image(img15, 1120, 530, 70, 70); // quit button
    rect(1010, 0, 10, 720);
  } // scoreboard van level 9
  if (level === 10) {
    textSize(40);
    fill("yellow");
    text("𝙎𝙘𝙤𝙧𝙚𝙗𝙤𝙖𝙧𝙙", 1050, 90);
    textSize(30);
    text("Level:  " + level, 1070, 160);
    text("Levens:  " + health3 + "/3", 1070, 200);
    text("Muntjes:  " + muntjes10 + "/5", 1070, 240);
    text("Tijd:  " + floor(tijd10) + "s", 1070, 280);
    text("Punten: " + punten, 1070, 700);
    textSize(35);
    fill("black");
    image(img11, 1120, 330, 70, 70); // info button
    image(img12, 1120, 430, 70, 70); // retry button 
    image(img15, 1120, 530, 70, 70); // quit button
    rect(1010, 0, 10, 720);
  } // scoreboard van level 10

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
  if (health3 === 0 || health2 === 0 || health1 === 0) {
    return true;
  }
  if (muntjes1 === 5 || muntjes2 === 5 || muntjes3 === 5 || muntjes4 === 5 || muntjes5 === 5 || muntjes6 === 5 || muntjes7 === 5 || muntjes8 === 5 || muntjes9 === 5 || muntjes10 === 5) {
    return true;
  }
  if (tijd1 <= 0 || tijd2 <= 0 || tijd3 <= 0 || tijd4 <= 0 || tijd5 <= 0 || tijd6 <= 0 || tijd7 <= 0 || tijd8 <= 0 || tijd9 <= 0 || tijd10 <= 0) {
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
    health3 = 3;
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
    health3 = 3;
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
    health2 = 2;
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
    health2 = 2;
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
    health1 = 1;
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
  if (level === 6) {
    muntjes6 = 0;
    health3 = 3;
    tijd6 = 45;
    spelerRichting = RIGHT;
    spelerBeweging = false;
    spelerX = 500;
    spelerY = 355;
    vakjes6 = [
      [0, 0, 0, 0, 1, 0, 2, 1, 0, 1, 1, 0],
      [1, 1, 3, 0, 0, 0, 1, 0, 0, 0, 3, 0],
      [3, 2, 1, 0, 0, 0, 0, 3, 0, 0, 0, 1],
      [0, 1, 1, 0, 0, 3, 0, 0, 1, 3, 0, 0],
      [0, 0, 0, 3, 0, 0, 0, 0, 2, 0, 0, 0],
      [3, 1, 0, 0, 0, 0, 0, 3, 1, 0, 1, 3],
      [0, 1, 2, 1, 3, 0, 1, 0, 0, 1, 0, 0],
      [1, 1, 0, 0, 0, 3, 0, 0, 0, 1, 2, 0]
    ];
  } // reset alles voor level 6
  if (level === 7) {
    muntjes7 = 0;
    health3 = 3;
    tijd7 = 45;
    spelerRichting = RIGHT;
    spelerBeweging = false;
    spelerX = 500;
    spelerY = 355;
    vakjes7 = [
      [0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 1, 2],
      [3, 0, 1, 2, 3, 0, 1, 0, 3, 0, 1, 0],
      [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 0, 3, 1, 0, 0, 0, 0, 0, 1, 2, 0],
      [0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 0, 0, 0, 0, 0, 1, 3, 0, 0],
      [0, 1, 3, 0, 0, 3, 1, 1, 0, 0, 1, 0],
      [3, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 3]
    ];
  } // reset alles voor level 7
  if (level === 8) {
    muntjes8 = 0;
    health3 = 3;
    tijd8 = 45;
    spelerRichting = RIGHT;
    spelerBeweging = false;
    spelerX = 500;
    spelerY = 355;
    vakjes8 = [
      [2, 1, 0, 0, 0, 1, 1, 0, 1, 0, 3, 0],
      [0, 1, 0, 3, 1, 2, 0, 3, 0, 0, 0, 1],
      [0, 3, 0, 0, 0, 1, 1, 1, 0, 0, 1, 3],
      [1, 0, 0, 3, 0, 0, 0, 0, 0, 1, 2, 0],
      [0, 0, 1, 0, 0, 3, 0, 0, 3, 1, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 2, 0, 1, 0, 0, 1, 1, 1, 0, 0, 3],
      [0, 1, 0, 3, 0, 0, 0, 2, 3, 1, 0, 0]
    ];
  } // reset alles voor level 8
  if (level === 9) {
    muntjes9 = 0;
    health3 = 3;
    tijd9 = 45;
    spelerRichting = RIGHT;
    spelerBeweging = false;
    spelerX = 500;
    spelerY = 355;
    vakjes9 = [
      [3, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0],
      [1, 2, 1, 3, 0, 1, 0, 3, 0, 1, 0, 0],
      [0, 1, 0, 1, 1, 2, 1, 0, 0, 1, 2, 0],
      [0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
      [0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 1, 2, 1, 0, 3, 1, 0, 0],
      [0, 2, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0]
    ];
  } // reset alles voor level 9
  if (level === 10) {
    muntjes10 = 0;
    health3 = 3;
    tijd10 = 45;
    spelerRichting = RIGHT;
    spelerBeweging = false;
    spelerX = 500;
    spelerY = 355;
    vakjes10 = [
      [2, 3, 1, 3, 0, 0, 1, 0, 3, 0, 1, 2],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3],
      [1, 0, 1, 0, 1, 3, 0, 0, 1, 0, 1, 0],
      [1, 3, 1, 3, 1, 2, 0, 3, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 3, 1, 0],
      [1, 0, 1, 3, 1, 0, 1, 0, 1, 0, 1, 0],
      [2, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 2]
    ];
  } // reset alles voor level 10
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
  img44 = loadImage('afbeeldingen/WASD.png');
  img45 = loadImage('afbeeldingen/mousecursor.png');
  img46 = loadImage('afbeeldingen/arrowright.png');
  img47 = loadImage('afbeeldingen/shopvoorbeeld.png');
  img48 = loadImage('afbeeldingen/kruis.png');
  img49 = loadImage('afbeeldingen/multiplier1.5.png');
  img50 = loadImage('afbeeldingen/multiplier2.png');
  img51 = loadImage('afbeeldingen/multiplier1.png');
  img52 = loadImage('afbeeldingen/plus1.png');
  img53 = loadImage('afbeeldingen/returnbutton2.png');
  img54 = loadImage('afbeeldingen/level6normaal.png');
  img55 = loadImage('afbeeldingen/level6zwartenwit.png');
  img56 = loadImage('afbeeldingen/level7normaal.png');
  img57 = loadImage('afbeeldingen/level7zwartenwit.png');
  img58 = loadImage('afbeeldingen/level8normaal.png');
  img59 = loadImage('afbeeldingen/level8zwartenwit.png');
  img60 = loadImage('afbeeldingen/level9normaal.png');
  img61 = loadImage('afbeeldingen/level9zwartenwit.png');
  img62 = loadImage('afbeeldingen/level10normaal.png');
  img63 = loadImage('afbeeldingen/level10zwartenwit.png');
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
  if (spelStatus === LEVELSCHERM2) {
    levelScherm2();
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
      if (level >= hoogsteLevel) {
        hoogsteLevel = 2;
      }

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
      if (level >= hoogsteLevel) {
        hoogsteLevel = 3;
      }

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
      if (level >= hoogsteLevel) {
        hoogsteLevel = 4;
      }

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
      if (level >= hoogsteLevel) {
        hoogsteLevel = 5;
      }

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
      if (levelsupgrade === 1 && level >= hoogsteLevel) {
        hoogsteLevel = 6;

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
            muntjes5 = 0;
          }
        }
      }
      else {
        hoogsteLevel = 5;
      }

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

    // score level 6
    if (muntjes6 === 5 && tijd6 > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(15, 173, 12);
      text("A", 715, 400);
      if (levelsupgrade === 2 && level >= hoogsteLevel) {

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
            muntjes5 = 0;
            muntjes6 = 0;
          }
        }
      }
      else {
        hoogsteLevel = 5;
      }

      // record tijd van level 6
      if (tijd6 > 0 && recordtijd6afgerond <= recordtijd6onafgerond) {
        recordtijd6onafgerond = 45 - tijd6;
      }
    } // unlock volgende level
    if (level === 6) {
      if (muntjes6 === 4) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(219, 74, 48);
        text("B", 715, 400);
      }
      if (muntjes6 === 3) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(230, 130, 30);
        text("C", 715, 400);
      }
      if (muntjes6 === 2) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(69, 105, 68);
        text("D", 715, 400);
      }
      if (muntjes6 === 1) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(2, 34, 97);
        text("E", 715, 400);
      }
      if (muntjes6 === 0) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(102, 78, 7);
        text("F", 715, 400);
      }
    } // toon de score aan van level 6

    // score level 7
    if (muntjes7 === 5 && tijd7 > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(15, 173, 12);
      text("A", 715, 400);
      if (levelsupgrade === 3 && level >= hoogsteLevel) {

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
            muntjes5 = 0;
            muntjes6 = 0;
            muntjes7 = 0;
          }
        }
      }
      else {
        hoogsteLevel = 5;
      }

      // record tijd van level 7
      if (tijd7 > 0 && recordtijd7afgerond <= recordtijd7onafgerond) {
        recordtijd7onafgerond = 45 - tijd7;
      }
    } // unlock volgende level
    if (level === 7) {
      if (muntjes7 === 4) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(219, 74, 48);
        text("B", 715, 400);
      }
      if (muntjes7 === 3) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(230, 130, 30);
        text("C", 715, 400);
      }
      if (muntjes7 === 2) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(69, 105, 68);
        text("D", 715, 400);
      }
      if (muntjes7 === 1) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(2, 34, 97);
        text("E", 715, 400);
      }
      if (muntjes7 === 0) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(102, 78, 7);
        text("F", 715, 400);
      }
    } // toon de score aan van level 7

    // score level 8
    if (muntjes8 === 5 && tijd8 > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(15, 173, 12);
      text("A", 715, 400);
      if (levelsupgrade === 4 && level >= hoogsteLevel) {

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
            muntjes5 = 0;
            muntjes6 = 0;
            muntjes7 = 0;
            muntjes8 = 0;
          }
        }
      }
      else {
        hoogsteLevel = 5;
      }

      // record tijd van level 8
      if (tijd8 > 0 && recordtijd8afgerond <= recordtijd8onafgerond) {
        recordtijd8onafgerond = 45 - tijd8;
      }
    } // unlock volgende level
    if (level === 8) {
      if (muntjes8 === 4) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(219, 74, 48);
        text("B", 715, 400);
      }
      if (muntjes8 === 3) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(230, 130, 30);
        text("C", 715, 400);
      }
      if (muntjes8 === 2) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(69, 105, 68);
        text("D", 715, 400);
      }
      if (muntjes8 === 1) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(2, 34, 97);
        text("E", 715, 400);
      }
      if (muntjes8 === 0) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(102, 78, 7);
        text("F", 715, 400);
      }
    } // toon de score aan van level 8

    // score level 9
    if (muntjes9 === 5 && tijd9 > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(15, 173, 12);
      text("A", 715, 400);
      if (levelsupgrade === 5 && level >= hoogsteLevel) {

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
            muntjes5 = 0;
            muntjes6 = 0;
            muntjes7 = 0;
            muntjes8 = 0;
            muntjes9 = 0;
          }
        }
      }
      else {
        hoogsteLevel = 5;
      }

      // record tijd van level 9
      if (tijd9 > 0 && recordtijd9afgerond <= recordtijd9onafgerond) {
        recordtijd9onafgerond = 45 - tijd9;
      }
    } // unlock volgende level
    if (level === 9) {
      if (muntjes9 === 4) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(219, 74, 48);
        text("B", 715, 400);
      }
      if (muntjes9 === 3) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(230, 130, 30);
        text("C", 715, 400);
      }
      if (muntjes9 === 2) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(69, 105, 68);
        text("D", 715, 400);
      }
      if (muntjes9 === 1) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(2, 34, 97);
        text("E", 715, 400);
      }
      if (muntjes9 === 0) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(102, 78, 7);
        text("F", 715, 400);
      }
    } // toon de score aan van level 9

    // score level 10
    if (muntjes10 === 5 && tijd10 > 0) {
      fill(255, 255, 255);
      text("Score:", 520, 400);
      fill(15, 173, 12);
      text("A", 715, 400);

      // record tijd van level 10
      if (tijd10 > 0 && recordtijd10afgerond <= recordtijd10onafgerond) {
        recordtijd10onafgerond = 45 - tijd10;
      }
    } // unlock volgende level
    if (level === 10) {
      if (muntjes10 === 4) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(219, 74, 48);
        text("B", 715, 400);
      }
      if (muntjes10 === 3) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(230, 130, 30);
        text("C", 715, 400);
      }
      if (muntjes10 === 2) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(69, 105, 68);
        text("D", 715, 400);
      }
      if (muntjes10 === 1) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(2, 34, 97);
        text("E", 715, 400);
      }
      if (muntjes10 === 0) {
        fill(255, 255, 255);
        text("Score:", 520, 400);
        fill(102, 78, 7);
        text("F", 715, 400);
      }
    } // toon de score aan van level 10


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