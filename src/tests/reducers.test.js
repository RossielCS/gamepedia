import gamesReducer from '../reducers/games';
import filtersReducer from '../reducers/filter';

describe('games reducer', () => {
  test('It should handle RECEIVE_GAMES_LIST', () => {
    const action = {
      type: 'RECEIVE_GAMES_LIST',
      payload: [
        { id: 3498, name: 'Grand Theft Auto V' },
        { id: 2845, name: 'Portal' },
      ],
    };

    expect(gamesReducer(undefined, action)).toEqual({
      items: [
        { id: 3498, name: 'Grand Theft Auto V' },
        { id: 2845, name: 'Portal' },
      ],
      item: {},
      fetching: false,
      error: '',
    });
  });

  test('It should handle RECEIVE_GAME', () => {
    const action = {
      type: 'RECEIVE_GAME',
      payload: { id: 1234, name: 'Minecraft' },
    };

    expect(gamesReducer(undefined, action)).toEqual({
      items: [],
      item: { id: 1234, name: 'Minecraft' },
      fetching: false,
      error: '',
    });
  });

  test('It should handle FETCH_DATA', () => {
    const action = {
      type: 'FETCH_DATA',
    };

    expect(gamesReducer(undefined, action)).toEqual({
      items: [],
      item: {},
      fetching: true,
      error: '',
    });
  });

  test('It should handle FETCH_ERROR', () => {
    const action = {
      type: 'FETCH_ERROR',
      payload: 'error message',
    };

    expect(gamesReducer(undefined, action)).toEqual({
      items: [],
      item: {},
      fetching: false,
      error: 'error message',
    });
  });

  test('It should return a state by default', () => {
    const action = {};

    expect(gamesReducer(undefined, action)).toEqual({
      items: [],
      item: {},
      fetching: false,
      error: '',
    });
  });
});

describe('filters reducer', () => {
  test('It should handle CHANGE_FILTER', () => {
    const action = {
      type: 'CHANGE_FILTER',
      payload: 'Action',
    };

    expect(filtersReducer(undefined, action)).toEqual({
      filter: 'Action',
    });
  });

  test('It should return a state by default', () => {
    const action = {};

    expect(filtersReducer(undefined, action)).toEqual({
      filter: 'All',
    });
  });
});
