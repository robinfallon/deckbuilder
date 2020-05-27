/* ---begin MAKEGRID function--- */

function makeGrid() {
    for (let index = 0; index < 64; index++) {
    const cell = $('<div class = "cell" />');
    $('.grid').append(cell);
 }
}
makeGrid();

/* ---end MAKEGRID function--- */



/* ---begin MAKEPALETTE function--- */
function makePalette() {
    const palette = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'rebeccapurple',
        'pink',
        'white',
        'black'
    ];

 for (let index = 0; index < palette.length; index = index + 1) {
    // access the color
    const nextColor = palette[index]
    // rest of code below



    const button = $('<button/>');

    button.css('backgroundColor', palette[index])
    button.appendTo('.palette');
  } 
  $('.palette button').first().addClass('active');

 }

makePalette();

/* ---end MAKEPALETTE function--- */



/* ---begin ONPALETTECLICK function--- */

function onPaletteClick() {
    $('.palette .active').removeClass('active');
    $(this).addClass('active');
}
$('.palette button').click(onPaletteClick);

/* ---end ONPALETTECLICK function--- */



/* ---begin ONGRIDCLICK function--- */

function onGridClick() {
    let activeColor = $('.palette .active').css('backgroundColor');
    let cellColor = $(this).css('backgroundColor');

    if (cellColor === activeColor) {
        $(this).css('backgroundColor', '');
    } else {
        $(this).css('backgroundColor', activeColor);
    }
}    
$('.grid .cell').click(onGridClick);

/* ---end ONGRIDCLICK function--- */



/* ---begin ONCLEARCLICK function--- */

function onClearClick() {
    $('.grid .cell').css('backgroundColor', '');

}
$('.controls .clear').click(onClearClick);

/* ---end ONCLEARCLICK function--- */



/* ---begin ONFILLALLCLICK function--- */

function onFillAllClick() {
    let activeColor = $('.palette .active').css('backgroundColor');
    let gridColor = $('.grid .cell').css('backgroundColor', activeColor);
    
    /*if (cellColor === '') {
        $(this).css('backgroundColor', activeColor);
    }*/
}
$('.controls .fill-all').click(onFillAllClick);

/* ---end ONFILLALLCLICK function--- */



/* ---begin ONFILLEMPTYCLICK function--- */

function onFillEmptyClick() {
    let activeColor = $('.palette .active').css('backgroundColor');
    let cells = $('.cell');

    for (let i = 0; i < cells.length; i++) {
      let cell = $(cells[i]);

        console.log($(cell).css('backgroundColor'))

      if (cell.css('backgroundColor') == 'rgba(0, 0, 0, 0)') {
        cell.css('backgroundColor', activeColor);
      }
    }
}
$('.controls .fill-empty').click(onFillEmptyClick);

/* ---end ONFILLEMPTYCLICK function--- */