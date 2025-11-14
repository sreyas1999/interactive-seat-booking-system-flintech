import { render, screen } from '@testing-library/react';
import { MovieMetadata } from '../../../components/common/MovieMetadata';

describe('MovieMetadata', () => {
  const mockMovie = {
    duration: '148 min',
    genre: 'Action',
    releaseDate: '2023-05-15',
    rating: 4.5,
    description: 'An action-packed adventure that will keep you on the edge of your seat.'
  };

  it('renders movie metadata with all information', () => {
    render(<MovieMetadata movie={mockMovie} />);
    
    expect(screen.getByText('148 min')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('2023-05-15')).toBeInTheDocument();
    expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
  });

  it('renders description when showDescription is true (default)', () => {
    render(<MovieMetadata movie={mockMovie} />);
    
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
  });

  it('does not render description when showDescription is false', () => {
    render(<MovieMetadata movie={mockMovie} showDescription={false} />);
    
    expect(screen.queryByText(mockMovie.description)).not.toBeInTheDocument();
  });

  it('does not render description when movie has no description', () => {
    const movieWithoutDescription = {
      duration: '148 min',
      genre: 'Action',
      releaseDate: '2023-05-15',
      rating: 4.5
    };
    
    render(<MovieMetadata movie={movieWithoutDescription} />);
    
    expect(screen.queryByText(/edge of your seat/)).not.toBeInTheDocument();
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });

  it('renders all meta icons with correct alt text', () => {
    render(<MovieMetadata movie={mockMovie} />);
    
    expect(screen.getByAltText('Duration')).toBeInTheDocument();
    expect(screen.getByAltText('Genre')).toBeInTheDocument();
    expect(screen.getByAltText('Release Date')).toBeInTheDocument();
  });

  it('renders icons with correct src attributes', () => {
    render(<MovieMetadata movie={mockMovie} />);
    
    const durationIcon = screen.getByAltText('Duration');
    const genreIcon = screen.getByAltText('Genre');
    const releaseDateIcon = screen.getByAltText('Release Date');
    
    expect(durationIcon).toHaveAttribute('src', '/assets/icons/clock-icon.svg');
    expect(genreIcon).toHaveAttribute('src', '/assets/icons/genre-icon.svg');
    expect(releaseDateIcon).toHaveAttribute('src', '/assets/icons/calendar-icon.svg');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <MovieMetadata movie={mockMovie} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('movie-metadata', 'custom-class');
  });

  it('applies default className when no custom className provided', () => {
    const { container } = render(<MovieMetadata movie={mockMovie} />);
    
    expect(container.firstChild).toHaveClass('movie-metadata');
  });

  it('has proper component structure', () => {
    const { container } = render(<MovieMetadata movie={mockMovie} />);
    
    expect(container.querySelector('.movie-metadata')).toBeInTheDocument();
    expect(container.querySelector('.movie-meta-box')).toBeInTheDocument();
    expect(container.querySelectorAll('.movie-meta-row')).toHaveLength(2);
    expect(container.querySelectorAll('.movie-meta-item')).toHaveLength(3);
    expect(container.querySelector('.movie-meta-rating')).toBeInTheDocument();
  });

  it('renders description with proper structure when shown', () => {
    const { container } = render(<MovieMetadata movie={mockMovie} />);
    
    expect(container.querySelector('.movie-meta-divider')).toBeInTheDocument();
    expect(container.querySelector('.movie-description')).toBeInTheDocument();
  });

  it('handles different rating formats', () => {
    const movieWithIntegerRating = { ...mockMovie, rating: 4 };
    const movieWithDecimalRating = { ...mockMovie, rating: 4.8 };
    
    render(<MovieMetadata movie={movieWithIntegerRating} />);
    expect(screen.getByText('⭐ 4')).toBeInTheDocument();
    
    render(<MovieMetadata movie={movieWithDecimalRating} />);
    expect(screen.getByText('⭐ 4.8')).toBeInTheDocument();
  });

  it('handles different duration formats', () => {
    const movieWithDifferentDuration = { ...mockMovie, duration: '2h 30m' };
    
    render(<MovieMetadata movie={movieWithDifferentDuration} />);
    expect(screen.getByText('2h 30m')).toBeInTheDocument();
  });

  it('renders with minimal movie data', () => {
    const minimalMovie = {
      duration: '90 min',
      genre: 'Comedy',
      releaseDate: '2023-01-01',
      rating: 3.0
    };
    
    render(<MovieMetadata movie={minimalMovie} />);
    
    expect(screen.getByText('90 min')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('⭐ 3')).toBeInTheDocument();
  });
});