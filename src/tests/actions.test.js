import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock-jest';
import { changeFilter, fetchGamesList } from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// changeFilter
describe('actions', () => {
  test('It should create an action to filter games by genre', () => {
    const filter = 'Action';
    const actionTest = { type: 'CHANGE_FILTER', payload: 'Action' };

    expect(changeFilter(filter)).toEqual(actionTest);
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  // fetchGamesList
  test('It should create RECEIVE_GAMES_LIST when fetching games has been done', () => {
    fetchMock.get('*', {
      results: {
        results: [{ id: 3498, name: 'Grand Theft Auto V' }],
      },
    });

    const expectedActions = [
      { type: 'FETCH_DATA' },
      {
        type: 'RECEIVE_GAMES_LIST',
        payload: {
          results: [{ id: 3498, name: 'Grand Theft Auto V' }],
        },
      },
    ];
    const store = mockStore({
      items: [],
    });

    return store.dispatch(fetchGamesList(''))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('It should create FETCH_ERROR if could not retrieve the data', () => {
    fetchMock.get('https://api.rawg.io/api/games?page_size=40', 404);

    const expectedActions = [
      { type: 'FETCH_DATA' },
      { type: 'FETCH_ERROR', payload: 'The data could not be retrieved.' },
    ];
    const store = mockStore({
      items: [],
      error: '',
    });

    return store.dispatch(fetchGamesList(''))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('It should create FETCH_ERROR when fetching does not return a response', () => {
    fetchMock.mock('https://api.rawg.io/api/games?page_size=40', () => {
      throw new Error('error');
    });

    const expectedActions = [
      { type: 'FETCH_DATA' },
      { type: 'FETCH_ERROR', payload: 'error' },
    ];
    const store = mockStore({
      items: [],
      error: '',
    });

    return store.dispatch(fetchGamesList(''))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
