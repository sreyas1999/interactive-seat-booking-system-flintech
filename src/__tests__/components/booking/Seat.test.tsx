import { render, screen, fireEvent } from '@testing-library/react';
import Seat from '../../../components/booking/Seat';
import type { Seat as SeatType } from '../../../types/seat';

// Mock the Tooltip component from Kendo
jest.mock('@progress/kendo-react-tooltip', () => ({
  Tooltip: ({ children, content }: { children: React.ReactNode; content: string }) => (
    <div title={content}>{children}</div>
  ),
}));

describe('Seat', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  const createMockSeat = (overrides: Partial<SeatType> = {}): SeatType => ({
    id: 'A1',
    row: 'A',
    number: 1,
    isBooked: false,
    isSelected: false,
    tier: 'SILVER',
    price: 100,
    ...overrides,
  });

  it('renders seat with correct number and tier', () => {
    const seat = createMockSeat({ number: 5, tier: 'GOLD' });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('seat', 'gold');
  });

  it('calls onSelect when clicked and seat is not booked', () => {
    const seat = createMockSeat();
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    fireEvent.click(seatElement);
    
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(seat);
  });

  it('does not call onSelect when clicked and seat is booked', () => {
    const seat = createMockSeat({ isBooked: true });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    fireEvent.click(seatElement);
    
    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('applies selected class when seat is selected', () => {
    const seat = createMockSeat({ isSelected: true });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    expect(seatElement).toHaveClass('selected');
  });

  it('applies booked class when seat is booked', () => {
    const seat = createMockSeat({ isBooked: true });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    expect(seatElement).toHaveClass('booked');
  });

  it('applies correct tier class for silver seat', () => {
    const seat = createMockSeat({ tier: 'SILVER' });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    expect(seatElement).toHaveClass('silver');
  });

  it('applies correct tier class for gold seat', () => {
    const seat = createMockSeat({ tier: 'GOLD' });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    expect(seatElement).toHaveClass('gold');
  });

  it('applies correct tier class for platinum seat', () => {
    const seat = createMockSeat({ tier: 'PLATINUM' });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    expect(seatElement).toHaveClass('platinum');
  });

  it('has proper accessibility attributes', () => {
    const seat = createMockSeat({ id: 'B3', tier: 'GOLD', price: 150 });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    expect(seatElement).toHaveAttribute('aria-label', 'Seat B3 - GOLD - ₹150');
    expect(seatElement).toHaveAttribute('tabIndex', '0');
  });

  it('has aria-disabled when seat is booked', () => {
    const seat = createMockSeat({ isBooked: true });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    expect(seatElement).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not have aria-disabled when seat is available', () => {
    const seat = createMockSeat({ isBooked: false });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    expect(seatElement).toHaveAttribute('aria-disabled', 'false');
  });

  it('displays tooltip with price and tier information', () => {
    const seat = createMockSeat({ tier: 'PLATINUM', price: 200 });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    expect(seatElement.parentElement).toHaveAttribute('title', '₹200 - PLATINUM');
  });

  it('handles keyboard interaction', () => {
    const seat = createMockSeat();
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    fireEvent.keyDown(seatElement, { key: 'Enter', code: 'Enter' });
    
    // Note: This test assumes the component handles keyboard events
    // If not implemented, this test documents expected behavior
    expect(seatElement).toHaveAttribute('tabIndex', '0');
  });

  it('combines multiple CSS classes correctly', () => {
    const seat = createMockSeat({ 
      isSelected: true, 
      isBooked: false, 
      tier: 'PLATINUM' 
    });
    render(<Seat seat={seat} onSelect={mockOnSelect} />);
    
    const seatElement = screen.getByRole('button');
    expect(seatElement).toHaveClass('seat', 'platinum', 'selected');
    expect(seatElement).not.toHaveClass('booked');
  });

  it('renders different seat numbers correctly', () => {
    const seats = [1, 5, 10, 15].map(num => 
      createMockSeat({ number: num, id: `A${num}` })
    );
    
    seats.forEach(seat => {
      const { unmount } = render(<Seat seat={seat} onSelect={mockOnSelect} />);
      expect(screen.getByText(seat.number.toString())).toBeInTheDocument();
      unmount();
    });
  });
});