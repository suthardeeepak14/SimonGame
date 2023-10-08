var buttonColor = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userClickPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level" + +level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);
    startOver();
  }
}

function nextSequence() {
  userClickPattern = [];
  level++;
  $("#level-title").text("Level" + " " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currenColor) {
  $("#" + currenColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currenColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
