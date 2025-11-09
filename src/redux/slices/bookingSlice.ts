import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BookingState } from '../../types/booking';
import type { Seat } from '../../types/seat';
import { MAX_SEATS_PER_BOOKING } from '../../utils/constants';

const initialState: BookingState = {
  currentBooking: null,
  selectedSeats: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    toggleSeatSelection: (state, action: PayloadAction<Seat>) => {
      const seatIndex = state.selectedSeats.findIndex(
        (seat) => seat.id === action.payload.id
      );

      if (seatIndex === -1) {
        // Add seat if not already selected and within limit
        if (state.selectedSeats.length < MAX_SEATS_PER_BOOKING) {
          state.selectedSeats.push(action.payload);
          state.error = null;
        } else {
          state.error = `You can only select up to ${MAX_SEATS_PER_BOOKING} seats`;
        }
      } else {
        // Remove seat if already selected
        state.selectedSeats.splice(seatIndex, 1);
        state.error = null;
      }
    },
    clearSelectedSeats: (state) => {
      state.selectedSeats = [];
      state.error = null;
    },
    setBooking: (state, action: PayloadAction<BookingState['currentBooking']>) => {
      state.currentBooking = action.payload;
    },
    clearBooking: (state) => {
      state.currentBooking = null;
      state.selectedSeats = [];
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  toggleSeatSelection,
  clearSelectedSeats,
  setBooking,
  clearBooking,
  setLoading,
  setError,
} = bookingSlice.actions;

export const bookingReducer = bookingSlice.reducer;