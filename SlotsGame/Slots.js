/*
Definition for Slot Machine: a coin-operated gaming machine that generates random combinations of symbols on a dial,
certain combinations winning varying amounts of money for the player.

rankings for slot machine (best to worst):
seven
diamond
cherry
watermellon
bars
horseshoe

difficulties:
timeout
spin animation
*/

var slotReel; //array of our slot symbols
var coins; //players total coins
var coinsPlayed; //how many coins player has in machine
var amountWon;
var crx; //canvas
var slot1, slot2, slot3; //our current values in each slot reel
var stop1, stop2, stop3; //the values we stoped at
var coinInsertSound, slotStopSound, spinSound, smallWinSound, mediumWinSound, jackpotSound, coinEjectSound; //sounds

function init() {
    slotReel = ["diamond","dc", "cherry", "cs", "seven", "sb", "bars", "bw", "watermellon", "wh", "horseshoe", "hd"]; //array of the different things to land on

    //hardcoded the default starting position. Does not affect gameplay
    slot1 = 0;
    slot2 = 3;
    slot3 = 8;

    coins = 300; //starting coins
    coinsPlayed = 0;
    amountWon = 0;

    //initializing all in-game sounds.
    coinInsertSound = document.getElementById("coininsert");
    slotStopSound = document.getElementById("slotstop");
    spinSound = document.getElementById("slotspin");
    smallWinSound = document.getElementById("smallwin");
    mediumWinSound = document.getElementById("mediumwin");
    jackpotSound = document.getElementById("jackpot");
    coinEjectSound = document.getElementById("coineject");

    //init canvas
    ctx = document.getElementById("myCanvas").getContext("2d");

    //draw slot background
    var background = new Image();
    background.src = "./SlotsImages/slotmachine.jpg";
    background.onload = function(){
      ctx.drawImage(background,0,0);
      drawSlot(slotReel[slot1]+".jpg", 185, 20);
      drawSlot(slotReel[slot2]+".jpg", 425, 20);
      drawSlot(slotReel[slot3]+".jpg", 660, 20);
    }

    //formats the position of the labels so they appear to fit inside the LED displays
    document.getElementById('U_WON').style.left = 570 - (amountWon.toString().length*40);
    document.getElementById('U_COINS').style.left = 790 - (coins.toString().length*40);

    //updates labels
    document.getElementById('U_WON').innerHTML = amountWon;
    document.getElementById('U_COINS').innerHTML = coins;
    document.getElementById('U_PLAYED').innerHTML = coinsPlayed;

}

/*
  draws one slot reel with given image and position
*/
function drawSlot(file, x, y) {
    var reelImg = new Image();
    reelImg.src = "./SlotsImages/" +file;
    reelImg.onload = function(){
      ctx.drawImage(reelImg, x, y);
    }
}


/*
When user presses spin reels. User has to have a coin in machine to spin. It spins the three reels and stops randomly on each.
The animation of spinning the reels was done by changing the different images really fast.
*/
function spinReels() {
  if(coinsPlayed != 0) {
    spinSound.play();

    //update users coins
    coins -= coinsPlayed;
    document.getElementById('U_COINS').style.left = 790 - (coins.toString().length*40);
    document.getElementById('U_COINS').innerHTML = coins;

    var timeoutValue = 100; //initialize a delay variables

    //the random stops for each reel
    stop1 = Math.floor(Math.random() * 12);
    stop2 = Math.floor(Math.random() * 12);
    stop3 = Math.floor(Math.random() * 12);

    //jackpot win hardcode
    // stop1 = 5;
    // stop2 = 2;
    // stop3 = 9;

    //Medium Win hardcode
    // stop1 = 1;
    // stop2 = 10;
    // stop3 = 5;

    //small win hardcode
    // stop1 = 9;
    // stop2 = 8;
    // stop3 = 6;

    //goes through every image 8 times to give spinning effect.
    for(var i = 0; i < 108; i++) {

      //play reel stopping noise when each reel stops
      if((i == 48 + stop1) || (i == 72 + stop2) || (i == 96 + stop3)) {
        setTimeout(()=> {slotStopSound.play();}, timeoutValue);
      }

      //first reel spin. We want it to stop first. Used 48 as it is the 0th element of array after 4 spins.
      if(i < (48 + stop1)) {
        setTimeout(()=> {drawSlot(slotReel[slot1]+".jpg", 185, 20); slot1++; if(slot1==12) {slot1=0;}}, timeoutValue);
      }

      //second reel spin. We want it to stop second. Used 72 as it is the 0th element of array after 6 spins.
      if(i < (72 + stop2)) {
        setTimeout(()=> {drawSlot(slotReel[slot2]+".jpg", 425, 20); slot2++; if(slot2==12) {slot2=0;}}, timeoutValue);
      }

      //third reel spin. We want it to stop last. Used 96 as it is the 0th element of array after 8 spins.
      if(i < (96 + stop3)) {
        setTimeout(()=> {drawSlot(slotReel[slot3]+".jpg", 660, 20); slot3++; if(slot3==12) {slot3=0;}}, timeoutValue);
      }

      timeoutValue += 50;

    }

    setTimeout(()=> {payOut();}, timeoutValue);

  }

}

