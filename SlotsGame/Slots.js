/*
rankings:
seven
diamond
cherry
watermellon
bars
horseshoe
*/

var slotReel;
var crx;

function init() {
    slotReel = ["diamond","dc", "cherry", "cs", "seven", "sb", "bars", "bw", "watermellon", "wh", "horseshoe", "hd"];

    //init canvas
    ctx = document.getElementById("myCanvas").getContext("2d");

    //draw slot background
    var background = new Image();
    background.src = "./SlotsImages/slotmachine.jpg";
    background.onload = function(){
      ctx.drawImage(background,0,0);
      drawSlot(slotReel[Math.floor(Math.random() * 12)]+".jpg", 185, 20);
      drawSlot(slotReel[Math.floor(Math.random() * 12)]+".jpg", 425, 20);
      drawSlot(slotReel[Math.floor(Math.random() * 12)]+".jpg", 660, 20);
    }



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
  for(var i = 0; i < 12; i++) {

    drawSlot(slotReel[i]+".jpg", 185, 20);
  }
  for(var i = 0; i < 12; i++) {
    drawSlot(slotReel[i]+".jpg", 425, 20);

  }
  for(var i = 0; i < 12; i++) {
    drawSlot(slotReel[i]+".jpg", 660, 20);
  }

}
