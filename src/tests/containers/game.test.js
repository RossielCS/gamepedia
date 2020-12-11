import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '../test-utils';
import Game from '../../containers/Game';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Game', () => {
  const match = {
    params: { id: '3498', name: 'Mario' },
  };
  const dataStore = {
    games: {
      fetching: false,
      error: 'Error',
      item: {},
    },
  };

  test('should display a loading spinner when fetching a game', () => {
    render(
      <Game match={match} />, {
        initialState: {},
      },
    );
    expect(screen.getByText('Loading Game')).toBeInTheDocument();
  });

  test('should display an error message if could not retrieve the information ', () => {
    const store = mockStore(dataStore);

    render(
      <Game match={match} />, {
        initialState: {},
        store,
      },
    );
    expect(screen.getByText('ERROR: Error')).toBeInTheDocument();
  });

  test('should render the game\'s information', () => {
    dataStore.games.error = '';
    dataStore.games.item = {
      name: 'mario',
      background_image: null,
      description_raw: '',
      genres: [],
      released: '',
      developers: [],
      platforms: [],
      esrb_rating: null,
      metacritic: null,
      website: '',
    };
    const store = mockStore(dataStore);

    render(
      <Game match={match} />, {
        initialState: {},
        store,
      },
    );

    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('RELEASE DATE')).toBeInTheDocument();
    expect(screen.getByText('GENRE')).toBeInTheDocument();
    expect(screen.getByText('DEVELOPER')).toBeInTheDocument();
    expect(screen.getByText('PLATFORM')).toBeInTheDocument();
    expect(screen.getByText('ESRB')).toBeInTheDocument();
    expect(screen.getByText('METACRITIC')).toBeInTheDocument();
    expect(screen.getByText('WEBSITE')).toBeInTheDocument();
  });
});
