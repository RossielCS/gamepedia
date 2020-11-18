const initialState = {
  items: [],
  item: {},
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_GAMES_LIST':
      return {
        ...state,
        items: action.payload,
      };
    case 'RECEIVE_GAME':
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
};

export default gamesReducer;
