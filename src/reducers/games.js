const gamesReducer = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_GAME':
      return action.game;
    default:
      return state;
  }
};

export default gamesReducer;
