import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard from '../../../components/movies/MovieCard';
import type { Movie } from '../../../types/movie';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('MovieCard', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    genre: 'Action',
    rating: 8.5,
    poster: '/test-poster.jpg',
    backdrop: '/test-backdrop.jpg',
    description: 'A test movie description',
    duration: '2h 00m',
    releaseDate: '2024-01-15',
    status: 'now_showing',
    language: 'English',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders movie information correctly', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('8.5/10')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('renders movie poster with correct attributes', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    const poster = screen.getByAltText('Test Movie');
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute('src', '/test-poster.jpg');
    expect(poster).toHaveAttribute('loading', 'lazy');
  });

  it('renders book tickets button for playing movies', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    expect(screen.getByText('Book tickets')).toBeInTheDocument();
  });

  it('navigates to movie details when card is clicked', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    const movieCard = screen.getByRole('img').closest('.movie-card');
    if (movieCard) {
      fireEvent.click(movieCard);
      expect(mockNavigate).toHaveBeenCalledWith('/movie/1');
    }
  });

  it('navigates to movie details when book tickets button is clicked', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    fireEvent.click(screen.getByText('Book tickets'));
    expect(mockNavigate).toHaveBeenCalledWith('/movie/1');
  });

  it('stops event propagation on book tickets button click', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    const bookButton = screen.getByText('Book tickets');
    const stopPropagationSpy = jest.fn();
    
    // Create a custom event with stopPropagation spy
    const customEvent = new MouseEvent('click', { bubbles: true });
    customEvent.stopPropagation = stopPropagationSpy;
    
    fireEvent(bookButton, customEvent);
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('handles coming soon movies correctly', () => {
    const comingSoonMovie: Movie = {
      ...mockMovie,
      status: 'coming_soon',
    };
    
    renderWithRouter(<MovieCard movie={comingSoonMovie} />);
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.queryByText('8.5/10')).not.toBeInTheDocument();
    expect(screen.queryByText('⭐')).not.toBeInTheDocument();
    expect(screen.queryByText('Book tickets')).not.toBeInTheDocument();
  });

  it('disables interaction for coming soon movies', () => {
    const comingSoonMovie: Movie = {
      ...mockMovie,
      status: 'coming_soon',
    };
    
    const { container } = renderWithRouter(<MovieCard movie={comingSoonMovie} />);
    
    const movieCard = container.querySelector('.movie-card');
    expect(movieCard).toHaveStyle({
      cursor: 'default',
      pointerEvents: 'none',
      opacity: '0.85',
    });
  });

  it('does not navigate when coming soon movie card is clicked', () => {
    const comingSoonMovie: Movie = {
      ...mockMovie,
      status: 'coming_soon',
    };
    
    const { container } = renderWithRouter(<MovieCard movie={comingSoonMovie} />);
    
    const movieCard = container.querySelector('.movie-card');
    if (movieCard) {
      fireEvent.click(movieCard);
      expect(mockNavigate).not.toHaveBeenCalled();
    }
  });

  it('has proper CSS classes', () => {
    const { container } = renderWithRouter(<MovieCard movie={mockMovie} />);
    
    expect(container.querySelector('.movie-card')).toBeInTheDocument();
    expect(container.querySelector('.movie-poster')).toBeInTheDocument();
    expect(container.querySelector('.movie-info')).toBeInTheDocument();
    expect(container.querySelector('.movie-title')).toBeInTheDocument();
    expect(container.querySelector('.movie-genre')).toBeInTheDocument();
    expect(container.querySelector('.movie-rating')).toBeInTheDocument();
    expect(container.querySelector('.rating-icon')).toBeInTheDocument();
    expect(container.querySelector('.rating-value')).toBeInTheDocument();
    expect(container.querySelector('.book-button')).toBeInTheDocument();
  });

  it('handles different movie statuses', () => {
    const { rerender } = renderWithRouter(<MovieCard movie={mockMovie} />);
    
    // Playing movie
    expect(screen.getByText('Book tickets')).toBeInTheDocument();
    
    // Coming soon movie
    const comingSoonMovie: Movie = { ...mockMovie, status: 'coming_soon' };
    rerender(<MovieCard movie={comingSoonMovie} />);
    expect(screen.queryByText('Book tickets')).not.toBeInTheDocument();
  });

  it('renders movie rating correctly', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    const ratingIcon = screen.getByText('⭐');
    const ratingValue = screen.getByText('8.5/10');
    
    expect(ratingIcon).toBeInTheDocument();
    expect(ratingValue).toBeInTheDocument();
    
    const ratingContainer = ratingIcon.closest('.movie-rating');
    expect(ratingContainer).toBeInTheDocument();
    expect(ratingContainer).toContainElement(ratingValue);
  });

  it('handles movies with different ratings', () => {
    const movieWithHighRating: Movie = { ...mockMovie, rating: 9.8 };
    const { rerender } = renderWithRouter(<MovieCard movie={movieWithHighRating} />);
    
    expect(screen.getByText('9.8/10')).toBeInTheDocument();
    
    const movieWithLowRating: Movie = { ...mockMovie, rating: 5.2 };
    rerender(<MovieCard movie={movieWithLowRating} />);
    expect(screen.getByText('5.2/10')).toBeInTheDocument();
  });

  it('handles long movie titles gracefully', () => {
    const longTitleMovie: Movie = {
      ...mockMovie,
      title: 'This is a Very Long Movie Title That Might Wrap to Multiple Lines',
    };
    
    renderWithRouter(<MovieCard movie={longTitleMovie} />);
    
    expect(screen.getByText('This is a Very Long Movie Title That Might Wrap to Multiple Lines')).toBeInTheDocument();
  });

  it('handles different genres', () => {
    const { rerender } = renderWithRouter(<MovieCard movie={mockMovie} />);
    
    expect(screen.getByText('Action')).toBeInTheDocument();
    
    const comedyMovie: Movie = { ...mockMovie, genre: 'Comedy' };
    rerender(<MovieCard movie={comedyMovie} />);
    expect(screen.getByText('Comedy')).toBeInTheDocument();
  });
});