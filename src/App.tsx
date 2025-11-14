import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { initializeTheme } from './theme/theme';

// Import components
import Navbar from './components/common/Navbar';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';

// Lazy load pages for code splitting
const MovieListPage = lazy(() => import('./pages/MovieListPage').then(module => ({ default: module.MovieListPage })));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage').then(module => ({ default: module.MovieDetailsPage })));
const SeatBookingPage = lazy(() => import('./pages/SeatBookingPage').then(module => ({ default: module.SeatBookingPage })));
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage').then(module => ({ default: module.ConfirmationPage })));

// Import styles
import '@progress/kendo-theme-default/dist/all.css';
import './styles/animations.css';
import './styles/responsive.css';
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
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<MovieListPage />} />
                  <Route path="/movie/:id" element={<MovieDetailsPage />} />
                  <Route path="/booking/:movieId/:theatreId" element={<SeatBookingPage />} />
                  <Route path="/confirmation" element={<ConfirmationPage />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
