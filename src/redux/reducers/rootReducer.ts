import { combineReducers } from '@reduxjs/toolkit';
import { movieReducer } from '../slices/movieSlice';
import { theatreReducer } from '../slices/theatreSlice';
import { bookingReducer } from '../slices/bookingSlice';

const rootReducer = combineReducers({
  movies: movieReducer,
  theatres: theatreReducer,
  booking: bookingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;