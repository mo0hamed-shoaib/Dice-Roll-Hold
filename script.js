'use strict';

// TODO: Select all necessary elements and store it
// TODO: Hide the Dice and set the scores to 0
// TODO: Implement rolling dice functionality
// TODO: Update current score with dice holder
// TODO: Implement the Hold button functionality
// TODO: Implement the New Game button functionality

// Selecting Buttons
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Selecting Dice
const dice = document.querySelector('.dice');

// Selecting Score and Current Score
const scorePlayer0 = document.querySelector('#score--0');
const scorePlayer1 = document.querySelector('#score--1');
const currentPlayer0 = document.querySelector('#current--0');
const currentPlayer1 = document.querySelector('#current--1');

// Selecting Player
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// NOTE: There is a method called setAttribute that we can use to disable a button, example:
// btnHold.setAttribute('disabled', true);
// btnRollDice.setAttribute('disabled', true);
// This is a different method than using player = true

// NOTE: We don't define our starting conditions in the function because then it would not be accessible outside it, we define it outside the function then modify it inside the function
let playing, activePlayer, currentScore, scores;

// Function to set Starting Conditions / New Game
const newGame = function () {
    // turn on playing variable
    playing = true;

    // Dice Hidden
    dice.classList.add('hidden');

    // Reset current and total score
    scorePlayer0.textContent = 0;
    scorePlayer1.textContent = 0;
    currentPlayer0.textContent = 0;
    currentPlayer1.textContent = 0;

    // Give player--0 the start
    activePlayer = 0;
    player0.classList.add('player--active');

    // Storing current score and score to accumulate it
    currentScore = 0;
    scores = [0, 0];

    // Remove player--winner class
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
};
newGame(); // NOTE: Initialize the game

// Function to switch active player
const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

// Rolling the dice functionality
btnRollDice.addEventListener('click', function () {
    //Button works only when playing = true
    if (playing) {
        // 1- Generate a random dice roll and make it inside the event so each click generates new number
        const diceRoll = Math.trunc(Math.random() * 6) + 1;

        // 2- Display dice according to generated number by modifying .src property with template literals
        dice.classList.remove('hidden');
        dice.src = `dice-${diceRoll}.png`; // from HTML

        // 3- Check for rolled 1
        if (diceRoll !== 1) {
            // Add dice to current score, update current score for active player
            currentScore += diceRoll;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch player
            switchPlayer();
        }
    }
})

// Holding the current score and updating total score
btnHold.addEventListener('click', function () {
    //Button works only when playing = true
    if (playing) {
        // 1- Add current score to total of current player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2- score >= 100 ? finish : switch player
        if (scores[activePlayer] >= 100) {
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
})

// New Game button functionality
// NOTE: We passed the newGame function without parameters because it's already defined, and we want JS to call it
btnNewGame.addEventListener('click', newGame);


