import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';

// Mock the Kendo components
jest.mock('@progress/kendo-react-layout', () => ({
  AppBar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  AppBarSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('Navbar', () => {
  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      bottom: 50,
      height: 40,
      left: 100,
      right: 200,
      top: 10,
      width: 100,
      x: 100,
      y: 10,
      toJSON: jest.fn(),
    }));
  });

  it('renders navbar with brand', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByText('Movie Booking System')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('renders profile section', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByAltText('Profile')).toBeInTheDocument();
  });

  it('opens profile menu when profile is clicked', () => {
    renderWithRouter(<Navbar />);
    
    const profileElement = screen.getByAltText('Profile');
    fireEvent.click(profileElement);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('closes profile menu when clicking outside', () => {
    renderWithRouter(<Navbar />);
    
    // Open menu
    const profileElement = screen.getByAltText('Profile');
    fireEvent.click(profileElement);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    
    // Click outside (simulate by clicking document)
    fireEvent.mouseDown(document);
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });

  it('handles sign out action', () => {
    renderWithRouter(<Navbar />);
    
    // Open menu
    const profileElement = screen.getByAltText('Profile');
    fireEvent.click(profileElement);
    
    // Click sign out
    const signOutButton = screen.getByText('Sign Out');
    fireEvent.click(signOutButton);
    
    // Menu should close
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });

  it('has proper CSS classes', () => {
    const { container } = renderWithRouter(<Navbar />);
    
    expect(container.querySelector('.custom-navbar')).toBeInTheDocument();
    expect(container.querySelector('.navbar-brand')).toBeInTheDocument();
  });

  it('brand has click handler for navigation', () => {
    renderWithRouter(<Navbar />);
    
    const brand = screen.getByText('Movie Booking System');
    expect(brand.closest('.navbar-brand')).toHaveStyle('cursor: pointer');
  });

  it('toggles menu on multiple profile clicks', () => {
    renderWithRouter(<Navbar />);
    
    const profileElement = screen.getByAltText('Profile');
    // First click - open
    fireEvent.click(profileElement);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    
    // Second click - close
    fireEvent.click(profileElement);
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
    
    // Third click - open again
    fireEvent.click(profileElement);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('renders with correct AppBar structure', () => {
    const { container } = renderWithRouter(<Navbar />);
    
    expect(container.querySelector('.custom-navbar')).toBeInTheDocument();
  });

  it('handles profile menu positioning', () => {
    renderWithRouter(<Navbar />);
    
    const profileElement = screen.getByAltText('Profile');
    fireEvent.click(profileElement);
    
    // Menu should be rendered (createPortal is mocked to render in place)
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    
    const { unmount } = renderWithRouter(<Navbar />);
    
    // Open menu to add event listener
    const profileElement = screen.getByAltText('Profile');
    fireEvent.click(profileElement);
    
    // Unmount component
    unmount();
    
    // Should have called removeEventListener
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    
    removeEventListenerSpy.mockRestore();
  });
});