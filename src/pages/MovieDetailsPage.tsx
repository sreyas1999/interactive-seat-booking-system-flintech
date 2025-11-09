import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { setSelectedMovie } from "../redux/slices/movieSlice";
import TheatreSelector from "../components/movies/TheatreSelector";
import "../styles/MovieDetailsPage.css";

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movie = useSelector((state: RootState) =>
    state.movies.movies?.find((m) => m.id === Number(id))
  );

  useEffect(() => {
    if (movie) {
      dispatch(setSelectedMovie(movie));
    }
  }, [movie, dispatch]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <img src="/assets/logos/back_btn.png" alt="Back" />
          Back
        </button>
        <h1>{movie?.title}</h1>
      </div>

      <div className="movie-details-content">
        <div className="movie-info">
          <img
            src={movie?.backdrop}
            alt={`${movie?.title} Backdrop`}
            className="movie-backdrop"
          />
          <div className="movie-metadata">
            <div className="movie-meta-box">
              <div className="movie-meta-row ">
                <span className="movie-meta-item ">
                  <svg
                    width="18"
                    height="18"
                    fill="#4caf50"
                    style={{ marginRight: "2px" }}
                  >
                    <circle
                      cx="9"
                      cy="9"
                      r="8"
                      stroke="#4caf50"
                      strokeWidth="2"
                      fill="none"
                    />
                    <text
                      x="9"
                      y="13"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#4caf50"
                    >
                      ⏱
                    </text>
                  </svg>
                  {movie?.duration}
                </span>
                <span className="movie-meta-item ">
                  <svg
                    width="18"
                    height="18"
                    fill="#2196f3"
                    style={{ marginRight: "2px" }}
                  >
                    <rect
                      x="3"
                      y="3"
                      width="12"
                      height="12"
                      rx="3"
                      fill="#e3f2fd"
                      stroke="#2196f3"
                      strokeWidth="2"
                    />
                    <text
                      x="9"
                      y="13"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#2196f3"
                    >
                      🎬
                    </text>
                  </svg>
                  {movie?.genre}
                </span>
              </div>
              <div className="movie-meta-row">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: 500,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="#ff9800"
                    style={{ marginRight: "2px" }}
                  >
                    <circle
                      cx="9"
                      cy="9"
                      r="8"
                      stroke="#ff9800"
                      strokeWidth="2"
                      fill="#fffde7"
                    />
                    <text
                      x="9"
                      y="13"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#ff9800"
                    >
                      📅
                    </text>
                  </svg>
                  {movie?.releaseDate}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: 700,
                    color: "#ffd700",
                    fontSize: "1.1rem",
                  }}
                >
                  ⭐ {movie?.rating}
                </span>
              </div>
            </div>
            <hr />
            <p className="movie-description">{movie?.description}</p>
          </div>
        </div>

        <div className="theatre-selection" style={{ marginTop: "32px" }}>
          <h2>Select Theatre</h2>
          <TheatreSelector />
        </div>
      </div>
    </div>
  );
};
