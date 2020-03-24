var buttonColors=["red", "blue", "yellow", "green"];
var gamePattern=[];
function nextSequence(){
   var randomNumber= Math.floor(Math.random()*4);
   var randomChoosenColor= buttonColors[randomNumber];
   gamePattern.push(randomChoosenColor);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
   audio.play();
}
