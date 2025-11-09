export interface Movie {
  id: number;
  title: string;
  description: string;
  duration: string;
  genre: string;
  poster: string;
  backdrop?: string;
  rating: number;
  releaseDate: string;
  status: 'now_showing' | 'coming_soon';
  language: string;
}

export interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
}