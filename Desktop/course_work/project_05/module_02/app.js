//------------------COLOR SLIDER---------------------
let color1 = 'red';
let color2 = 'green';
let color3 = 'blue';

function updateValues() {
    color1 = $('#red').val();
    color2 = $('#green').val();
    color3 = $('#blue').val();
}
updateValues();

function updatePage() {
    let finalColor = `rgb(${color1}, ${color2}, ${color3})`
    $('.red-value').text(color1);
    $('.green-value').text(color2);
    $('.blue-value').text(color3);
    $('.preview').css('backgroundColor', finalColor);

    //"rgb(60, 50, 210)"
}
updatePage();

function updateAll() {
    updateValues();
    updatePage();
}

$(document).ready(function() {
    updateAll();
    $('.controls input').on('input', updateAll);
});