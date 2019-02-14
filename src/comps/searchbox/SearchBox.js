import React from 'react';
// import icon from './search-icon.svg';

const SearchBox = ({ query, onSearchChange, onBtnSubmit }) => {
  return (
    <form className="SearchBox" onSubmit={onBtnSubmit}>
      <input
        className="input"
        type="search"
        name="searchfield"
        placeholder="Type a city name"
        autoFocus={true}

      />
      <button
        type='submit'
        className='search-btn'
        name="search-btn"
        >
        Search
      </button>
    </form>
  )
}

export default SearchBox;
