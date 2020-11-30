import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { changeFilter, fetchGamesList, fetchGame } from '../actions';

// changeFilter
describe('actions', () => {
  test('It should create an action to filter games by genre', () => {
    const filter = 'Action';
    const actionTest = { type: 'CHANGE_FILTER', payload: 'Action' };

    expect(changeFilter(filter)).toEqual(actionTest);
  });
});

// fetchGamesList
describe('async actions', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ result: [{ user: 'Bob', score: 250 }] }),
  }));

  test('It should return an object with the games information', () => {
    const games = dispatch(fetchGamesList(''));
    const actionTest = { type: 'CHANGE_FILTER', payload: 'Action' };

    expect(games).toEqual(actionTest);
  });
});
