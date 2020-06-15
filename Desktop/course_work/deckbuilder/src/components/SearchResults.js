import React from 'react';

import Card from './Card';
import './SearchResults.css';

const SearchResults = ({ 
  results,
  addCardToDeck,
  removeCardFromDeck
}) => {
  return (
    <div id="results">
      <h3>Here's what we found ({ results.length } results):</h3>
      <div className="CardList">
        {
          results.map(result => (
            <Card 
              key={ result.id } 
              addCardToDeck={ addCardToDeck }
              removeCardFromDeck={ removeCardFromDeck }
              {...result} />
          ))
        }
      </div>
    </div>
  );
}

export default SearchResults;

/* 

{ ...result }. This is the spread operator, and it takes each 
key/value pair from the result, and adds it as a prop/value pair to the Card component...

* ...this way we quickly add a lot of props to the Card, and 
can then read them off inside the Card component definition.

*/