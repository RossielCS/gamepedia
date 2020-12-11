import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import Header from '../../components/Header';

describe('Header', () => {
  render(<Header />, {
    initialState: {},
  });

  test('should render the title', () => {
    expect(screen.getByText('gamepedia')).toBeInTheDocument();
  });
});
