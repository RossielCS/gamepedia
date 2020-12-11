import React, { useState } from 'react';
import search from '../assets/images/search-24.png';

const GamesForm = () => {
  const [title, setTitle] = useState('');

  const handleChange = e => {
    setTitle(e.target.value);
  };

  return (
    <div className="Games-form">
      <form action={`/search/${title}`}>
        <input type="text" id="title" value={title} placeholder="Write game's name..." onChange={handleChange} required />
        <button type="submit">
          <img src={search} alt="search" />
        </button>
      </form>
    </div>
  );
};

export default GamesForm;
