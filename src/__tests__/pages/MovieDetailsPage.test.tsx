import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { MovieDetailsPage } from '../../pages/MovieDetailsPage';

const mockStore = configureStore([]);

describe('MovieDetailsPage', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore({
      movies: { 
        movies: [{ 
          id: 1, 
          title: 'Test Movie', 
          genre: 'Action', 
          rating: 4.5, 
          description: 'Test description', 
          backdrop: '/backdrop.png' 
        }],
        loading: false,
        error: null
      },
      theatres: { theatres: [], selectedTheatre: null }
    });
  });

  it('renders movie details', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movie/1"]}>
          {/* Render via route so useParams works */}
          <Routes>
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Test Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/Action/i)).toBeInTheDocument();
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
  });
});
