const initialState = {
  items: [],
  item: {},
  fetching: false,
  error: '',
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_GAMES_LIST':
      return {
        ...state,
        items: action.payload,
        fetchedList: true,
        fetching: false,
      };
    case 'RECEIVE_GAME':
      return {
        ...state,
        item: action.payload,
        fetching: false,
      };
    case 'SEARCH_GAME':
      return {
        ...state,
        items: action.payload,
        fetching: false,
      };
    case 'FETCH_DATA':
      return {
        ...state,
        item: {},
        fetching: true,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default gamesReducer;
