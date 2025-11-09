import { configureStore } from '@reduxjs/toolkit';
import { movieReducer } from './slices/movieSlice';
import { theatreReducer } from './slices/theatreSlice';
import { bookingReducer } from './slices/bookingSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    theatres: theatreReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;