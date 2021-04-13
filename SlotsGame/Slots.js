/*
rankings:
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
var crx;
var slot1, slot2, slot3; //our current values in each slot reel
//var timeoutValue;

function init() {
    slotReel = ["diamond","dc", "cherry", "cs", "seven", "sb", "bars", "bw", "watermellon", "wh", "horseshoe", "hd"];
    slot1 = 0;
    slot2 = 3;
    slot3 = 8;
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
//Math.floor(Math.random() * 12)


}

/*
  draws one slot reel
*/
function drawSlot(file, x, y) {
    var reelImg = new Image();
    reelImg.src = "./SlotsImages/" +file;
    reelImg.onload = function(){
      ctx.drawImage(reelImg, x, y);
    }
}



function spinReels() {

  var timeoutValue = 100;
  var stop1 = Math.floor(Math.random() * 12);
  var stop2 = Math.floor(Math.random() * 12);
  var stop3 = Math.floor(Math.random() * 12);

  for(var i = 0; i < 108; i++) {

    //first reel spin. We want it to stop first. Used 60 as it is the 0th element of array after 5 spins.
    if(i < (60 - stop1)) {
      setTimeout(()=> {drawSlot(slotReel[slot1]+".jpg", 185, 20); slot1++; if(slot1==12) {slot1=0;}}, timeoutValue);
    }

    //second reel spin. We want it to stop second. Used 84 as it is the 0th element of array after 7 spins.
    if(i < (84 - stop2)) {
      setTimeout(()=> {drawSlot(slotReel[slot2]+".jpg", 425, 20); slot2++; if(slot2==12) {slot2=0;}}, timeoutValue);
    }

    //third reel spin. We want it to stop last. Used 108 as it is the 0th element of array after 9 spins.
    if(i < (108 - stop3)) {
      setTimeout(()=> {drawSlot(slotReel[slot3]+".jpg", 660, 20); slot3++; if(slot3==12) {slot3=0;}}, timeoutValue);
    }
    timeoutValue += 50;
  }


}
