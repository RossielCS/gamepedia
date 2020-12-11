import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock-jest';
import { changeFilter, fetchGamesList, fetchGame } from '../actions';

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
        results: [
          { id: 3498, name: 'Grand Theft Auto V' },
          { id: 2845, name: 'Portal' },
        ],
      },
    });

    const expectedActions = [
      { type: 'FETCH_DATA' },
      {
        type: 'RECEIVE_GAMES_LIST',
        payload: {
          results: [
            { id: 3498, name: 'Grand Theft Auto V' },
            { id: 2845, name: 'Portal' },
          ],
        },
      },
    ];
    const store = mockStore();

    return store.dispatch(fetchGamesList(''))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('It should create RECEIVE_GAMES_LIST when fetching games by title has been done', () => {
    fetchMock.get('*', {
      results: {
        results: [
          { id: 3498, name: 'Portal 2' },
          { id: 2845, name: 'Portal' },
        ],
      },
    });

    const expectedActions = [
      { type: 'FETCH_DATA' },
      {
        type: 'RECEIVE_GAMES_LIST',
        payload: {
          results: [
            { id: 3498, name: 'Portal 2' },
            { id: 2845, name: 'Portal' },
          ],
        },
      },
    ];
    const store = mockStore();

    return store.dispatch(fetchGamesList('Portal'))
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
    const store = mockStore();

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
    const store = mockStore();

    return store.dispatch(fetchGamesList(''))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  // fetchGame
  test('It should create RECEIVE_GAME when fetching game has been done', () => {
    fetchMock.get('*', { id: 3498, name: 'Mario' });

    const expectedActions = [
      { type: 'FETCH_DATA' },
      {
        type: 'RECEIVE_GAME',
        payload: { id: 3498, name: 'Mario' },
      },
    ];
    const store = mockStore();
    const match = {
      params: { id: 3498, name: 'Mario' },
    };

    return store.dispatch(fetchGame(match))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('It should create FETCH_ERROR if could not retrieve the data', () => {
    fetchMock.get('*', 404);

    const expectedActions = [
      { type: 'FETCH_DATA' },
      { type: 'FETCH_ERROR', payload: 'The data could not be retrieved.' },
    ];
    const store = mockStore();
    const match = {
      params: { id: 3498, name: 'Mario' },
    };

    return store.dispatch(fetchGame(match))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('It should create FETCH_ERROR if could not retrieve the data', () => {
    fetchMock.mock('*', () => {
      throw new Error('error');
    });

    const expectedActions = [
      { type: 'FETCH_DATA' },
      { type: 'FETCH_ERROR', payload: 'error' },
    ];
    const store = mockStore();
    const match = {
      params: { id: 3498, name: 'Mario' },
    };

    return store.dispatch(fetchGame(match))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
