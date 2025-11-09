import type { RootState } from "../../redux/store";
import type { Theatre } from "../../types/theatre";

import { useSelector, useDispatch } from "react-redux";
import { setSelectedTheatre } from "../../redux/slices/theatreSlice";

import { useNavigate, useParams } from "react-router-dom";


const TheatreSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: movieId } = useParams<{ id: string }>();
  const theatres = useSelector((state: RootState) => state.theatres.theatres);
  const selectedTheatre = useSelector((state: RootState) => state.theatres.selectedTheatre);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
  };

  return (
    <div className="theatre-selector">
      <select
        value={selectedTheatre ? selectedTheatre.id : ""}
        onChange={handleChange}
        style={{ width: "100%", maxWidth: "320px", padding: "8px 12px", borderRadius: "8px", border: "1.5px solid #ff6358", fontWeight: 600, fontSize: "1.08rem", background: "#fff", color: "#222" }}
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

export default TheatreSelector;
