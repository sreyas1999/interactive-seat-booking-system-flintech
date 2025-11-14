import { render, screen } from '@testing-library/react';
import { SeatLegend } from '../../../components/booking/SeatLegend';

describe('SeatLegend', () => {
  it('renders seat pricing legend', () => {
    render(<SeatLegend showLimitMsg={false} />);
    
    expect(screen.getByText('Seat Pricing')).toBeInTheDocument();
    expect(screen.getByText('Silver')).toBeInTheDocument();
    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByText('Platinum')).toBeInTheDocument();
    expect(screen.getByText('₹100')).toBeInTheDocument();
    expect(screen.getByText('₹150')).toBeInTheDocument();
    expect(screen.getByText('₹200')).toBeInTheDocument();
  });

  it('displays all seat type icons', () => {
    render(<SeatLegend showLimitMsg={false} />);
    
    const silverIcon = screen.getByAltText('Silver Seat');
    const goldIcon = screen.getByAltText('Gold Seat');
    const platinumIcon = screen.getByAltText('Platinum Seat');
    
    expect(silverIcon).toBeInTheDocument();
    expect(silverIcon).toHaveAttribute('src', '/assets/logos/seat_silver.svg');
    
    expect(goldIcon).toBeInTheDocument();
    expect(goldIcon).toHaveAttribute('src', '/assets/logos/seat_gold.svg');
    
    expect(platinumIcon).toBeInTheDocument();
    expect(platinumIcon).toHaveAttribute('src', '/assets/logos/seat_platinum.svg');
  });

  it('shows limit message when showLimitMsg is true', () => {
    render(<SeatLegend showLimitMsg={true} />);
    
    expect(screen.getByText('You can only book a maximum of 8 seats at a time.')).toBeInTheDocument();
  });

  it('does not show limit message when showLimitMsg is false', () => {
    render(<SeatLegend showLimitMsg={false} />);
    
    expect(screen.queryByText('You can only book a maximum of 8 seats at a time.')).not.toBeInTheDocument();
  });

  it('applies correct styling to seat type names', () => {
    render(<SeatLegend showLimitMsg={false} />);
    
    const silverName = screen.getByText('Silver');
    const goldName = screen.getByText('Gold');
    const platinumName = screen.getByText('Platinum');
    
    expect(silverName).toHaveStyle('color: #888');
    expect(goldName).toHaveStyle('color: #b8860b');
    expect(platinumName).toHaveStyle('color: #555');
  });

  it('renders all seat legend items with proper structure', () => {
    render(<SeatLegend showLimitMsg={false} />);
    
    const legendItems = screen.getAllByText(/₹\d+/);
    expect(legendItems).toHaveLength(3);
    
    // Check that each seat type has its corresponding price
    expect(screen.getByText('Silver')).toBeInTheDocument();
    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByText('Platinum')).toBeInTheDocument();
  });

  it('has proper accessibility attributes for images', () => {
    render(<SeatLegend showLimitMsg={false} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).toMatch(/\w+ Seat/);
    });
  });

  it('renders with proper CSS classes', () => {
    const { container } = render(<SeatLegend showLimitMsg={false} />);
    
    expect(container.querySelector('.seat-legend')).toBeInTheDocument();
    expect(container.querySelector('.seat-legend-title')).toBeInTheDocument();
    expect(container.querySelector('.seat-legend-list')).toBeInTheDocument();
    expect(container.querySelectorAll('.seat-legend-item')).toHaveLength(3);
  });

  it('renders limit message with proper CSS class', () => {
    const { container } = render(<SeatLegend showLimitMsg={true} />);
    
    expect(container.querySelector('.seat-legend-limit-message')).toBeInTheDocument();
  });
});