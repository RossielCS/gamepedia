import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGame } from '../actions';
import loadingSpinner from '../assets/images/i-wait-100.png';

const Game = ({
  match, item, error, fetchGame,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGame(match));
  }, [dispatch]);

  if (!item.genres) {
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

  return (
    <div className="Game">
      <header>
        <img src={item.background_image} alt={item.name} />
        <h1>{item.name}</h1>
      </header>
      <div>
        <p>
          {item.genres[0].name}
          {item.description_raw}
        </p>
      </div>
    </div>
  );
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
  }).isRequired,
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
