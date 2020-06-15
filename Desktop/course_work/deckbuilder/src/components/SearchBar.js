import React, { useState } from 'react';

import {
  fetchCards,
} from '../api';

const SearchBar = ({ setResults }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleNameChange = event => {
    setName( event.target.value );
  }

  const handleTextChange = event => {
    setText( event.target.value );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cards = await fetchCards({
      name,
      text
    });

    setResults(cards);
  }

  return (
    <div id="search">
      <h3>Look up cards here...</h3>
      <form onSubmit={ handleSubmit }>
        <input
          type="text" 
          placeholder="card name"
          value={ name }
          onChange={ handleNameChange } />
        <input
          type="text"
          placeholder="card text"
          value={ text }
          onChange={ handleTextChange } />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
/* 
Here, we create a handleSubmit function
1. Prevent the form from submitting, as always...
2. Then we await the return of our fetchCards method, and pass the results into setResults. 

That will update the value of results back up at App, and since that's a prop of SearchResults, 
the SearchResults component will re-render.

Our state lives up in App, and flows back and forth between the SearchBar and 
SearchResults. This is a common pattern.
*/