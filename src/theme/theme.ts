import { loadMessages } from '@progress/kendo-react-intl';

export const initializeTheme = () => {
  // Import KendoUI default theme styles
  import('@progress/kendo-theme-default/dist/all.css');

  // Configure any custom theme variables here
  const theme = {
    colors: {
      silver: '#C0C0C0',
      gold: '#FFD700',
      platinum: '#E5E4E2',
      primary: '#ff6358',
      secondary: '#f6f6f6',
      info: '#3e80ed',
      success: '#5ec232',
      warning: '#fdce3e',
      error: '#d51923',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  };

  // Add any custom messages or localizations
  loadMessages('en-US', JSON.stringify({
    'custom.booking.maxSeats': 'You can only select up to 8 seats',
    'custom.booking.success': 'Booking confirmed successfully!',
  }));

  return theme;
};