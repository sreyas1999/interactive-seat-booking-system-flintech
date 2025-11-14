import { useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setSelectedMovie } from "../redux/slices/movieSlice";
import TheatreSelector from "../components/movies/TheatreSelector";
import { MovieMetadata } from "../components/common/MovieMetadata";
import Loader from "../components/common/Loader";
import "../styles/MovieDetailsPage.css";

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const movie = useAppSelector((state) =>
    state.movies.movies?.find((m) => m.id === Number(id))
  );
  const moviesLoading = useAppSelector((state) => state.movies.loading);

  useEffect(() => {
    if (movie) {
      dispatch(setSelectedMovie(movie));
    }
  }, [movie, dispatch]);

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const movieBackdropAlt = useMemo(
    () => `${movie?.title} Backdrop`,
    [movie?.title]
  );

  if (moviesLoading) {
    return <Loader />;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-header">
        <button className="back-btn" onClick={handleBack}>
          <img src="/assets/logos/back_btn.png" alt="Back" />
          Back
        </button>
        <h1>{movie?.title}</h1>
      </div>

      <div className="movie-details-content">
        <div className="movie-info">
          <img
            src={movie?.backdrop}
            alt={movieBackdropAlt}
            className="movie-backdrop"
          />
          <MovieMetadata movie={movie} showDescription={true} />
        </div>

        <div className="theatre-selection" style={{ marginTop: "32px" }}>
          <h2>Select Theatre</h2>
          <TheatreSelector />
        </div>
      </div>
    </div>
  );
};
