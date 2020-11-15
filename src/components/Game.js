import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Game = ({ match }) => {
  const [game, setGame] = useState([]);

  const fetchGame = async () => {
    const data = await fetch(`https://api.rawg.io/api/games/${match.params.id}`);

    const fGame = await data.json();
    console.log(fGame);
    setGame(fGame);
  };

  useEffect(() => {
    fetchGame();
  }, []);

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
