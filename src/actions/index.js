const searchGame = game => ({
  type: 'SEARCH_GAME',
  game,
});

const changeFilter = filter => ({
  type: 'CHANGE_FILTER',
  filter,
});

export { searchGame, changeFilter };
