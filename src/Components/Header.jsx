import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [searchItem, setSearchItem] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchItem(''); 
  };

  return (
    <header>
      <h1>Image Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search images..."
        />
        <Link to={`/search/${searchItem}`}>
          <button type="submit">Search</button>
        </Link>
      </form>
    </header>
  );
};

export default Header;
