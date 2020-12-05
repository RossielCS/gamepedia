import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import Footer from '../../components/Footer';

describe('Header', () => {
  render(<Footer />, {
    initialState: {},
  });

  test('should render the credits', () => {
    expect(screen.getByText('Built by Rossiel Carranza')).toBeInTheDocument();
    expect(screen.getByText('Design based in')).toBeInTheDocument();
    expect(screen.getByText('NomNom')).toBeInTheDocument();
    expect(screen.getByText('by')).toBeInTheDocument();
    expect(screen.getByText('Marc-Antoine Roy')).toBeInTheDocument();
  });
});
