$('.app').click(function onMapClick(event) {
    const appElement = $(this);
    const target = $(event.target);
    const userPressedShiftKey = event.shiftKey;

    if (target.hasClass('pin') && userPressedShiftKey) {
        target.remove();
    } else if (!target.hasClass('pin')) {

        const pinX = event.offsetX;
        const pinY = event.offsetY;
        
        /*
        $(.pinX) {
            left: auto;
        }
        $(.pinY) {
            top: div.hasClass('pin');
        }
        */
       const pinElement = $('<div class="pin">');
       pinElement.css('left', pinX).css('top', pinY);

        appElement.append(pinElement);
    }
});

/*console.log(this)
console.log(event)*/

