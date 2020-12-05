import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import GamesForm from '../../components/GamesForm';

describe('GamesForm', () => {
  render(<GamesForm />, {
    initialState: {},
  });

  test('should render the form element', () => {
    expect(screen.getByPlaceholderText('Write game\'s name...')).toBeInTheDocument();
  });
});
