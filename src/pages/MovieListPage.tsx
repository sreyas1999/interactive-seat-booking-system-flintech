import { useState, useMemo, useCallback } from "react";
import { useAppSelector } from "../redux/hooks";
import MovieCard from "../components/movies/MovieCard";
import Loader from "../components/common/Loader";
import "../styles/MovieList.css";

export const MovieListPage = () => {
  const movies = useAppSelector((state) => state.movies.movies);
  const loading = useAppSelector((state) => state.movies.loading);
  const [activeFilter, setActiveFilter] = useState<
    "now_showing" | "coming_soon"
  >("now_showing");

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
