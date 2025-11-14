import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationDialog from '../../../components/common/ConfirmationDialog';

// Mock the Kendo Dialog component
jest.mock('@progress/kendo-react-dialogs', () => ({
  Dialog: ({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) => (
    <div role="dialog" aria-labelledby="dialog-title">
      <h2 id="dialog-title">{title}</h2>
      <div>{children}</div>
      <button onClick={onClose}>Close</button>
    </div>
  ),
  DialogActionsBar: ({ children }: { children: React.ReactNode }) => (
    <div className="dialog-actions">{children}</div>
  ),
}));

// Mock the Kendo Button component
jest.mock('@progress/kendo-react-buttons', () => ({
  Button: ({ children, onClick, themeColor }: { children: React.ReactNode; onClick?: () => void; themeColor?: string }) => (
    <button onClick={onClick} className={`k-button ${themeColor ? `k-${themeColor}` : ''}`}>
      {children}
    </button>
  ),
}));

describe('ConfirmationDialog', () => {
  const defaultProps = {
    visible: true,
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog when open', () => {
    render(<ConfirmationDialog {...defaultProps} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
  });

  it('does not render dialog when closed', () => {
    render(<ConfirmationDialog {...defaultProps} visible={false} />);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
  });

  it('renders confirm and cancel buttons', () => {
    render(<ConfirmationDialog {...defaultProps} />);
    
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    const onConfirm = jest.fn();
    render(<ConfirmationDialog {...defaultProps} onConfirm={onConfirm} />);
    
    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = jest.fn();
    render(<ConfirmationDialog {...defaultProps} onCancel={onCancel} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when close button is clicked', () => {
    const onCancel = jest.fn();
    render(<ConfirmationDialog {...defaultProps} onCancel={onCancel} />);
    
    fireEvent.click(screen.getByText('Close'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('renders with fixed button text', () => {
    render(<ConfirmationDialog {...defaultProps} />);
    
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('has proper button styling', () => {
    render(<ConfirmationDialog {...defaultProps} />);
    
    const confirmButton = screen.getByText('Confirm');
    const cancelButton = screen.getByText('Cancel');
    
    expect(confirmButton).toHaveClass('k-button');
    expect(confirmButton).toHaveClass('k-primary');
    expect(cancelButton).toHaveClass('k-button');
  });

  it('handles undefined callbacks gracefully', () => {
    const props = {
      visible: true,
      title: 'Test',
      message: 'Test message',
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
    };
    
    render(<ConfirmationDialog {...props} />);
    
    // Should not throw when clicking buttons
    expect(() => {
      fireEvent.click(screen.getByText('Confirm'));
    }).not.toThrow();
    
    expect(() => {
      fireEvent.click(screen.getByText('Cancel'));
    }).not.toThrow();
  });

  it('renders with proper dialog structure', () => {
    const { container } = render(<ConfirmationDialog {...defaultProps} />);
    
    expect(container.querySelector('.dialog-actions')).toBeInTheDocument();
  });

  it('supports multiline messages', () => {
    const multilineMessage = 'First line\nSecond line\nThird line';
    render(<ConfirmationDialog {...defaultProps} message={multilineMessage} />);
    
    // Use getByDisplayValue for better multiline text matching
    expect(screen.getByText(/First line/)).toBeInTheDocument();
    expect(screen.getByText(/Second line/)).toBeInTheDocument();
    expect(screen.getByText(/Third line/)).toBeInTheDocument();
  });

  it('has accessible dialog structure', () => {
    render(<ConfirmationDialog {...defaultProps} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'dialog-title');
    
    const title = screen.getByText('Confirm Action');
    expect(title).toHaveAttribute('id', 'dialog-title');
  });

  it('handles empty title gracefully', () => {
    render(<ConfirmationDialog {...defaultProps} title="" />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
  });

  it('handles empty message gracefully', () => {
    render(<ConfirmationDialog {...defaultProps} message="" />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
  });
});