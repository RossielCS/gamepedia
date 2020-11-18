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
    default:
      return state;
  }
};

export default gamesReducer;
