import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import Footer from '../../components/Footer';

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />, {
      initialState: {},
    });
  });

  test('should render the credits', () => {
    expect(screen.getByText('Built by Rossiel Carranza')).toBeInTheDocument();
    expect(screen.getByText('Design based in')).toBeInTheDocument();
    expect(screen.getByText('NomNom')).toBeInTheDocument();
    expect(screen.getByText('by')).toBeInTheDocument();
    expect(screen.getByText('Marc-Antoine Roy')).toBeInTheDocument();
  });

  test('should render the social media icons and names', () => {
    expect(screen.getByAltText('github')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByAltText('linkedin')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByAltText('email')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});
