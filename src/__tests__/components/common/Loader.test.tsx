import { render } from '@testing-library/react';
import Loader from '../../../components/common/Loader';

// Mock the Kendo Loader component
jest.mock('@progress/kendo-react-indicators', () => ({
  Loader: ({ size, type }: { size: string; type: string }) => (
    <div data-testid="kendo-loader" data-size={size} data-type={type}>
      Loading...
    </div>
  ),
}));

describe('Loader', () => {
  it('renders loader component', () => {
    const { container } = render(<Loader />);
    
    expect(container.querySelector('.loader-container')).toBeInTheDocument();
  });

  it('renders with correct styling', () => {
    const { container } = render(<Loader />);
    
    const loaderContainer = container.querySelector('.loader-container');
    expect(loaderContainer).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      padding: '2rem'
    });
  });

  it('renders Kendo Loader with correct props', () => {
    const { getByTestId } = render(<Loader />);
    
    const kendoLoader = getByTestId('kendo-loader');
    expect(kendoLoader).toBeInTheDocument();
    expect(kendoLoader).toHaveAttribute('data-size', 'large');
    expect(kendoLoader).toHaveAttribute('data-type', 'infinite-spinner');
  });

  it('displays loading text', () => {
    const { getByText } = render(<Loader />);
    
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('has correct component structure', () => {
    const { container } = render(<Loader />);
    
    expect(container.firstChild).toHaveClass('loader-container');
    expect(container.querySelector('[data-testid="kendo-loader"]')).toBeInTheDocument();
  });

  it('renders consistently', () => {
    const { container: container1 } = render(<Loader />);
    const { container: container2 } = render(<Loader />);
    
    expect(container1.innerHTML).toBe(container2.innerHTML);
  });
});