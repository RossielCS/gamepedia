import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { fetchGamesList, changeFilter } from '../actions';
import Filter from './Filter';
import iconsList from '../helpers/iconsList';
import controller from '../assets/images/i-controller-100.png';
import loadingSpinner from '../assets/images/i-wait-100.png';

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

  if (fetching) {
    return (
      <div className="loading">
        <p>Loading Games</p>
        <img src={loadingSpinner} alt="loading" />
      </div>
    );
  }

  if (error.length > 0) {
    return (
      <div className="error">
        <p>
          {`ERROR: ${error}`}
        </p>
      </div>
    );
  }

  if (filter === 'All') {
    filteredGames = items;
  } else {
    filteredGames = items.filter(x => x.genres.length);
    filteredGames = filteredGames.filter(x => x.genres[0].name === filter);
  }

  if (!fetching && !items.length) {
    return (
      <div className="error">
        <p>
          Your search did not return any results.
        </p>
      </div>
    );
  }

  return items ? (
    <div className="Games-list">
      <div className="games-filter">
        <Filter handleFilterChange={handleChangeFilter} />
      </div>
      <section className="games">
        {filteredGames.map(x => (
          <article key={x.id}>
            <Link to={`/games/${x.slug}`}>
              <div className="art-info">
                <h2>
                  {x.name.toUpperCase()}
                </h2>
                <div>
                  {x.parent_platforms
                    ? x.parent_platforms.map(a => (
                      <img src={iconsList[a.platform.name.toLowerCase()]} alt={a.platform.name} key={`platform-${addCount()}`} />
                    ))
                    : <p>N/A</p>}
                </div>
              </div>
              {x.background_image
                ? <img className="art-background" src={x.background_image} alt={x.name} />
                : <img className="art-background" src={controller} alt={x.name} />}
            </Link>
          </article>
        ))}
      </section>
    </div>
  ) : null;
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
