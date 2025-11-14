import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Movie, MovieState } from '../../types/movie';

// Resolve API base URL in a way that's safe for tests, Node and browser builds.
// Priority:
// 1) window.__VITE_API_BASE_URL__ (can be injected at runtime if needed)
// 2) import.meta.env.VITE_API_BASE_URL (browser/Vite builds)
// 3) process.env.VITE_API_BASE_URL (Node.js/tests, with safe access)
// 4) production hardcoded URL when in production mode
// 5) fallback to localhost for development
const getApiBaseUrl = (): string => {
  // Browser runtime override
  if (typeof window !== 'undefined' && (window as Window & { __VITE_API_BASE_URL__?: string }).__VITE_API_BASE_URL__) {
    return (window as Window & { __VITE_API_BASE_URL__?: string }).__VITE_API_BASE_URL__!;
  }
  
  // Node.js env (tests, SSR) - safe access - check this first for Jest compatibility
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.VITE_API_BASE_URL) {
      return process.env.VITE_API_BASE_URL;
    }
    if (process.env.NODE_ENV === 'production') {
      return 'https://interactive-seat-booking-system-flintech.vercel.app';
    }
    // Jest test environment
    if (process.env.NODE_ENV === 'test') {
      return 'http://localhost:3000';
    }
  }
  
  // Vite env (browser builds) - only access when not in test environment
  if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
    try {
      // Use eval to prevent Jest from trying to parse import.meta at compile time
      const importMeta = eval('import.meta');
      if (importMeta && importMeta.env) {
        if (importMeta.env.VITE_API_BASE_URL) {
          return importMeta.env.VITE_API_BASE_URL;
        }
        if (importMeta.env.PROD) {
          return 'https://interactive-seat-booking-system-flintech.vercel.app';
        }
      }
    } catch {
      // import.meta is not available, continue to fallback
    }
  }
  
  // Development fallback
  return 'http://localhost:3000';
};

const API_BASE_URL = getApiBaseUrl();

// Async thunk to fetch movies from API
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (status?: 'now_showing' | 'coming_soon') => {
    const url = status 
      ? `${API_BASE_URL}/api/movies?status=${status}`
      : `${API_BASE_URL}/api/movies`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const result = await response.json();
    return result.data;
  }
);

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<Movie>) => {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export const { setSelectedMovie, clearSelectedMovie, setLoading, setError } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;