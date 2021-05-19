var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

// Generate Sequence

function nextSequence() {
    
    level++;
    userClickedPattern = [];
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

// Detect Button Click 

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// Play Sound

function playSound(name) {
    
    switch (name) {
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;

        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;

        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;

        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        
        case "wrong":
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            break;
    }
}

// Animate on button click

function animatePress(currentColor) {
    var activeButton = $("#" + currentColor);
    
    activeButton.addClass("pressed");
    setTimeout(function() {
        activeButton.removeClass("pressed");
    }, 50);
}

// Game Start 
var toggle = false;
var level = 0;

$(document).keydown(function() {
    if (!toggle) {
        nextSequence();
        toggle = true;
    }
    $("#title-level").text("");
});

// Check Users Answer

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            console.log("success");
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

//wrong answer

function gameOver() {
    playSound("wrong");
    $("h1").text("Game Over, Press any key to restart");
    var wrongButton = $("body");
    wrongButton.addClass("game-over");
    setTimeout(function() {
        wrongButton.removeClass("game-over")
    }, 200);
    startOver();
}

//Reset the Game

function startOver() {
    toggle = false;
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}