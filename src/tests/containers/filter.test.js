import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import Filter from '../../containers/Filter';

describe('Filter', () => {
  const change = jest.fn();
  beforeEach(() => {
    render(<Filter handleFilterChange={change} />, {
      initialState: {},
    });
  });

  test('should render the select element', () => {
    expect(screen.getByText('filter by genre')).toBeInTheDocument();
  });

  test('should render the option \'All\' by default', () => {
    expect(screen.getByDisplayValue('All')).toBeInTheDocument();
  });
});
