import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { fetchGamesList, changeFilter } from '../actions';
import GamesForm from '../components/GamesForm';
import Filter from '../components/Filter';
import iconsList from '../helpers/iconsList';

const GamesList = ({
  match, items, filter, fetching, error, fetchGamesList, changeFilter,
}) => {
  const dispatch = useDispatch();
  let filteredGames = [];
  let idCount = 0;

  const addCount = () => {
    idCount += 1;
    return idCount;
  };

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

  if (fetching) return <div className="loading">Loading...</div>;
  if (error.length > 0) return <div>{`ERROR: ${error}`}</div>;

  if (filter === 'All') {
    filteredGames = items;
  } else {
    filteredGames = items.filter(x => x.genres.length);
    filteredGames = filteredGames.filter(x => x.genres[0].name === filter);
  }

  console.log(filteredGames);

  return (
    <div className="Games-list">
      <GamesForm />
      <Filter handleFilterChange={handleChangeFilter} />
      <section className="games">
        {filteredGames.map(x => (
          <article key={x.id}>
            <Link to={`/games/${x.slug}`}>
              <p>
                {x.name.toUpperCase()}
                {x.parent_platforms.map(a => (
                  <span key={`platform-${addCount()}`}>{a.platform.name}</span>
                ))}
              </p>
              <img src={x.background_image} alt={x.name} />
            </Link>
          </article>
        ))}
      </section>
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
