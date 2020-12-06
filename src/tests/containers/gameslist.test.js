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

  test('should render the loading animation when fetching information', () => {
    const store = mockStore({
      filter: { filter: 'All' },
      games: {
        fetching: true,
        error: '',
        items: [],
      },
    });
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

  test('should render the games information', () => {
    const store = mockStore({
      filter: { filter: 'All' },
      games: {
        fetching: false,
        error: '',
        items: [{
          id: 1,
          name: 'mario',
          background_image: null,
          parent_platforms: null,
        }],
      },
    });
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

  test('should display an error message if could not retrieve the information ', () => {
    const store = mockStore({
      filter: { filter: 'All' },
      games: {
        fetching: false,
        error: 'Error',
        items: [],
      },
    });
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
});
