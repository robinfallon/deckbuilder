const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

/*------------ BEGIN GAME ---------------*/
let result = 0;
let currentTime = timeLeft.textContent;

// remove any class from divs: 
function randomSquare() {
    // use arrow function & forEach, remove class name "mole" from all squares in grid:
    square.forEach(className => {
        className.classList.remove('mole')
    });
    // define a random position on the grid multiplied by # of squares on the grid:
    // use Math.floor so random integer is always less than or equivalent to 9:
    let randomPosition = square[Math.floor(Math.random() * 9)];
    
    // once random position is defined, add class "mole" to it:
    randomPosition.classList.add('mole');

    // assign ID of the randomPosition to hitPosition:
    hitPosition = randomPosition.id
};

/*--------------- EVENT LISTENER -------------------*/

square.forEach(id => {
    // if we click on position equal to hit position...
    id.addEventListener('click', () => {
        if (id.id === hitPosition) {
            //...we win and add 1 point to our score:
            result = result + 1
            // to visually display result in browser:
            score.textContent = result;
        }
    })
});

// TO MOVE MOLE RANDOMLY: //

function moveMole() {
    let timerId = null;
    // use setInterval to make randomSquare function run every 1000 milliseconds:
    timerId = setInterval(randomSquare, 700)
}

moveMole();

/*-----------------COUNTDOWN FUNCTION --------------------*/

// will make currentTime go down by 1 incrementally:
function countDown() {
    // if current time is 0, game over:
    currentTime--
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        // clear the time interval:
        clearInterval(timerId)
        // set alert to tell player game is over + their result:
        alert('GAME OVER! Your final score is ' + result)
    }
};

// use setInterval to pass through the countdown function
// evoke every second + timerId:
let timerId  = setInterval(countDown, 1000);