import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import Filter from '../../containers/Filter';

describe('Filter', () => {
  const change = jest.fn();
  render(<Filter handleFilterChange={change} />, {
    initialState: {},
  });

  test('should render the form element', () => {
    expect(screen.getByText('filter by genre')).toBeInTheDocument();
  });
});
