import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import App from '../../components/App';

describe('App', () => {
  test('should render all components', () => {
    render(<App />, {
      initialState: {},
    });

    expect(screen.getByText('gamepedia')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write game\'s name...')).toBeInTheDocument();
    expect(screen.getByText('Loading Games')).toBeInTheDocument();
    expect(screen.getByText('Built by Rossiel Carranza')).toBeInTheDocument();
  });
});
