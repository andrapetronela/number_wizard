// UI elements 

const min = document.querySelector('#min'),
      max = document.querySelector('#max'),
      userGuess = document.querySelector('.userGuess'),
      buttonSubmit = document.querySelector('#buttonSubmit'),
      wizardResponse = document.querySelector('.wizardResponse'),
      body = document.querySelector('body'),
      welcome = document.querySelector('#welcome'),
      gameRule = document.querySelector('#gameRule'),
      ghost = document.querySelector('.ghost'),
      cat = document.querySelector('.cat'),
      spider = document.querySelector('.spider');


// update UI messages
userGuess.addEventListener('focus', function(){
    cat.style.display = 'none';
    spider.style.display = 'none';
    
    setTimeout(function() {
        welcome.textContent = 'May the ghost be with you!';
        welcome.style.fontFamily = 'Eater';
        welcome.style.transition = 'all 2s';
        gameRule.textContent = 'While you try to guess my number, I will take a coffin break!';

    }, 300);
    
    
    // background
    body.style.background = 'linear-gradient(to right, rgba(0, 0, 0, 0.91) 30vw, rgba(0, 0, 0, 0.58) 70vw, rgba(0, 0, 0, 0.88)), url(witch-min.jpg)';
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'top center';
    body.style.backgroundRepeat = 'no-repeat';
    
    //ghost 
    ghost.style.animationPlayState = "running"; 
});
    


// Game values

let score = document.querySelector('#score');
let minNumber = 1,
    maxNumber = 10,
    guessesLeft = 5;

// Assign min and max

min.textContent = minNumber;
max.textContent = maxNumber;
score.textContent = `${guessesLeft}`;

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
        wizardResponse.textContent = `'${guess}' is not my number. Try again.`
        wizardResponse.classList.add('danger');
                
        if (guessesLeft === 0) {
            gameOver();
        }
    }
    userGuess.value = "";
    score.textContent = `${guessesLeft}`;
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
    userGuess.style.background = '#363639';
    
    wizardResponse.textContent = `You lost! The correct number was ${winningNumber}.`;
    wizardResponse.classList.add('danger');
    
    buttonSubmit.value = 'Play Again';
    buttonSubmit.className += 'play-again';
    
    body.style.background = 'linear-gradient(to right bottom, rgba(0, 0, 0, 0.91), rgba(0, 0, 0, 0.58) 70vw, rgba(0, 0, 0, 0.88)), url(lost-min.jpg)';
    body.style.backgroundSize = '100% 100vh';
    
    
    welcome.textContent = 'Now you are the ghost!';
    gameRule.textContent = 'It seems that your blood type is not coffee!';
    gameRule.style.color = '#000000';
    gameRule.style.fontWeight = '600';
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
    userGuess.style.background = '#363639';
    wizardResponse.textContent = `You won! The correct number is ${winningNumber}.`;
    wizardResponse.classList.add('winner');
    welcome.textContent = 'Abracadabra!'; 
   
    gameRule.textContent = 'That\' my lucky number!';
    gameRule.style.fontSize = '1.6vw!';
    
    buttonSubmit.value = 'Play Again';
    buttonSubmit.className += 'play-again';
    
    body.style.background = 'linear-gradient(#051937, #292a64, #60338a, #a231a6)';
    let winnerPuppet = document.querySelector('.winnerPuppet');
    winnerPuppet.style.animationPlayState = "running"; 
}

