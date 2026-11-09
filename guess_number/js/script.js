//alert("running from the other side!");
//global variables
let attempts = 0;
const MAX_ATTEMPTS = 7;
const DEBUG = false;
let randomNumber;
let totalGames = 0;
let totalWins = 0;
// let lowest = 1;
// let highest = 99;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    attempts = 0;
    totalGames++;
    // lowest = 1;
    // highest = 99;

    document.querySelector("#left-panel").textContent = 1;
    document.querySelector("#right-panel").textContent = 99;

    if (DEBUG) {
        console.log("Random number is: " + randomNumber);
    }

    document.querySelector("#resetBtn").style.display = "none";

    document.querySelector("#guessBtn").style.display = "inline";
    //document.getElementById("#guessBtn").disabled = false;

    document.querySelector("#playerGuess").focus();
    document.querySelector("#feedback").textContent = "";
    //(document.querySelector("playerGuesses"). != null) ? document.querySelector("#playerGuesses").textContent = "" : null;
    document.querySelector("#guesses").textContent = "";
    document.querySelector("#misc-right").textContent = "Games Played: " + (totalGames - 1) + "; Games Won: " + totalWins;

}
//document.querySelector("h1").style.color = "blue";
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);
// window.addEventListener("keydown", (event) => {
//     console.log("focus: " + document.activeElement.id)
//     if ((event.key === "Enter") && (document.activeElement.id == "#playerGuess"))
//         document.querySelector("#guessBtn").click();
// })

function checkGuess() {
    let guessInput = document.querySelector("#playerGuess");
    let guess = parseInt(guessInput.value);
    guessInput.value = "";
    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; // Clear previous feedback
    attempts++;


    DEBUG ? console.log("Player guessed: " + guess) : null;
    if (DEBUG && attempts > 0) {
        document.querySelector("#resetBtn").style.display = "inline";
    }

    if (guess === randomNumber) {
        DEBUG ? console.log("game win triggered") : null;
        totalWins++;
        document.querySelector("#guessBtn").style.display = "none";
        document.body.focus();
        //document.getElementById("#guessBtn").disabled = true;
        //document.querySelector("#resetBtn").focus();
        feedback.textContent = "Congratulations! You guessed the number in " + attempts + " attempts!" + "\nTotal games played: " + totalGames + ", Total wins: " + totalWins + ".";
        feedback.style.color = "#16f529";
        document.querySelector("#misc-right").textContent = "Games Played: " + totalGames + "; Games Won: " + totalWins;
        return;


    }
    else if (guess < 1 || guess > 99) {
        //DEBUG ? console.log("Guess out of range!") : null;

        feedback.textContent = "Please enter a number between 1 and 99.";
        feedback.style.color = "#fd1c03";
        return;
    }
    else if (guess < randomNumber) {
        feedback.textContent = "Too low! Try again. You have " + (MAX_ATTEMPTS - attempts) + " attempts left.";
        guess > document.querySelector("#left-panel").textContent ? document.querySelector("#left-panel").textContent = guess : null;
        // document.querySelector("#left-panel").textContent = lowest;
        feedback.style.color = "yellow";
        addguess(guess);
    }
    else if (guess > randomNumber) {
        feedback.textContent = "Too high! Try again. You have " + (MAX_ATTEMPTS - attempts) + " attempts left.";
        feedback.style.color = "yellow";
        guess < document.querySelector("#right-panel").textContent ? document.querySelector("#right-panel").textContent = guess : null;

        // document.querySelector("#right-panel").textContent = highest;
        addguess(guess);
    }

    if (attempts >= MAX_ATTEMPTS) {
        feedback.textContent = "Sorry, you've used all your attempts. The number was " + randomNumber + "." + "\nTotal games played: " + totalGames + ", Total wins: " + totalWins + ".";
        feedback.style.color = "#fd1c03";
        gameOver();

    }



    return;
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}

function addguess(guess) {
    document.querySelector("#guesses").textContent += guess + " ";
}