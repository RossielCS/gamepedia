import { combineReducers } from 'redux';
import gamesReducer from './games';
import filtersReducer from './filter';

const rootReducer = combineReducers({
  filter: filtersReducer,
  games: gamesReducer,
});

export default rootReducer;
