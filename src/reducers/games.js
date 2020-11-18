const gamesReducer = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_GAMES_LIST':
      return [
        ...action.payload,
      ];
    default:
      return state;
  }
};

export default gamesReducer;
