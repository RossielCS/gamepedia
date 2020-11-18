import { combineReducers } from 'redux';
import gamesReducer from './games';
import filtersReducer from './filter';
import fetchReducer from './fetch';

const rootReducer = combineReducers({
  filter: filtersReducer,
  games: gamesReducer,
  fetch: fetchReducer,
});

export default rootReducer;
