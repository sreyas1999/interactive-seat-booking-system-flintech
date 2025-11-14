import { render, screen, fireEvent } from '@testing-library/react';
import { BookingConfirmPopup } from '../../../components/booking/BookingConfirmPopup';

describe('BookingConfirmPopup', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders popup with movie title and selected seats', () => {
    const selectedSeats = ['A1', 'A2', 'B3'];
    render(
      <BookingConfirmPopup
        movieTitle="Test Movie"
        selectedSeats={selectedSeats}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Booking Confirmed!')).toBeInTheDocument();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('A1, A2, B3')).toBeInTheDocument();
  });

  it('renders popup without movie title', () => {
    const selectedSeats = ['A1'];
    render(
      <BookingConfirmPopup
        selectedSeats={selectedSeats}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Booking Confirmed!')).toBeInTheDocument();
    expect(screen.getByText('A1')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const selectedSeats = ['A1'];
    render(
      <BookingConfirmPopup
        movieTitle="Test Movie"
        selectedSeats={selectedSeats}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const selectedSeats = ['A1'];
    render(
      <BookingConfirmPopup
        movieTitle="Test Movie"
        selectedSeats={selectedSeats}
        onClose={mockOnClose}
      />
    );

    // Find the overlay by its style attributes
    const overlay = document.querySelector('[style*="position: fixed"]');
    expect(overlay).toBeInTheDocument();
    if (overlay) {
      fireEvent.click(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does not call onClose when popup content is clicked', () => {
    const selectedSeats = ['A1'];
    render(
      <BookingConfirmPopup
        movieTitle="Test Movie"
        selectedSeats={selectedSeats}
        onClose={mockOnClose}
      />
    );

    const popupContent = screen.getByText('Booking Confirmed!').closest('div');
    if (popupContent) {
      fireEvent.click(popupContent);
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });

  it('renders with multiple selected seats', () => {
    const selectedSeats = ['A1', 'A2', 'B1', 'B2', 'C1'];
    render(
      <BookingConfirmPopup
        movieTitle="Avengers: Endgame"
        selectedSeats={selectedSeats}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Avengers: Endgame')).toBeInTheDocument();
    expect(screen.getByText('A1, A2, B1, B2, C1')).toBeInTheDocument();
  });

  it('renders with empty seats array', () => {
    const selectedSeats: string[] = [];
    render(
      <BookingConfirmPopup
        movieTitle="Test Movie"
        selectedSeats={selectedSeats}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Booking Confirmed!')).toBeInTheDocument();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });
});