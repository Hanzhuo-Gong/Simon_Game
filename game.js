var gamePattern = [];
var userClickedPattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var level = 0;
var gameIndex = 0;
var startAGame = false;
var keyLinkedToColor = "";

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  if (randomNumber > 3) {
    randomNumber = 3;
  }

  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  //computer will tell user which button to press
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(document).keydown(function(event) {
  if (startAGame == false) {
    setUpGame();
    startAGame = true;
    gameStart();
  } else {
    //use keyboard to detect color
    switch (event.key) {
      case "w":
        keyLinkedToColor = "green";
        gameProgress(keyLinkedToColor);
        break;
      case "a":
        keyLinkedToColor = "red";
        gameProgress(keyLinkedToColor);
        break;
      case "s":
        keyLinkedToColor = "yellow";
        gameProgress(keyLinkedToColor);
        break;
      case "d":
        keyLinkedToColor = "blue";
        gameProgress(keyLinkedToColor);
        break;
      default:
        console.log("unexpected key pressed");
    }
  }
});

function gameStart() {
  $(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    gameProgress(userChosenColor);
  });
}

function gameProgress(value) {
  playSound(value);
  animatePress(value);
  userClickedPattern.push(value);
  if (gameIndex < level) {
    checkAnswer(gameIndex);
  }
}

function playSound(name) {
  switch (name) {
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;

    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;

    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;

    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;

    default:
      console.log("Unexpected name generated");
  }
}

function animatePress(currentColor) {
  var animateCurrentColor = $("." + currentColor);

  animateCurrentColor.addClass("pressed");

  setTimeout(function() {
    animateCurrentColor.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    gameIndex += 1;
    if (gameIndex == level) {
      setTimeout(function() {
        nextSequence();
        gameIndex = 0;
        level += 1;
        $("h1").text("Level " + level);
        userClickedPattern = []; //empty array to start a new game
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  var gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.play();

  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, You achieved level " + level);
  $(".restart_button").css("visibility", "visible");
}

$(".restart_button").click(startOver);

function startOver() {
  resetGame();
  setUpGame();
}

function setUpGame() {
  nextSequence();
  level += 1;
  $("h1").text("Level " + level);
}

function resetGame() {
  $(".restart_button").css("visibility", "hidden");
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  gameIndex = 0;
}
