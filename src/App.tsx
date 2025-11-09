import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { initializeTheme } from './theme/theme';

// Import components
import Navbar from './components/common/Navbar';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { MovieListPage } from './pages/MovieListPage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { SeatBookingPage } from './pages/SeatBookingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';

// Import styles
import '@progress/kendo-theme-default/dist/all.css';
import './styles/animations.css';
import './styles/responsive.css';
import './App.css';

// Import Kendo UI default theme
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize theme and apply configurations
    initializeTheme();
  }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
                <Routes>
                <Route path="/" element={<MovieListPage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/booking/:movieId/:theatreId" element={<SeatBookingPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                </Routes>
            </main>
          </div>
        </Router>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
