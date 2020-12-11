import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '../test-utils';
import GamesList from '../../containers/GamesList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('GamesList', () => {
  const match = { params: { query: '' } };
  const fetchGames = jest.fn();
  const changeFilter = jest.fn();
  const dataStore = {
    filter: { filter: 'All' },
    games: {
      fetching: false,
      error: '',
      items: [],
    },
  };

  test('should render the loading animation when fetching information', () => {
    dataStore.games.fetching = true;
    const store = mockStore(dataStore);

    render(<GamesList
      match={match}
      fetchGamesList={fetchGames}
      changeFilter={changeFilter}
    />,
    {
      initialState: {},
      store,
    });
    expect(screen.getByText('Loading Games')).toBeInTheDocument();
  });

  test('should render the games\' information', () => {
    dataStore.games.items = [{
      id: 1,
      name: 'mario',
      background_image: null,
      parent_platforms: null,
    }];
    dataStore.games.fetching = false;
    const store = mockStore(dataStore);

    render(
      <Router>
        <GamesList
          match={match}
          fetchGamesList={fetchGames}
          changeFilter={changeFilter}
        />
      </Router>, {
        initialState: {},
        store,
      },
    );

    expect(screen.getByText('MARIO')).toBeInTheDocument();
  });

  test('should display an error message if could not retrieve the information', () => {
    dataStore.games.error = 'Error';
    const store = mockStore(dataStore);

    render(
      <GamesList
        match={match}
        fetchGamesList={fetchGames}
        changeFilter={changeFilter}
      />, {
        initialState: {},
        store,
      },
    );
    expect(screen.getByText('ERROR: Error')).toBeInTheDocument();
  });

  test('should display a message in case the search did not return any results', () => {
    dataStore.games.error = '';
    dataStore.games.items = [];
    const store = mockStore(dataStore);

    render(
      <GamesList
        match={match}
        fetchGamesList={fetchGames}
        changeFilter={changeFilter}
      />, {
        initialState: {},
        store,
      },
    );
    expect(screen.getByText('Your search did not return any results.')).toBeInTheDocument();
  });
});
