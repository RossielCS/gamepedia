const initialState = {
  filter: 'All',
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
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
