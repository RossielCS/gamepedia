import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { searchGame } from '../actions';

const GamesForm = ({ searchGame }) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (title.length) {
      dispatch(searchGame(title));
    }
  };

  return (
    <div className="Games-form">
      <div>
        <h2>SEARCH</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" id="title" value={title} placeholder="Write game's name..." onChange={handleChange} required />
          <input type="submit" value="SEARCH" />
        </form>
      </div>
    </div>
  );
};

GamesForm.propTypes = {
  searchGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({
  searchGame,
});

export default connect(null, mapDispatchToProps)(GamesForm);
