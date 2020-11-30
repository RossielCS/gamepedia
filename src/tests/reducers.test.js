import gamesReducer from '../reducers/games';
// import filtersReducer from '../reducers/filter';

describe('games reducer', () => {
  test('It should handle RECEIVE_GAMES_LIST', () => {
    const action = {
      type: 'RECEIVE_GAMES_LIST',
      payload: [{}],
    };

    expect(gamesReducer(undefined, action)).toEqual({
      items: [{}],
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
});

describe('filters reducer', () => {

});
