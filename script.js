// UI elements 

const min = document.querySelector('#min'),
      max = document.querySelector('#max'),
      userGuess = document.querySelector('.userGuess'),
      buttonSubmit = document.querySelector('#buttonSubmit'),
      wizardResponse = document.querySelector('.wizardResponse');

// Game values

let minNumber = 1,
    maxNumber = 10,
    guessesLeft = 5;
// Assign min and max

min.textContent = minNumber;
max.textContent = maxNumber;

// Winning number 

let winningNum = (minNumber, maxNumber) => {
    return Math.floor(Math.random() * 10) + 1;
}
let winningNumber = winningNum(minNumber, maxNumber);


function startGame() {
    let guess = parseInt(userGuess.value);

    // validate user input 
    if (isNaN(guess) || guess < minNumber || guess > maxNumber) {
        wizardResponse.textContent = `Please enter a number between ${minNumber} and ${maxNumber}.`;
        wizardResponse.classList.add('danger');
        userGuess.value = '';
        return false;
    }
    
    // check if won 
    if (guess === winningNumber) {
        won();
    } else {
        guessesLeft -=1;
        wizardResponse.textContent = `${guess} is not my number. You have ${guessesLeft} guesses left.`
        wizardResponse.classList.add('danger');
        if (guessesLeft === 0) {
            gameOver();
        }
    }
    userGuess.value = "";
}

buttonSubmit.addEventListener('click', startGame);

// Keyboard interaction

userGuess.addEventListener('keyup', function(e){
    let guess = parseInt(userGuess.value);
    
    if (e.keyCode === 13 && guess >= minNumber && guess <= maxNumber ) {
        startGame();
    } if (e.keyCode === 13 && guess == '' || e.keyCode === 13 && isNaN(guess) || e.keyCode === 13 && guess < minNumber || e.keyCode === 13 && guess > maxNumber) {
         wizardResponse.textContent = `Please enter a number between ${minNumber} and ${maxNumber}.`;
         wizardResponse.classList.add('danger');
         userGuess.value = '';
    } 
});

// Game over
function gameOver(){
    // Disable input
    userGuess.disabled = true;
    wizardResponse.textContent = `You lost! The correct number was ${winningNumber}.`;
    wizardResponse.classList.add('danger');
    
    buttonSubmit.value = 'Play Again';
    buttonSubmit.className += 'play-again';
}

// Play again event listener
buttonSubmit.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

function won() {
    // Disable input
    userGuess.disabled = true;
    wizardResponse.textContent = `You won! The correct number is ${winningNumber}.`;
    wizardResponse.classList.add('winner');
    
    buttonSubmit.value = 'Play Again';
    buttonSubmit.className += 'play-again';
}


