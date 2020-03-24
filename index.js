var numberOfButtons = $(".btn").length;
var randomButton,
   clickedButtonSequence = [],
   randomButtonNumber;
var level = 1,
   i = 0;
var requiredSequence = [];

// function that selects random button
function randomButton() {
   randomButtonNumber = Math.floor(Math.random() * numberOfButtons);
   return $(".btn")[randomButtonNumber];
}

// function that displays button animation and sound
function soundAndAnimation(colorId) {
   $("#" + colorId).addClass("pressed");
   setTimeout(function () {
      $("#" + colorId).removeClass("pressed");
   }, "100");

   var audio = new Audio("sounds/" + colorId + ".mp3");
   audio.play();
}

// executes when user presses wrong button
function gameOver(colorId) {
   soundAndAnimation(colorId);
   var audio = new Audio("sounds/wrong.mp3");
   audio.play();

   $("body").addClass("game-over");
   setTimeout(function () {
      $("body").removeClass("game-over");
   }, "100");

   $("#level-title").text("Game Over, Press Any Key to Restart");
}

// function that updates level
function updateLevel() {
   level++;
   i = 0;
   clickedButtonSequence = []; //clickedButtonSequence should be empty at the starting of new level

   $("#level-title").text("Level " + level);

   requiredSequence.push(randomButton().id); //updating the required sequence
   // console.log("required="); console.log(requiredSequence);
   showSequence();
}

// functio nto display sequence
function showSequence() {
   soundAndAnimation(requiredSequence[requiredSequence.length - 1]);
}

// execution starts on key press and all variables are initialized
$(document).on("keydown", function () {
   clickedButtonSequence = [];
   level = 1, i = 0;
   requiredSequence = [];

   $("#level-title").text("Level " + level);
   requiredSequence.push(randomButton().id); //adds id of random button to list
   // console.log("required="); console.log(requiredSequence);
   showSequence();
});

// function that checks which button is pressed and performs required action
$(document).on("click", function (event) {
   clickedButtonSequence.push(event.target.id); //adds id of clicked button to list
   // console.log(clickedButtonSequence);

   // if the wrong button is clicked
   if (clickedButtonSequence[i] != requiredSequence[i]) {
      // console.log("wrong");
      gameOver(event.target.id);
   }

   // if right button is clicked
   else {
      soundAndAnimation(event.target.id);
      i++;
      //checking if level is finished
      if (i == level) {
         setTimeout(function () {
            updateLevel();
         }, "1000");
      }
   }
});
