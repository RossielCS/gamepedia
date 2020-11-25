import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { fetchGamesList, changeFilter } from '../actions';
import Filter from '../components/Filter';

const GamesList = ({
  match, items, filter, fetching, error, fetchGamesList, changeFilter,
}) => {
  const dispatch = useDispatch();
  let filteredGames = [];

  const handleChangeFilter = filter => {
    changeFilter(filter);
  };

  useEffect(() => {
    let { query } = match.params;
    if (query) {
      query = encodeURIComponent(query);
    } else {
      query = {};
    }
    dispatch(fetchGamesList(query));
  }, []);

  if (fetching) return <div>Loading...</div>;
  if (error.length > 0) return <div>{`ERROR: ${error}`}</div>;

  if (filter === 'All') {
    filteredGames = items;
  } else {
    filteredGames = items.filter(x => x.genres.length);
    filteredGames = filteredGames.filter(x => x.genres[0].name === filter);
  }

  return (
    <div className="Games-list">
      <Filter handleFilterChange={handleChangeFilter} />
      <div>
        {filteredGames.map(x => (
          <h2 key={x.id}>
            <Link to={`/games/${x.slug}`}>{x.name}</Link>
          </h2>
        ))}
      </div>
    </div>
  );
};

GamesList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchGamesList: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchGamesList,
  changeFilter: filter => dispatch(changeFilter(filter)),
});

const mapStateToProps = state => ({
  items: state.games.items,
  filter: state.filter.filter,
  fetching: state.games.fetching,
  error: state.games.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
