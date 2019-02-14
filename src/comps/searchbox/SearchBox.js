import React from 'react';

const searchStyle = {
  padding: '10px',
  outlineStyle: 'none',
  borderRadius: '10px',
  border: 'none'
}

const SearchBox = ({ searchfield, onSearchChange }) => {
  return (
    <div className="SearchBox">
      <input
        className="input"
        style={searchStyle}
        type="search"
        placeholder="Type a city name"
        onChange={onSearchChange}
        autoFocus
      />
    </div>
  )
}

export default SearchBox;
