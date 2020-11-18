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
    default:
      return state;
  }
};

export default fetchReducer;
