var bldg = document.getElementById("bldg");
var gap = document.getElementById("gap");
var player = document.getElementById("player");
var jumping = 0;

gap.addEventListener(`animationiteration`, () => {
  var random = Math.random()^3;
  var top = (random*100)+150;
  gap.style.top = -(top) + "px";
});
setInterval(function(){
    var playerTop =
    parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    if( jumping === 0){
        player.style.top = (playerTop +3)+"px";
    }
},10);

function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var playerTop =
    parseInt (window.getComputedStyle(player).getPropertyValue("top"));
        player.style.top = (playerTop +3)+"px";
        if(jumpCount > 20){
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
jumpcount++
    },10);
}