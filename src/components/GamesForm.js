import React, { useState } from 'react';

const GamesForm = () => {
  const [title, setTitle] = useState('');

  const handleChange = e => {
    setTitle(e.target.value);
  };

  return (
    <div className="Games-form">
      <form action={`/search/${title}`}>
        <input type="text" id="title" value={title} placeholder="Write game's name..." onChange={handleChange} required />
        <input type="submit" value="" />
      </form>
    </div>
  );
};

export default GamesForm;
