import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Game = ({ match }) => {
  const [game, setGame] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${match.params.id}`)
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setGame(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, []);

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} />
    </div>
  );
};

Game.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Game;
