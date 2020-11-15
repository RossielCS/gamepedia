import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import Game from '../components/Game';

const GamesList = () => {
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchGames();
  }, []);

  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    const data = await fetch('https://api.rawg.io/api/games?page_size=10');

    const fGames = await data.json();
    console.log(fGames);
    setGames(fGames.results);
  };

  return (
    <div>
      {games.map(x => (
        <h2 key={x.id}>
          <Link to={`/games/${x.slug}`}>{x.name}</Link>
        </h2>
      ))}
    </div>
  );
};

export default GamesList;
