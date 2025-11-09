import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { ConfirmationPage } from '../pages/ConfirmationPage';

const mockStore = configureStore([]);

describe('ConfirmationPage', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore({
      booking: { currentBooking: { showTime: '10:00 AM' }, selectedSeats: [{ id: 'A1', price: 100 }, { id: 'A2', price: 100 }] },
      movies: { selectedMovie: { title: 'Test Movie' } },
      theatres: { selectedTheatre: { name: 'Test Theatre' } }
    });
  });

  it('renders confirmation message and details', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ConfirmationPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Booking Confirmed!/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Theatre/i)).toBeInTheDocument();
    expect(screen.getByText(/10:00 AM/i)).toBeInTheDocument();
    expect(screen.getByText(/A1, A2/i)).toBeInTheDocument();
  });
});


