//////////////////////////////////////////////////////////
/////// CONSTANTS /////////
const gameState = {
    players: ['X', 'O'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }

let possibleCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];


//////////////////////////////////////////////////////////
////// VARIABLES //////

let board;
let turn = 'X';
// let score;
let win;


//////////////////////////////////////////////////////////
/////// ELEMENTS ////////

// make all the elements an array that querySelectorAll returns:
//'#board-divs' are all 'square' divs:
let boxes = Array.from(document.querySelectorAll('#board div'));


//////////////////////////////////////////////////////////
/////// EVENT LISTENERS ///////

// add 'addEventListener' to target('board')

/* document.getElementById('square').click(whoseTurn); */
document.getElementById('board').addEventListener('click', whoseTurn);


// change the h3 message to display whose turn it is:
const displayMessage = document.querySelector('h3');

// add eventListener to 'playAgain button':
document.getElementById('playAgain-button').addEventListener('click', start);

//////////////////////////////////////////////////////////
///////// FUNCTIONS /////////

function winner() {
     let winningPlayer = 0;

    // winner function iterating through winningCombinations array: 
     possibleCombinations.forEach(function(combination, index) {

     if (board[combination[0]] && board[combination[0]] === board[combination[1]] 
        && board[combination[0]] === board[combination[2]]) 
        winningPlayer = board[combination[0]];
    });

    // empty space = null, else, it's a tie:
    return winningPlayer ? winningPlayer : board.includes('') ? null : 'W';
    
};
// log winner to the console:
console.log(winner)


// this function executes when the event is heard
function whoseTurn() {
    let spot = boxes.findIndex(function(box) {
        // box is the 'target' where 'event' (click) takes place
        return box === event.target;
        });
// whose turn:
        board[spot] = turn;

        console.log(board);

        // alternate turns:
        turn = turn === 'X' ? 'O' : 'X';

        win = winner();
        solve();
};

// start the game:
function start() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    solve();
};


function solve() {
    // iterate over 'board' using .forEach

    board.forEach(function(XorO, index) {
      //boxes[index].innerText = XorO;
        boxes[index].textContent = XorO;
    });

 // change displayMessage:  
    if ( win === 'W' ) {
      // use '.textContent' again
        displayMessage.textContent = `Y'all tied!`
      } else if (win) { 
        displayMessage.textContent = `${win} is the winner!`
      } else {
        displayMessage.textContent = `${turn}'s turn!`
      }
    

};
    
start();