import React, { useCallback } from "react";
import type { Theatre } from "../../types/theatre";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setSelectedTheatre } from "../../redux/slices/theatreSlice";
import Loader from "../common/Loader";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/TheatreSelector.css";

const TheatreSelector = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: movieId } = useParams<{ id: string }>();
  const theatres = useAppSelector((state) => state.theatres.theatres);
  const selectedTheatre = useAppSelector((state) => state.theatres.selectedTheatre);
  const theatresLoading = useAppSelector((state) => state.theatres.loading);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const theatreObj = theatres.find((t: Theatre) => String(t.id) === String(selectedId));
    if (theatreObj) {
      dispatch(setSelectedTheatre(theatreObj));
      if (movieId && theatreObj.id) {
        navigate(`/booking/${movieId}/${theatreObj.id}`);
      }
    } else {
      dispatch(setSelectedTheatre(null));
    }
  }, [theatres, dispatch, movieId, navigate]);

  if (theatresLoading) {
    return <Loader />;
  }

  return (
    <div className="theatre-selector">
      <select
        id="theatre-select"
        name="theatre"
        value={selectedTheatre ? selectedTheatre.id : ""}
        onChange={handleChange}
        aria-label="Select a theatre"
      >
        <option value="">Select a theatre</option>
        {theatres.map((theatre: Theatre) => (
          <option key={theatre.id} value={theatre.id}>
            {theatre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

TheatreSelector.displayName = 'TheatreSelector';

export default React.memo(TheatreSelector);
