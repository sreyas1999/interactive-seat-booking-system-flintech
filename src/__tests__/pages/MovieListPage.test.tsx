import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { MovieListPage } from '../../pages/MovieListPage';

// Mock fetch
global.fetch = jest.fn();

const mockStore = configureStore([]);

describe('MovieListPage', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore({
      movies: { 
        movies: [{ 
          id: 1, 
          title: 'Test Movie', 
          genre: 'Action', 
          rating: 4.5, 
          status: 'now_showing', 
          poster: '/assets/poster.png' 
        }],
        loading: false,
        error: null
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store.dispatch = jest.fn(() => Promise.resolve()) as any;
  });

  it('renders movie list', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <MovieListPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Test Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/Action/i)).toBeInTheDocument();
  });
});
