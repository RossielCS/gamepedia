import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGame } from '../actions';
import loadingSpinner from '../assets/images/i-wait-100.png';

const Game = ({
  match, item, fetching, error, fetchGame,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGame(match));
  }, [dispatch]);

  if (fetching) {
    return (
      <div className="loading">
        <p>Loading</p>
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

  console.log(item);

  return item.genres ? (
    <div className="Game">
      <header>
        <img src={item.background_image} alt={item.name} />
        <h1>{item.name}</h1>
      </header>
      <article>
        <p>
          {`ABOUT: ${item.description_raw}`}
        </p>
        <p>
          {`RELEASED: ${item.released}`}
        </p>
        <p>
          {`GENRE: ${item.genres[0].name}`}
        </p>
        <p>
          {`PLATFORMS: ${
            <ul>
              {item.developers.map(x => (
                <li key={x.id}>{x.name}</li>
              ))}
            </ul>}`}
        </p>
        <p>
          {`PLATFORMS: ${
            <ul>
              {item.parent_platforms.map(x => (
                <li key={x.platform.id}>{x.platform.name}</li>
              ))}
            </ul>}`}
        </p>
        <p>
          {`ESRB: ${item.esrb_rating.name}`}
        </p>
        <p>
          <a href={item.metacritic_url} target="_blank" rel="noreferrer">
            {`METACRITIC: ${item.metacritic}`}
          </a>
        </p>
        <p>
          <a href={item.website} target="_blank" rel="noreferrer">
            {item.website}
          </a>
        </p>
      </article>
    </div>
  ) : null;
};

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    background_image: PropTypes.string,
    description_raw: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.object),
    released: PropTypes.string,
    developers: PropTypes.arrayOf(PropTypes.object),
    parent_platforms: PropTypes.arrayOf(PropTypes.object),
    esrb_rating: PropTypes.shape({
      name: PropTypes.string,
    }),
    metacritic: PropTypes.number,
    metacritic_url: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({
  fetchGame,
});

const mapStateToProps = state => ({
  item: state.games.item,
  fetching: state.games.fetching,
  error: state.games.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
