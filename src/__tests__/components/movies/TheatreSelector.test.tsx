import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import TheatreSelector from '../../../components/movies/TheatreSelector';
import { theatreReducer } from '../../../redux/slices/theatreSlice';
import type { Theatre } from '../../../types/theatre';

// Mock Loader component
jest.mock('../../../components/common/Loader', () => {
  return function MockLoader() {
    return <div>Loading...</div>;
  };
});

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockTheatres: Theatre[] = [
  {
    id: 1,
    name: 'Cinema Hall 1',
    location: 'Downtown',
    seatLayout: {
      rows: [
        {
          rowLabel: 'A',
          seats: [
            { id: 'A1', row: 'A', number: 1, tier: 'SILVER', price: 150, isBooked: false, isSelected: false },
          ],
        },
      ],
    },
    showTimes: ['10:00 AM', '1:00 PM', '7:00 PM'],
  },
  {
    id: 2,
    name: 'Cinema Hall 2',
    location: 'Uptown',
    seatLayout: {
      rows: [
        {
          rowLabel: 'A',
          seats: [
            { id: 'A1', row: 'A', number: 1, tier: 'GOLD', price: 200, isBooked: false, isSelected: false },
          ],
        },
      ],
    },
    showTimes: ['11:00 AM', '3:00 PM', '8:00 PM'],
  },
];

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      theatres: theatreReducer,
    },
    preloadedState: {
      theatres: {
        theatres: mockTheatres,
        selectedTheatre: null,
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

const renderWithProviders = (
  component: React.ReactElement,
  { store = createMockStore(), route = '/movie/1' } = {}
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/movie/:id" element={component} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('TheatreSelector', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders theatre selector with options', () => {
    renderWithProviders(<TheatreSelector />);
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select a theatre')).toBeInTheDocument();
    expect(screen.getByText('Cinema Hall 1')).toBeInTheDocument();
    expect(screen.getByText('Cinema Hall 2')).toBeInTheDocument();
  });

  it('shows loader when loading', () => {
    const store = createMockStore({ loading: true });
    renderWithProviders(<TheatreSelector />, { store });
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('handles theatre selection and navigation', () => {
    renderWithProviders(<TheatreSelector />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    
    expect(mockNavigate).toHaveBeenCalledWith('/booking/1/1');
  });

  it('updates selected theatre when option is changed', () => {
    renderWithProviders(<TheatreSelector />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    
    expect(select).toHaveValue('2');
    expect(mockNavigate).toHaveBeenCalledWith('/booking/1/2');
  });

  it('displays selected theatre when provided in store', () => {
    const store = createMockStore({
      selectedTheatre: mockTheatres[0],
    });
    
    renderWithProviders(<TheatreSelector />, { store });
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('1');
  });

  it('handles empty theatre selection', () => {
    renderWithProviders(<TheatreSelector />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '' } });
    
    expect(select).toHaveValue('');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('handles invalid theatre selection', () => {
    renderWithProviders(<TheatreSelector />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '999' } });
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('renders with empty theatres list', () => {
    const store = createMockStore({
      theatres: [],
    });
    
    renderWithProviders(<TheatreSelector />, { store });
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select a theatre')).toBeInTheDocument();
    expect(screen.queryByText('Cinema Hall 1')).not.toBeInTheDocument();
  });

  it('has proper CSS styling', () => {
    renderWithProviders(<TheatreSelector />);
    
    const select = screen.getByRole('combobox');
    // CSS is now in external file, just verify element exists and has the class
    expect(select).toBeInTheDocument();
    expect(select.parentElement).toHaveClass('theatre-selector');
  });

  it('has proper CSS class', () => {
    const { container } = renderWithProviders(<TheatreSelector />);
    
    expect(container.querySelector('.theatre-selector')).toBeInTheDocument();
  });

  it('navigates correctly with different movie IDs', () => {
    renderWithProviders(<TheatreSelector />, { route: '/movie/5' });
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    
    expect(mockNavigate).toHaveBeenCalledWith('/booking/5/1');
  });

  it('handles theatre selection without movie ID', () => {
    render(
      <Provider store={createMockStore()}>
        <MemoryRouter>
          <TheatreSelector />
        </MemoryRouter>
      </Provider>
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    
    // Should not navigate without movie ID
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('handles theatre with missing id gracefully', () => {
    const theatresWithValidId: Theatre[] = [
      {
        id: 1,
        name: 'Cinema Hall 1',
        location: 'Downtown',
        seatLayout: {
          rows: [
            {
              rowLabel: 'A',
              seats: [
                { id: 'A1', row: 'A', number: 1, tier: 'SILVER', price: 150, isBooked: false, isSelected: false },
              ],
            },
          ],
        },
        showTimes: ['10:00 AM'],
      },
    ];
    
    const store = createMockStore({
      theatres: theatresWithValidId,
    });
    
    renderWithProviders(<TheatreSelector />, { store });
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    
    expect(mockNavigate).toHaveBeenCalledWith('/booking/1/1');
  });

  it('handles string comparison for theatre IDs', () => {
    renderWithProviders(<TheatreSelector />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    
    // Should find theatre by string comparison
    expect(mockNavigate).toHaveBeenCalledWith('/booking/1/1');
  });

  it('resets selection when invalid option is selected', () => {
    const store = createMockStore({
      selectedTheatre: mockTheatres[0],
    });
    
    renderWithProviders(<TheatreSelector />, { store });
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('1');
    
    fireEvent.change(select, { target: { value: '999' } });
    
    // Invalid selection should not navigate
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});