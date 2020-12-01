const filterGenres = items => {
  const games = [...items];
  const savedGenres = [];
  let id;
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

const changeEmptyProperties = (item, itemKeys) => {
  const data = {
    ...(changeStringValue(item, itemKeys)),
    ...(changeArrayValue(item, itemKeys)),
  };

  return data;
};

export { filterGenres, changeEmptyProperties };