/*
user presses bet one button. Adds one to coinsPlayed if it is not at max(3). It updates the total coins
label but not the variable. This is because we want to decrement the total everytime the user presses the spin button
not just when they bet a coin.
*/
function betOne() {
  //if player has coins and is not at max
  if(coins != 0 && coinsPlayed < 3) {
    coinInsertSound.play();
    coinsPlayed++;

  }else if(coins != 0 && coinsPlayed == 3) { //if user has max 3 coins played change to 1
    coinInsertSound.play();
    coinsPlayed = 1;
  }
  //formats the position of the labels so they appear to fit inside the LED displays
  document.getElementById('U_COINS').style.left = 790 - (coins.toString().length*40);

  //updates labels
  document.getElementById('U_COINS').innerHTML = coins - coinsPlayed;
  document.getElementById('U_PLAYED').innerHTML = coinsPlayed;
}

/*
puts maximum coins in the slotmachine(3)
*/
function betMax() {
  if(coins >= 3 && coinsPlayed < 3) {
    coinInsertSound.play();

    coinsPlayed = 3;

    //formats the position of the labels so they appear to fit inside the LED displays
    document.getElementById('U_COINS').style.left = 790 - (coins.toString().length*40);

    //updates labels
    document.getElementById('U_COINS').innerHTML = coins - coinsPlayed;
    document.getElementById('U_PLAYED').innerHTML = coinsPlayed;
  }
}


/*
returns the coins the user has put in the machine
*/
function coinEject() {
  if(coinsPlayed != 0) {
    coinEjectSound.play();
    coinsPlayed = 0;

    //formats the position of the labels so they appear to fit inside the LED displays
    document.getElementById('U_COINS').style.left = 790 - (coins.toString().length*40);

    //updates labels
    document.getElementById('U_COINS').innerHTML = coins - coinsPlayed;
    document.getElementById('U_PLAYED').innerHTML = coinsPlayed;
  }
}


/*
Determines if the user won and how much they won.
*/
function payOut() {
  amountWon = 0;

  //value of slot is the next element in array
  stop1 = slot1 - 1;
  if(stop1==-1) {stop1=11;}
  stop2 = slot2 - 1;
  if(stop2==-1) {stop2=11;}
  stop3 = slot3 - 1;
  if(stop3==-1) {stop3=11;}

  //Jackpot (777)
  if(stop1 == 4 && stop2 == 4 && stop3 == 4) {
    jackpotSound.play();
    amountWon = coinsPlayed * 800;
    if(coinsPlayed == 3){coins += 100;} //3 coins played pays 100 more than 3*800
  }

  //3x Diamonds
  else if(stop1 == 0 && stop2 == 0 && stop3 == 0) {
    mediumWinSound.play();
    amountWon = coinsPlayed * 80;
  }

  //3x Cherries
  else if(stop1 == 2 && stop2 == 2 && stop3 == 2) {
    mediumWinSound.play();
    amountWon = coinsPlayed * 40;
  }

  //3x watermellon
  else if(stop1 == 8 && stop2 == 8 && stop3 == 8) {
    smallWinSound.play();
    amountWon = coinsPlayed * 25;
  }

  //anytwo are bars
  else if((stop1 == 6 && stop2 == 6) || (stop2 == 6 && stop3 == 6) || (stop1 == 6 && stop3 == 6)) {
    smallWinSound.play();
    amountWon = coinsPlayed * 10;
  }

  //any one horseshoe
  else if(stop1 == 10 || stop2 == 10 || stop3 == 10) {
    smallWinSound.play();
    amountWon = coinsPlayed * 2;
  }
  coins += amountWon

  //formats the position of the labels so they appear to fit inside the LED displays
  document.getElementById('U_WON').style.left = 570 - (amountWon.toString().length*40);
  document.getElementById('U_COINS').style.left = 790 - (coins.toString().length*40);

  //updates labels
  document.getElementById('U_WON').innerHTML = amountWon;
  document.getElementById('U_COINS').innerHTML = coins;

}
