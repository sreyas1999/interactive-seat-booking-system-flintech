import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SeatGrid from '../../../components/booking/SeatGrid';
import { toggleSeatSelection } from '../../../redux/slices/bookingSlice';
import type { Theatre } from '../../../types/theatre';
import type { Seat as SeatType } from '../../../types/seat';

// Mock the Seat component
jest.mock('../../../components/booking/Seat', () => {
  return function MockSeat({ seat, onSelect }: { seat: SeatType; onSelect: (seat: SeatType) => void }) {
    return (
      <button 
        onClick={() => onSelect(seat)}
        data-testid={`seat-${seat.id}`}
        className={`seat ${seat.isSelected ? 'selected' : ''} ${seat.isBooked ? 'booked' : ''}`}
      >
        {seat.number}
      </button>
    );
  };
});

// Mock the constants
jest.mock('../../../utils/constants', () => ({
  MAX_SEATS_PER_BOOKING: 8,
}));

const mockStore = configureStore([]);

describe('SeatGrid', () => {
  let store: ReturnType<typeof mockStore>;

  const createMockTheatre = (): Theatre => ({
    id: 1,
    name: 'Test Theatre',
    location: 'Test Location',
    showTimes: ['10:00 AM', '2:00 PM'],
    seatLayout: {
      rows: [
        {
          rowLabel: 'A',
          seats: [
            { id: 'A1', row: 'A', number: 1, isBooked: false, isSelected: false, tier: 'SILVER', price: 100 },
            { id: 'A2', row: 'A', number: 2, isBooked: false, isSelected: false, tier: 'SILVER', price: 100 },
            { id: 'A3', row: 'A', number: 3, isBooked: true, isSelected: false, tier: 'GOLD', price: 150 },
          ],
        },
        {
          rowLabel: 'B',
          seats: [
            { id: 'B1', row: 'B', number: 1, isBooked: false, isSelected: false, tier: 'GOLD', price: 150 },
            { id: 'B2', row: 'B', number: 2, isBooked: false, isSelected: true, tier: 'PLATINUM', price: 200 },
          ],
        },
      ],
    },
  });

  beforeEach(() => {
    store = mockStore({
      booking: {
        selectedSeats: [
          { id: 'B2', row: 'B', number: 2, isBooked: false, tier: 'PLATINUM', price: 200 }
        ],
        error: null,
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders seat grid with theatre layout', () => {
    const theatre = createMockTheatre();
    render(
      <Provider store={store}>
        <SeatGrid theatre={theatre} />
      </Provider>
    );

    expect(screen.getByText('A')).toBeInTheDocument(); // Row label
    expect(screen.getByText('B')).toBeInTheDocument(); // Row label
    expect(screen.getByTestId('seat-A1')).toBeInTheDocument();
    expect(screen.getByTestId('seat-A2')).toBeInTheDocument();
    expect(screen.getByTestId('seat-A3')).toBeInTheDocument();
    expect(screen.getByTestId('seat-B1')).toBeInTheDocument();
    expect(screen.getByTestId('seat-B2')).toBeInTheDocument();
  });

  it('shows message when no theatre is provided', () => {
    render(
      <Provider store={store}>
        <SeatGrid theatre={undefined as unknown as Theatre} />
      </Provider>
    );

    expect(screen.getByText('Please select a theatre first')).toBeInTheDocument();
  });

  it('dispatches toggleSeatSelection when seat is clicked', () => {
    const theatre = createMockTheatre();
    render(
      <Provider store={store}>
        <SeatGrid theatre={theatre} />
      </Provider>
    );

    const seatA1 = screen.getByTestId('seat-A1');
    fireEvent.click(seatA1);

    expect(store.dispatch).toHaveBeenCalledWith(
      toggleSeatSelection(theatre.seatLayout.rows[0].seats[0])
    );
  });

  it('marks selected seats correctly', () => {
    const theatre = createMockTheatre();
    render(
      <Provider store={store}>
        <SeatGrid theatre={theatre} />
      </Provider>
    );

    const seatB2 = screen.getByTestId('seat-B2');
    expect(seatB2).toHaveClass('selected');
  });

  it('marks booked seats correctly', () => {
    const theatre = createMockTheatre();
    render(
      <Provider store={store}>
        <SeatGrid theatre={theatre} />
      </Provider>
    );

    const seatA3 = screen.getByTestId('seat-A3');
    expect(seatA3).toHaveClass('booked');
  });

  it('displays error message when present', () => {
    store = mockStore({
      booking: {
        selectedSeats: [],
        error: 'Maximum seats exceeded',
      },
    });

    const theatre = createMockTheatre();
    render(
      <Provider store={store}>
        <SeatGrid theatre={theatre} />
      </Provider>
    );

    expect(screen.getByText('Maximum seats exceeded')).toBeInTheDocument();
    expect(screen.getByText('Maximum seats exceeded')).toHaveStyle('color: rgb(255, 0, 0)');
  });

  it('does not display error message when error is null', () => {
    const theatre = createMockTheatre();
    render(
      <Provider store={store}>
        <SeatGrid theatre={theatre} />
      </Provider>
    );

    expect(screen.queryByText(/Maximum seats exceeded/)).not.toBeInTheDocument();
  });

  it('renders multiple rows with correct structure', () => {
    const theatre = createMockTheatre();
    render(
      <Provider store={store}>
        <SeatGrid theatre={theatre} />
      </Provider>
    );

    const seatRows = screen.getAllByText(/^[A-Z]$/); // Row labels (A, B, etc.)
    expect(seatRows).toHaveLength(2);

    // Check that seats are rendered for each row
    expect(screen.getByTestId('seat-A1')).toBeInTheDocument();
    expect(screen.getByTestId('seat-A2')).toBeInTheDocument();
    expect(screen.getByTestId('seat-A3')).toBeInTheDocument();
    expect(screen.getByTestId('seat-B1')).toBeInTheDocument();
    expect(screen.getByTestId('seat-B2')).toBeInTheDocument();
  });

  it('handles empty seat layout', () => {
    const emptyTheatre: Theatre = {
      id: 1,
      name: 'Empty Theatre',
      location: 'Test',
      showTimes: ['10:00 AM'],
      seatLayout: { rows: [] },
    };

    render(
      <Provider store={store}>
        <SeatGrid theatre={emptyTheatre} />
      </Provider>
    );

    expect(screen.queryByText(/^[A-Z]$/)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/seat-/)).not.toBeInTheDocument();
  });

  it('handles seat selection for different seat types', () => {
    const theatre = createMockTheatre();
    render(
      <Provider store={store}>
        <SeatGrid theatre={theatre} />
      </Provider>
    );

    // Click on a SILVER seat
    const silverSeat = screen.getByTestId('seat-A1');
    fireEvent.click(silverSeat);
    expect(store.dispatch).toHaveBeenCalledWith(
      toggleSeatSelection(theatre.seatLayout.rows[0].seats[0])
    );

    // Click on a GOLD seat
    const goldSeat = screen.getByTestId('seat-B1');
    fireEvent.click(goldSeat);
    expect(store.dispatch).toHaveBeenCalledWith(
      toggleSeatSelection(theatre.seatLayout.rows[1].seats[0])
    );
  });

  it('has proper CSS classes', () => {
    const theatre = createMockTheatre();
    const { container } = render(
      <Provider store={store}>
        <SeatGrid theatre={theatre} />
      </Provider>
    );

    expect(container.querySelector('.seat-grid-container')).toBeInTheDocument();
    expect(container.querySelector('.seat-grid')).toBeInTheDocument();
    expect(container.querySelectorAll('.seat-row')).toHaveLength(2);
    expect(container.querySelectorAll('.row-label')).toHaveLength(2);
  });
});