import React from 'react';

const DeckList = ({ 
  deck,
  addCardToDeck,
  removeCardFromDeck
 }) => {
  let cardCount = deck.reduce((cardCount, card) => {
    return cardCount + card.count
  }, 0);

  return (
    <div id="deck">
      <h3>Your deck so far ({ cardCount } cards):</h3>
      <div className="DeckList">
      {deck.map(({ id, name, count }) => (
        <p key={ id }>
          <span>
            ({ count }x) { name }
          </span><br /> 
          <button onClick={
            () => addCardToDeck({ id, name })
          }> + </button>
          <button onClick={
            () => removeCardFromDeck({ id })
          }> - </button>
        </p>
      ))}
      </div>
    </div>
  );
}

export default DeckList;

/* 
 -We are simply mapping over the cards and displaying the correct data.

 -We use the card id as a unique key for our paragraph elements.

 -We are using reduce as a way to get the total number of cards (saving it in a variable cardCount) 
 in a deck given an array of cards.

 -'count' is a property of a single card object in the deck array. It represents the count of that specific card.

 -'cardCount' is the total number of cards in our deck (regardless of card type).
*/