import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.rawg.io/api/games?page_size=10')
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setGames(result.results);
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
      {games.map(x => (
        <h2 key={x.id}>
          <Link to={`/games/${x.slug}`}>{x.name}</Link>
        </h2>
      ))}
    </div>
  );
};

export default GamesList;
