import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Theatre, TheatreState } from '../../types/theatre';
import { generateSeatLayout } from '../../utils/seatUtils';

const initialState: TheatreState = {
  theatres: [
    {
      id: 1,
      name: 'ABC-Multiplex',
      location: 'Downtown',
      seatLayout: generateSeatLayout('ABC-Multiplex'),
      showTimes: ['10:00 AM', '2:00 PM', '6:00 PM', '9:00 PM'],
    },
    {
      id: 2,
      name: 'XYZ-Multiplex',
      location: 'Uptown',
      seatLayout: generateSeatLayout('XYZ-Multiplex'),
      showTimes: ['11:00 AM', '3:00 PM', '7:00 PM', '10:00 PM'],
    },
  ],
  selectedTheatre: null,
  loading: false,
  error: null,
};

const theatreSlice = createSlice({
  name: 'theatres',
  initialState,
  reducers: {
    setSelectedTheatre: (state, action: PayloadAction<Theatre | null>) => {
      state.selectedTheatre = action.payload;
    },
    clearSelectedTheatre: (state) => {
      state.selectedTheatre = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSelectedTheatre, clearSelectedTheatre, setLoading, setError } = theatreSlice.actions;
export const theatreReducer = theatreSlice.reducer;