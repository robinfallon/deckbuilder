//-----------------CALCULATOR---------------


let heldValue = null;
let heldOperation = null;
let nextValue = null;


$('.digits button').click(function() {
    /* Replace "null" with "0" */
    if (nextValue === null) {
        nextValue = '0';
    }
    /* Add text from button pressed to current text of nextValue */
    /* Set the text of .next-value to be what's stored in nextValue */
    nextValue = nextValue + $(this).text();
    console.log(nextValue);
    updateDisplay()
});
    
/*------------FUNCTIONS TO UPDATE DISPLAY--------------*/

function showValue(location, value) {
    if (value === null) {
      $(location).text("");
    } else {
      $(location).text(Number(value));
    }
}

function updateDisplay() {
    /* Call showValue twice: */
    showValue('.held-value', heldValue);
    showValue('.next-value', nextValue);
}

/*---------------CLEAR ALL & CLEAR ENTRY--------------*/

function clearAll() {
    heldValue = null;
    heldOperation = null;
    nextValue = null;
    $(".next-operation").text("");
    updateDisplay();
}

$(".clear-all").click(function() {
    clearAll();
    updateDisplay();
});

function clearEntry() {
    nextValue = null;
    updateDisplay();
}

$(".clear-entry").click(function() {
    clearEntry();
    updateDisplay();
});

/*----------------HELPER FUNCTIONS-------------------*/

function add(x, y) {
    return Number(x) + Number(y)
}

function subtract(x, y) {
    return Number(x) - Number(y)
}

function multiply(x, y) {
    return Number(x) * Number(y)
}

function divide(x, y) {
    return Number(x) / Number(y)
}

function setHeldOperation(operation) {
   /*(Run heldOperation and store result in heldValue)*/
    null !== heldOperation
    /*If*/
    ?heldValue = heldOperation(heldValue, nextValue)

    /*Else if*/
    :null !== nextValue && (heldValue = nextValue),
    
    /*Regardless*/
    nextValue = null, 
    heldOperation = location
}


/*------------CLICK HANDLERS FOR OPERATIONS-----------*/

$('.add').click(function() {
    /* Call it, pass the function 'add' */
    setHeldOperation(add);
    /* Set the text of .next-operation to 'add' */
    $('.next-operation').text('+');
    /* Call updateDisplay */
    updateDisplay();
});

$('.subtract').click(function() {
    setHeldOperation(subtract);
    $('.next-operation').text('-');
    updateDisplay();
});

$('.multiply').click(function() {
    setHeldOperation(multiply);
    $('.next-operation').text('*');
    updateDisplay();
});

$('.divide').click(function() {
    setHeldOperation(divide);
    $('.next-operation').text('/');
    updateDisplay();
});

$(".equals").click(() => {
    setHeldOperation(null);
    $(".next-operation").text("");
    updateDisplay();
  });

$('.clear-all').click(function() {
    clearAll(),
    $('.next-operation').text('');
    updateDisplay();
});

$('.clear-entry').click(function() {
    clearEntry(),
    updateDisplay();
});

/*  Call functions ? 
clearAll(),

updateDisplay();

*/
