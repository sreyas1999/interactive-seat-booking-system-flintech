import { useState, useMemo, useCallback, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchMovies } from "../redux/slices/movieSlice";
import MovieCard from "../components/movies/MovieCard";
import Loader from "../components/common/Loader";
import "../styles/MovieList.css";

const ERROR_CONTAINER_STYLE = {
  textAlign: 'center' as const,
  padding: '60px 20px',
  color: '#d32f2f'
};

const RETRY_BUTTON_STYLE = {
  marginTop: '20px',
  padding: '12px 24px',
  background: '#ff6358',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '600'
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const CACHE_KEY = 'movies_last_fetch';

export const MovieListPage = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);
  const loading = useAppSelector((state) => state.movies.loading);
  const error = useAppSelector((state) => state.movies.error);
  const [activeFilter, setActiveFilter] = useState<
    "now_showing" | "coming_soon"
  >("now_showing");

  // Fetch movies with smart cache invalidation
  useEffect(() => {
    const lastFetch = localStorage.getItem(CACHE_KEY);
    const now = Date.now();
    
    const shouldFetch = 
      movies.length === 0 || 
      !lastFetch || 
      now - parseInt(lastFetch) > CACHE_DURATION;

    if (shouldFetch && !loading && !error) {
      dispatch(fetchMovies()).then(() => {
        localStorage.setItem(CACHE_KEY, now.toString());
      });
    }
  }, [dispatch, movies.length, loading, error]);

  const nowShowingMovies = useMemo(
    () => movies.filter((movie) => movie.status === "now_showing"),
    [movies]
  );

  const upcomingMovies = useMemo(
    () => movies.filter((movie) => movie.status === "coming_soon"),
    [movies]
  );

  const similarMovies = useMemo(
    () => nowShowingMovies.slice(0, Math.min(4, nowShowingMovies.length)),
    [nowShowingMovies]
  );

  const handleFilterClick = useCallback((filter: "now_showing" | "coming_soon") => {
    setActiveFilter(filter);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="movie-list-page">
        <div className="container">
          <div style={ERROR_CONTAINER_STYLE}>
            <h2>Failed to load movies</h2>
            <p>{error}</p>
            <button
              onClick={() => dispatch(fetchMovies())}
              style={RETRY_BUTTON_STYLE}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list-page">
      <div className="movie-list-header">
        <div className="container">
          <h1 className="movies-heading">
            <img
              src="/assets/logos/clapboard.png"
              alt="Movies"
              className="movies-icon"
            />
            <span className="movies-text">Movies</span>
          </h1>
          <div className="filters">
            <div
              className={`filter-item ${
                activeFilter === "now_showing" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("now_showing")}
            >
              Now Showing
            </div>
            <div
              className={`filter-item ${
                activeFilter === "coming_soon" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("coming_soon")}
            >
              Coming Soon
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {activeFilter === "now_showing" ? (
          <div className="movies-section">
            <div className="section-header">
              <h2>Recommended Movies</h2>
            </div>
            <div className="movie-grid">
              {nowShowingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="movies-section">
              <div className="section-header">
                <h2>Upcoming Releases</h2>
              </div>
              <div className="movie-grid">
                {upcomingMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
            {upcomingMovies.length > 0 && nowShowingMovies.length > 0 && (
              <div className="movies-section">
                <div className="section-header">
                  <h2>More Like This</h2>
                </div>
                <div className="movie-grid">
                  {similarMovies.map((movie) => (
                    <MovieCard key={`similar-${movie.id}`} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
