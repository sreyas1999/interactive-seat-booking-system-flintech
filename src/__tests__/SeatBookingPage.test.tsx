import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { SeatBookingPage } from '../pages/SeatBookingPage';

// Mock d3-seating-chart to avoid DOM SVG methods (like getBBox) during tests
jest.mock('d3-seating-chart', () => ({
  D3SeatingChart: {
    attach: () => undefined,
  },
  ShowBehavior: { All: 'All' },
}));

const mockStore = configureStore([]);

describe('SeatBookingPage', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore({
      movies: {
        movies: [{ id: 1, title: 'Test Movie', backdrop: '', duration: '120 min', genre: 'Action', releaseDate: '2025-01-01', rating: 4.5, description: 'Test description' }],
        selectedMovie: { id: 1, title: 'Test Movie', backdrop: '', duration: '120 min', genre: 'Action', releaseDate: '2025-01-01', rating: 4.5, description: 'Test description' }
      },
      theatres: {
        theatres: [{ id: 1, name: 'Test Theatre', seatLayout: { rows: [{ seats: [{ id: 'A1', tier: 'SILVER', isBooked: false, price: 100 }] }] } }],
        selectedTheatre: { id: 1, name: 'Test Theatre', seatLayout: { rows: [{ seats: [{ id: 'A1', tier: 'SILVER', isBooked: false, price: 100 }] }] } }
      },
      booking: { selectedSeats: [], currentBooking: null }
    });
  });

  it('renders seat booking page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/booking/1/1"]}>
          <Routes>
            <Route path="/booking/:movieId/:theatreId" element={<SeatBookingPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Select Your Seats/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Theatre/i)).toBeInTheDocument();
  });

  it('shows Book Now button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/booking/1/1"]}>
          <Routes>
            <Route path="/booking/:movieId/:theatreId" element={<SeatBookingPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Book Now/i)).toBeInTheDocument();
  });
});
