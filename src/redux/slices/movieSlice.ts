import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Movie, MovieState } from '../../types/movie';
import { DUMMY_MOVIES } from '../../utils/constants';

const initialState: MovieState = {
  movies: Array.from(DUMMY_MOVIES),
  selectedMovie: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<Movie>) => {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSelectedMovie, clearSelectedMovie, setLoading, setError } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;