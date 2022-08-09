var started = false;
var level = 0;
//color array
var buttonColours = ["red", "blue", "green", "yellow"];

userClickedPattern = [];
//gamne pattern array
var gamePattern = [];


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
        startOver();
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }

}

//function to get the nextSequence
function nextSequence() {
  userClickedPattern = [];
 //level up
  level++;

  //change h1 according to the level
  $("#level-title").text("Level " + level);
  //variable to hold
  var randomNumber = Math.round(Math.random() * 3);
  //take color according to the randomNumber
  var randomChosenColour = buttonColours[randomNumber];

  //add randomChosenColour to the gamePattern
  gamePattern.push(randomChosenColour);

  //flash the button that has randomChosenColour
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
