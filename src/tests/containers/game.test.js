import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import Game from '../../containers/Game';

describe('Game', () => {
  const match = {};

  beforeEach(() => {
    render(<Game match={match} />, {
      initialState: {},
    });
  });

  test('should render the game\'s background image', () => {
    expect(screen.getByRole('img', { class: 'art-background' })).toBeInTheDocument();
  });

  test('should render the game\'s information', () => {
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
