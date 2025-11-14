import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BookingSummary from '../../../components/booking/BookingSummary';
import { calculateTotalPrice } from '../../../utils/seatUtils';

// Mock the calculateTotalPrice function
jest.mock('../../../utils/seatUtils', () => ({
  calculateTotalPrice: jest.fn(),
}));

const mockStore = configureStore([]);
const mockCalculateTotalPrice = calculateTotalPrice as jest.MockedFunction<typeof calculateTotalPrice>;

describe('BookingSummary', () => {
  const mockOnConfirm = jest.fn();
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    mockOnConfirm.mockClear();
    mockCalculateTotalPrice.mockClear();
  });

  it('renders booking summary with all details', () => {
    const mockSelectedSeats = [
      { id: 'A1', row: 'A', number: 1, isBooked: false, tier: 'SILVER', price: 100 },
      { id: 'A2', row: 'A', number: 2, isBooked: false, tier: 'GOLD', price: 150 },
    ];

    store = mockStore({
      booking: { selectedSeats: mockSelectedSeats },
      movies: { selectedMovie: { id: 1, title: 'Test Movie', genre: 'Action', rating: 4.5 } },
      theatres: { selectedTheatre: { id: 1, name: 'Test Theatre', location: 'Test Location' } },
    });

    mockCalculateTotalPrice.mockReturnValue(250);

    render(
      <Provider store={store}>
        <BookingSummary onConfirm={mockOnConfirm} />
      </Provider>
    );

    expect(screen.getByText('Booking Summary')).toBeInTheDocument();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test Theatre')).toBeInTheDocument();
    expect(screen.getByText('A1, A2')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('₹250')).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    const mockSelectedSeats = [
      { id: 'A1', row: 'A', number: 1, isBooked: false, tier: 'SILVER', price: 100 },
    ];

    store = mockStore({
      booking: { selectedSeats: mockSelectedSeats },
      movies: { selectedMovie: { id: 1, title: 'Test Movie', genre: 'Action', rating: 4.5 } },
      theatres: { selectedTheatre: { id: 1, name: 'Test Theatre', location: 'Test Location' } },
    });

    mockCalculateTotalPrice.mockReturnValue(100);

    render(
      <Provider store={store}>
        <BookingSummary onConfirm={mockOnConfirm} />
      </Provider>
    );

    const confirmButton = screen.getByText('Confirm Booking');
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('disables confirm button when no seats are selected', () => {
    store = mockStore({
      booking: { selectedSeats: [] },
      movies: { selectedMovie: { id: 1, title: 'Test Movie', genre: 'Action', rating: 4.5 } },
      theatres: { selectedTheatre: { id: 1, name: 'Test Theatre', location: 'Test Location' } },
    });

    mockCalculateTotalPrice.mockReturnValue(0);

    render(
      <Provider store={store}>
        <BookingSummary onConfirm={mockOnConfirm} />
      </Provider>
    );

    const confirmButton = screen.getByText('Confirm Booking');
    // Check if the button or its parent has the disabled attribute
    const buttonElement = confirmButton.closest('button') || confirmButton;
    expect(buttonElement).toBeDisabled();
  });

  it('returns null when no movie is selected', () => {
    store = mockStore({
      booking: { selectedSeats: [] },
      movies: { selectedMovie: null },
      theatres: { selectedTheatre: { id: 1, name: 'Test Theatre', location: 'Test Location' } },
    });

    const { container } = render(
      <Provider store={store}>
        <BookingSummary onConfirm={mockOnConfirm} />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('returns null when no theatre is selected', () => {
    store = mockStore({
      booking: { selectedSeats: [] },
      movies: { selectedMovie: { id: 1, title: 'Test Movie', genre: 'Action', rating: 4.5 } },
      theatres: { selectedTheatre: null },
    });

    const { container } = render(
      <Provider store={store}>
        <BookingSummary onConfirm={mockOnConfirm} />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders with multiple seats of different tiers', () => {
    const mockSelectedSeats = [
      { id: 'A1', row: 'A', number: 1, isBooked: false, tier: 'SILVER', price: 100 },
      { id: 'B1', row: 'B', number: 1, isBooked: false, tier: 'GOLD', price: 150 },
      { id: 'C1', row: 'C', number: 1, isBooked: false, tier: 'PLATINUM', price: 200 },
    ];

    store = mockStore({
      booking: { selectedSeats: mockSelectedSeats },
      movies: { selectedMovie: { id: 1, title: 'Inception', genre: 'Sci-Fi', rating: 4.8 } },
      theatres: { selectedTheatre: { id: 2, name: 'IMAX Theatre', location: 'Downtown' } },
    });

    mockCalculateTotalPrice.mockReturnValue(450);

    render(
      <Provider store={store}>
        <BookingSummary onConfirm={mockOnConfirm} />
      </Provider>
    );

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('IMAX Theatre')).toBeInTheDocument();
    expect(screen.getByText('A1, B1, C1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('₹450')).toBeInTheDocument();
  });
});