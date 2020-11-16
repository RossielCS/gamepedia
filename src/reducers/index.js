import { combineReducers } from 'redux';
import gamesReducer from './games';
import filtersReducer from './filter';

const rootReducer = combineReducers({
  games: gamesReducer,
  filter: filtersReducer,
});

export default rootReducer;
