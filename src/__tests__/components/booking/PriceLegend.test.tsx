import { render, screen } from '@testing-library/react';
import PriceLegend from '../../../components/booking/PriceLegend';
import { SEAT_PRICES } from '../../../utils/constants';

// Mock the constants
jest.mock('../../../utils/constants', () => ({
  SEAT_PRICES: {
    SILVER: 100,
    GOLD: 150,
    PLATINUM: 200,
  },
}));

describe('PriceLegend', () => {
  it('renders price legend with all seat types', () => {
    render(<PriceLegend />);
    
    expect(screen.getByText(`Silver - ₹${SEAT_PRICES.SILVER}`)).toBeInTheDocument();
    expect(screen.getByText(`Gold - ₹${SEAT_PRICES.GOLD}`)).toBeInTheDocument();
    expect(screen.getByText(`Platinum - ₹${SEAT_PRICES.PLATINUM}`)).toBeInTheDocument();
  });

  it('renders with proper CSS classes', () => {
    const { container } = render(<PriceLegend />);
    
    expect(container.querySelector('.price-legend')).toBeInTheDocument();
    expect(container.querySelectorAll('.legend-item')).toHaveLength(3);
    expect(container.querySelector('.seat-sample.silver')).toBeInTheDocument();
    expect(container.querySelector('.seat-sample.gold')).toBeInTheDocument();
    expect(container.querySelector('.seat-sample.platinum')).toBeInTheDocument();
  });

  it('displays correct prices from constants', () => {
    render(<PriceLegend />);
    
    expect(screen.getByText('Silver - ₹100')).toBeInTheDocument();
    expect(screen.getByText('Gold - ₹150')).toBeInTheDocument();
    expect(screen.getByText('Platinum - ₹200')).toBeInTheDocument();
  });

  it('renders seat samples with proper styling classes', () => {
    const { container } = render(<PriceLegend />);
    
    const legendItems = container.querySelectorAll('.legend-item');
    expect(legendItems).toHaveLength(3);
    
    const silverSample = container.querySelector('.seat-sample.silver');
    const goldSample = container.querySelector('.seat-sample.gold');
    const platinumSample = container.querySelector('.seat-sample.platinum');
    
    expect(silverSample).toBeInTheDocument();
    expect(goldSample).toBeInTheDocument();
    expect(platinumSample).toBeInTheDocument();
  });

  it('has proper component structure', () => {
    const { container } = render(<PriceLegend />);
    
    const priceLegend = container.querySelector('.price-legend');
    expect(priceLegend).toBeInTheDocument();
    
    const legendItems = priceLegend?.querySelectorAll('.legend-item');
    expect(legendItems).toHaveLength(3);
    
    legendItems?.forEach((item) => {
      expect(item.querySelector('.seat-sample')).toBeInTheDocument();
      expect(item.querySelector('span')).toBeInTheDocument();
    });
  });

  it('renders text content for all seat types', () => {
    render(<PriceLegend />);
    
    // Check that all seat type texts are present
    expect(screen.getByText(/Silver/)).toBeInTheDocument();
    expect(screen.getByText(/Gold/)).toBeInTheDocument();
    expect(screen.getByText(/Platinum/)).toBeInTheDocument();
    
    // Check that currency symbol is present
    expect(screen.getAllByText(/₹/).length).toBeGreaterThan(0);
  });
});