import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGame } from '../actions';
import loadingSpinner from '../assets/images/i-wait-100.png';
import controller from '../assets/images/i-controller-100.png';

const Game = ({
  match, item, fetching, error, fetchGame,
}) => {
  const dispatch = useDispatch();
  const itemKeys = [
    'description_raw', 'genres',
    'released', 'developers', 'platforms',
    'metacritic', 'metacritic_url', 'website',
  ];
  const itemData = {};

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

  if (Object.keys(item).length) {
    let data;
    for (let i = 0; i < itemKeys.length; i += 1) {
      data = item[itemKeys[i]];
      if (data === null) {
        itemData[itemKeys[i]] = 'N/A';
      } else if (typeof data === 'object') {
        if (data.length === 0) {
          itemData[itemKeys[i]] = [{ id: i, name: 'N/A' }];
        } else {
          itemData[itemKeys[i]] = [...data];
        }
      } else if (typeof data === 'string' && data.length === 0) {
        itemData[itemKeys[i]] = 'N/A';
      } else {
        itemData[itemKeys[i]] = item[itemKeys[i]];
      }
    }
  }

  return item.genres ? (
    <div className="Game">
      <header>
        {item.background_image
          ? <img className="art-background" src={item.background_image} alt={item.name} />
          : <img className="art-background" src={controller} alt={item.name} />}
        <h2>{item.name}</h2>
      </header>
      <article>
        <div className="art-about">
          <p className="about-title">ABOUT</p>
          <p className="about-desc">{itemData.description_raw}</p>
        </div>
        <section className="art-info">
          <ul>
            <p>RELEASE DATE</p>
            <li>{itemData.released}</li>
          </ul>
          <ul>
            <p>GENRE</p>
            {itemData.genres.map(x => (
              <li key={x.id}>{x.name}</li>
            ))}
          </ul>
          <ul>
            <p>DEVELOPER</p>
            {itemData.developers.map(x => (
              <li key={x.id}>{x.name}</li>
            ))}
          </ul>
          <ul>
            <p>PLATFORM</p>
            {itemData.platforms.map(x => (
              <li key={x.platform.id}>{x.platform.name}</li>
            ))}
          </ul>
          <ul>
            <p>ESRB</p>
            {item.esrb_rating
              ? <li>{item.esrb_rating.name}</li>
              : <li>N/A</li>}
          </ul>
          <ul>
            <p>METACRITIC</p>
            <li>
              <a href={item.metacritic_url} target="_blank" rel="noreferrer">
                {itemData.metacritic}
              </a>
            </li>
          </ul>
          <ul>
            <p>WEBSITE</p>
            <li>
              <a href={item.website} target="_blank" rel="noreferrer">
                {itemData.website}
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
