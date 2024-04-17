// Wait for the entire HTML document to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const bldg = document.getElementById("bldg");
  const gap = document.getElementById("gap");
  const player = document.getElementById("player");
  const gameOverScreen = document.getElementById("gameOver");
  const scoreDisplay = document.getElementById("score");
  const dmgImage = document.getElementById("dmgImage");
  const charImage = document.getElementById("charImage");
  const characterText = document.getElementById("characterText");

  // State variables to track game status
  let jumping = false;
  let counter = 0;
  let gameIsOver = false;

  // Function to initialize or reset the game to its starting state
  function initializeGame() {
    counter = 0; // Reset score at game start
    scoreDisplay.textContent = counter; // Display initial score
    bldg.style.animationPlayState = "running"; // Start building animation
    gap.style.animationPlayState = "running"; // Start gap animation
    gameOverScreen.style.display = "none"; // Hide the game over screen
    player.style.top = "100px"; // Reset player's position
    gameIsOver = false; // Set game state to not over
    charImage.style.display = "block"; // Show character image
    dmgImage.style.display = "none"; // Hide damaged image
    characterText.textContent =
      "Alright Choom, all you need to do is clear 20 light rings and we are out of the city and deep into space! Good Luck... again don't crash my ship";
  }

  // Event listener for when building animation repeats
  bldg.addEventListener("animationiteration", () => {
    let random = -(Math.random() * 300 + 150); // Calculate a random top position for the gap
    gap.style.top = random + "px"; // Set the new top position of the gap
    counter++; // Increment the score
    scoreDisplay.textContent = counter; // Update the score displayed on the screen
    if (counter >= 20) {
      // Check for win condition
      displayWinScreen(); // Display win message
    }
  });

  // Handle keydown events
  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      if (gameIsOver) {
        initializeGame(); // Restart the game if it is over
      } else {
        jump(); // Jump if the game is ongoing
      }
    }
  });

  // Set interval to run physics and collision detection
  setInterval(function () {
    if (!gameIsOver) {
      let playerTop = parseInt(
        window.getComputedStyle(player).getPropertyValue("top")
      );
      if (!jumping && playerTop < 480) {
        player.style.top = playerTop + 3 + "px"; // Simulate gravity by pulling the player down
      }
      let bldgLeft = parseInt(
        window.getComputedStyle(bldg).getPropertyValue("left")
      );
      let gapTop = parseInt(
        window.getComputedStyle(gap).getPropertyValue("top")
      );
      let pTop = -(500 - playerTop); // Calculate player's top relative to the bottom of the game view
      if (
        playerTop > 480 || // Check if the player is out of bounds
        (bldgLeft < 20 &&
          bldgLeft > -50 &&
          (pTop < gapTop || pTop > gapTop + 130)) // Collision detection
      ) {
        triggerGameOver(); // Trigger game over conditions
      }
    }
  }, 10);

  // Define the jumping mechanics
  function jump() {
    if (!jumping) {
      jumping = true;
      let jumpCount = 0;
      let jumpInterval = setInterval(function () {
        var playerTop = parseInt(
          window.getComputedStyle(player).getPropertyValue("top") //converts its first argument to a string, parses that string, then returns an integer or NaN
        );
        if (jumpCount < 15 && playerTop > 7) {
          player.style.top = playerTop - 5 + "px"; // Move the player up on jump
        }
        if (jumpCount > 20) {
          clearInterval(jumpInterval); // Stop jumping after a set time
          jumping = false;
          jumpCount = 0;
        }
        jumpCount++;
      }, 10);
    }
  }

  // Handle game over state
  function triggerGameOver() {
    gameIsOver = true;
    gameOverScreen.style.display = "flex"; // Show game over screen
    bldg.style.animationPlayState = "paused"; // Pause animations
    gap.style.animationPlayState = "paused";

    // Swap the images and update the character text on game over
    charImage.style.display = "none";
    dmgImage.style.display = "block";
    characterText.textContent =
      "AGH!! You've crashed my ship and we've been caught! Now I have to answer for my crimes. Thanks for nothing!";
  }

  // Define a function to restart the game by reloading the page
  window.restartGame = function () {
    window.location.reload(); // Reload the page to reset the game
  };

  initializeGame(); // Initial game setup
});