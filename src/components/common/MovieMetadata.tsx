import React from 'react';
import '../../styles/MovieMetadata.css';

interface Movie {
  duration: string;
  genre: string;
  releaseDate: string;
  rating: number;
  description?: string;
}

interface MovieMetadataProps {
  movie: Movie;
  showDescription?: boolean;
  className?: string;
}

const MovieMetadataComponent: React.FC<MovieMetadataProps> = ({ 
  movie, 
  showDescription = true,
  className = '' 
}) => {
  return (
    <div className={`movie-metadata ${className}`}>
      <div className="movie-meta-box">
        <div className="movie-meta-row">
          <span className="movie-meta-item">
            <img src="/assets/icons/clock-icon.svg" alt="Duration" className="meta-icon" />
            {movie.duration}
          </span>
          <span className="movie-meta-item">
            <img src="/assets/icons/genre-icon.svg" alt="Genre" className="meta-icon" />
            {movie.genre}
          </span>
        </div>
        <div className="movie-meta-row">
          <span className="movie-meta-item">
            <img src="/assets/icons/calendar-icon.svg" alt="Release Date" className="meta-icon" />
            {movie.releaseDate}
          </span>
          <span className="movie-meta-rating">
            ⭐ {movie.rating}
          </span>
        </div>
      </div>
      
      {showDescription && movie.description && (
        <>
          <hr className="movie-meta-divider" />
          <p className="movie-description">{movie.description}</p>
        </>
      )}
    </div>
  );
};

MovieMetadataComponent.displayName = 'MovieMetadata';

export const MovieMetadata = React.memo(MovieMetadataComponent);