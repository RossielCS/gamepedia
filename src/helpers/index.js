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

const changeStringValue = (item, itemKeys) => {
  const gameData = {};
  const stringProps = [...itemKeys.stringValue];

  for (let i = 0; i < stringProps.length; i += 1) {
    if (!item[stringProps[i]]) {
      gameData[stringProps[i]] = 'N/A';
    } else {
      gameData[stringProps[i]] = item[stringProps[i]];
    }
  }
  return gameData;
};

const changeArrayValue = (item, itemKeys) => {
  const gameData = {};
  const stringProps = [...itemKeys.arrayValue];
  for (let i = 0; i < stringProps.length; i += 1) {
    if (item[stringProps[i]] === null) {
      gameData[stringProps[i]] = { name: 'N/A' };
    } else if (item[stringProps[i]].length === 0) {
      if (stringProps[i] === 'platforms') {
        gameData[stringProps[i]] = [{ platform: { id: i, name: 'N/A' } }];
      } else {
        gameData[stringProps[i]] = [{ id: i, name: 'N/A' }];
      }
    } else {
      gameData[stringProps[i]] = item[stringProps[i]];
    }
  }

  return gameData;
};

const changeEmptyProperties = (item, itemKeys) => {
  const data = {
    ...(changeStringValue(item, itemKeys)),
    ...(changeArrayValue(item, itemKeys)),
  };
  return data;
};

export { filterGenres, changeEmptyProperties };
