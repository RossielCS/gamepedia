const initialState = {
  categories: [],
  filter: 'All',
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    case 'CHANGE_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default filtersReducer;
