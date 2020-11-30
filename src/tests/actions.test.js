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

  
});
