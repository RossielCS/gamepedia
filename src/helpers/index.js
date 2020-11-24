const filterGenres = items => {
  const games = [...items];
  const savedGenres = [];
  let id = null;
  const result = [];

  for (let i = 0; i < games.length; i += 1) {
    if (games[i].genres.length) {
      id = games[i].genres[0].id;
      if (!savedGenres.includes(id)) {
        savedGenres.push(id);
        result.push({
          id,
          name: games[i].genres[0].name,
        });
      }
    }
  }
  return result;
};

export default filterGenres;
