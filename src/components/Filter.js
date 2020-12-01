import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../store';
import { filterGenres } from '../helpers';

const Filter = ({ handleFilterChange }) => {
  let genres = [];
  const state = useSelector(store => store.games.items.length);
  if (state) {
    const items = store.getState();
    genres = filterGenres(items.games.items);
  }

  return (
    <div className="Filter">
      <div>
        <label htmlFor="filter">
          <p>filter by genre</p>
          <select onChange={e => handleFilterChange(e.target.value)}>
            <option key="All" value="All" defaultValue>All</option>
            {genres.map(
              category => (
                <option
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </option>
              ),
            )}
          </select>
        </label>
      </div>
    </div>
  );
};

Filter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;
