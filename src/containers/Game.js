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

  return item.genres ? (
    <div className="Game">
      <header>
        <img src={item.background_image} alt={item.name} />
        <h2>{item.name}</h2>
      </header>
      <article>
        <div className="art-about">
          <p className="about-title">ABOUT</p>
          <p className="about-desc">{item.description_raw}</p>
        </div>
        <section className="art-info">
          <ul>
            <p>RELEASE DATE</p>
            <li>{item.released}</li>
          </ul>
          <ul>
            <p>GENRE</p>
            {item.genres.map(x => (
              <li key={x.id}>{x.name}</li>
            ))}
          </ul>
          <ul>
            <p>DEVELOPER</p>
            {item.developers.map(x => (
              <li key={x.id}>{x.name}</li>
            ))}
          </ul>
          <ul>
            <p>PLATFORM</p>
            {item.platforms.map(x => (
              <li key={x.platform.id}>{x.platform.name}</li>
            ))}
          </ul>
          <ul>
            <p>ESRB</p>
            <li>{item.esrb_rating.name}</li>
          </ul>
          <ul>
            <p>METACRITIC</p>
            <li>
              <a href={item.metacritic_url} target="_blank" rel="noreferrer">
                {item.metacritic}
              </a>
            </li>
          </ul>
          <ul>
            <p>WEBSITE</p>
            <li>
              <a href={item.website} target="_blank" rel="noreferrer">
                {item.website}
              </a>
            </li>
          </ul>
        </section>
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
    developers: PropTypes.arrayOf(PropTypes.any),
    platforms: PropTypes.arrayOf(PropTypes.any),
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
