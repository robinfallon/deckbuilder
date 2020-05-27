// Pick first player
// Enable players
// Disable players
// Move Marbles
// Create (pit) marble layers
// Create (store) marble layers
// Check if game is over
// Determine the winner
/*----- CONSTANTS -----*/

const board = [
  4, 4, 4, 4, 4, 4, 0, /* player 1 */ 
  4, 4, 4, 4, 4, 4, 0 /* player 2 */
];

const gameState = {
  board: board, // from above
  currentPlayer: 0 // switch to 1 when the player swaps
}

//---------------------------THE STATE--------------------------------


/*----- ELEMENTS */
const binOne = Array.from(document.querySelectorAll('#binOne div'));

const binOne = Array.from(document.querySelectorAll('#binTwo div'));

/////////////////////////////////////////////////////////////
//----------------GLOBAL VARIABLES------------------

let totalMarbles = 24;
let board;
let turn = 'Player 1';
let startIndex = null;
let endIndex = null;
let endRow = null;
let win;

/////////////////////////////////////////////////////////////
/*----- EVENT LISTENERS -----*/

document.getElementById('binOne').addEventListener('click', playerTurn);

document.getElementById('binTwo').addEventListener('click', playerTurn);

document.getElementById('storeOne').addEventListener('click', playerTurn);

document.getElementById('storeTwo').addEventListener('click', playerTurn);



const messages = document.querySelector('player-1, player-2');

/////////////////////////////////////////////////////////////
/*----- FUNCTIONS -----*/

function findWinner() {}

function playerTurn() {}

function initialState() {}










//--------------------GAME LOOP-----------------------
/* "game loop": show state -> wait for input 
-> update state -> go to step 1 */


// Starting state
let initialState;

/*
const myVariables = function(event) {

}
*/
function buildInitialState() {

}

// How do I display the state of the game to the user?
function renderState() {

}

// maybe a dozen or so helper functions for tiny pieces of the interface

function clickOnPit() {
  let pit = $(event.currentTarget);
  totalMarbles = $(pit).length;

  if ($pit.hasClass('pitOne')) {
    playerOneMarbles -= totalMarbles; // playerOneMarbles = playerOneMarbles - totalMarbles
  } else {
    playerTwoMarbles -= totalMarbles; // playerTwoMarbles = playerTwoMarbles - totalMarbles
  }
}

function pickUpMarbles(event) {
  console.log('pickUpMarbles');
    const $pit = $(event.currentTarget);
}

function distributeFirstMarble(event) {
  $('pitOne').add('marble-1')
  // for (i = 0; i < )
}

function distributeSecondMarble(event) {

}

function distributeThirdMarble(event) {

}

function distributeFourthMarble(event) {

}


// What controls/interface do I make available to the user?
function onBoardClick() {

  // update state, maybe with another dozen or so helper functions...

// How does each interaction update the state?  

  renderState() // show the user the new state
}



// Pick first player
// Enable players
// Disable players
// Move Marbles
// Create (pit) marble layers
// Create (store) marble layers
// Check if game is over
// Determine the winner


const enablePlayer1 = () => {
  console.log('enablePlayer1');
  $('#player-1').css('color', 'black');
    $('.hole-1').on('click', setVariables);
}