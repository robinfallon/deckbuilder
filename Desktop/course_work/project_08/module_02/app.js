const CARD_URL = `https://api.magicthegathering.io/v1/cards?pageSize=20`

//----------------FUNCTION: renderCard(card)---------------//

function renderCard(card) {
  const cardElement = $(`<div class="card">
    <h3>${ card.name } - ${ card.manaCost }</h3>
    <h4>${ card.type }</h4>
    <h5 class="set-name">${ card.setName }</h5>
    <pre>${ card.text }</pre>
    ${ 
      card.imageUrl
      ? `<img src="${ card.imageUrl }" />`
      : ''
    }
  </div>`);

  cardElement
    .find('.set-name')
    .data('setName', card.set);

  return cardElement;
}

//-----------FUNCTION: renderCardList(cardList)-----------//

function renderCardList(cardList) {
  $('#results').empty();

  cardList.forEach(function (card) {
    $('#results').append( renderCard(card) );
  });
}
//-----------FUNCTION: fetchCardList(url)----------------//

// Function to make 2 types of request from URL:
function fetchCardList(url) {
  $('.searching').addClass('active');

  fetch(url)
    // convert to json
    .then(res => res.json())
    // render the card list && SECRET THING HERE
    .then(res => {
      $('.searching').removeClass('active');
      renderCardList(res.cards);
    });
    // render an error message
}

$('#card-search').on('submit', function (event) {
  // prevent the form from actually submitting:
  event.preventDefault();

  // read the `cardName` and `cardText` from #cname and #ctext:
  const cardName = $('#cname').val();
  const cardText = $('#ctext').val();

  // clear the values for the two elements:
  $('#cname, #ctext').val(null);

  // build the URL for fetchCardList:
  fetchCardList(`${ CARD_URL }${ 
    cardName ? `&name=${ cardName }` : ''
  }${
    cardText ? `&text=${ cardText}&` : ''
  }`);
});
    // call fetchCardList:
$('#results').on('click', '.card .set-name', function () {
  const setName = $(this).data('setName');
  fetchCardList(`&${ CARD_URL }set=${ setName }`);
});

