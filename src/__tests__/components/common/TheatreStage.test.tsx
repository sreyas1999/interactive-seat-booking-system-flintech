import { render } from '@testing-library/react';
import { TheatreStage } from '../../../components/common/TheatreStage';

describe('TheatreStage', () => {
  it('renders theatre stage component', () => {
    const { container } = render(<TheatreStage />);
    
    expect(container.querySelector('.theatre-stage')).toBeInTheDocument();
  });

  it('renders with default className', () => {
    const { container } = render(<TheatreStage />);
    
    expect(container.firstChild).toHaveClass('theatre-stage');
  });

  it('applies custom className when provided', () => {
    const { container } = render(<TheatreStage className="custom-stage" />);
    
    expect(container.firstChild).toHaveClass('theatre-stage', 'custom-stage');
  });

  it('has proper component structure', () => {
    const { container } = render(<TheatreStage />);
    
    expect(container.querySelector('.theatre-stage')).toBeInTheDocument();
    expect(container.querySelector('.stage-container')).toBeInTheDocument();
    expect(container.querySelector('.screen')).toBeInTheDocument();
    expect(container.querySelector('.light-projection')).toBeInTheDocument();
  });

  it('renders screen with text', () => {
    const { container } = render(<TheatreStage />);
    
    const screenText = container.querySelector('.screen-text');
    expect(screenText).toBeInTheDocument();
    expect(screenText).toHaveTextContent('SCREEN');
  });

  it('has all required CSS classes for styling', () => {
    const { container } = render(<TheatreStage />);
    
    const stageContainer = container.querySelector('.stage-container');
    const screen = container.querySelector('.screen');
    const lightProjection = container.querySelector('.light-projection');
    const screenText = container.querySelector('.screen-text');
    
    expect(stageContainer).toBeInTheDocument();
    expect(screen).toBeInTheDocument();
    expect(lightProjection).toBeInTheDocument();
    expect(screenText).toBeInTheDocument();
  });

  it('renders consistently', () => {
    const { container: container1 } = render(<TheatreStage />);
    const { container: container2 } = render(<TheatreStage />);
    
    expect(container1.innerHTML).toBe(container2.innerHTML);
  });

  it('maintains structure with custom className', () => {
    const { container } = render(<TheatreStage className="test-class" />);
    
    // Should still have all the internal structure
    expect(container.querySelector('.stage-container')).toBeInTheDocument();
    expect(container.querySelector('.screen')).toBeInTheDocument();
    expect(container.querySelector('.screen-text')).toHaveTextContent('SCREEN');
    expect(container.querySelector('.light-projection')).toBeInTheDocument();
  });

  it('handles empty className prop', () => {
    const { container } = render(<TheatreStage className="" />);
    
    expect(container.firstChild).toHaveClass('theatre-stage');
  });

  it('is a self-contained component with no props dependencies', () => {
    // Should render without any required props
    expect(() => render(<TheatreStage />)).not.toThrow();
  });
});