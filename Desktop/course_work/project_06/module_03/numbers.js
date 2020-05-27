const VALUES = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
];

function draw(valueList) {
    $(".card-list").empty(); 

    valueList.forEach(function(value) {
        // Using the conatiner as the first jquery selector
        $(".card-list").append($(`<div class='card'>${value}</div>`))
    });
}  

draw(VALUES);



$('.controls button').click(function () {
    $('.controls .selected').removeClass('selected');
    $(this).addClass('selected');
});


someNumber % 2 === 0.



$(".even").click(function(isEven) {
    array.filter() {
        
})

$(".odd").click(function(isOdd) {

})

// When clicked, draw everything currently in the VALUES array
$(".all").click(function() {
    array.VALUES
})