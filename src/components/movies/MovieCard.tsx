import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className="movie-card"
      onClick={movie.status !== 'coming_soon' ? handleViewDetails : undefined}
      style={movie.status === 'coming_soon' ? { cursor: 'default', pointerEvents: 'none', opacity: 0.85 } : {}}
    >
      <div className="movie-poster">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
        />
        {movie.status !== 'coming_soon' && (
          <div className="movie-rating">
            <span className="rating-icon">⭐</span>
            <span className="rating-value">{movie.rating}/10</span>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre}</p>
        
        {movie.status !== 'coming_soon' && (
          <button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="book-button"
          >
            Book tickets
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;