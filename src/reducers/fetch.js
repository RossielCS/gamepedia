const initialState = {
  fetching: false,
  error: '',
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
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

export default fetchReducer;
