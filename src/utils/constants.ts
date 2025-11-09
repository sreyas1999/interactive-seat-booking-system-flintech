export const SEAT_PRICES = {
  SILVER: 100,
  GOLD: 150,
  PLATINUM: 200,
} as const;

export const MAX_SEATS_PER_BOOKING = 8;

export const THEATRE_CONFIGS = {
  "ABC-Multiplex": {
    silverRows: 3,
    goldRows: 3,
    platinumRows: 3,
    seatsPerRow: 10,
  },
  "XYZ-Multiplex": {
    silverRows: 3,
    goldRows: 5,
    platinumRows: 4,
    seatsPerRow: 10,
  },
} as const;

export const DUMMY_MOVIES = [
  {
    id: 1,
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    duration: "2h 28min",
    genre: "Action, Adventure, Sci-Fi",
    poster: "/src/assets/movies/posters/inception_poster.jpg",
    backdrop: "/src/assets/movies/backdrops/inception_backdrop.jpeg",
    rating: 8.8,
    releaseDate: "2025-11-16",
    status: "now_showing" as const,
  },
  {
    id: 2,
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    duration: "2h 32min",
    genre: "Action, Crime, Drama",
    poster: "/src/assets/movies/posters/dark_knight.jpeg",
    backdrop: "/src/assets/movies/backdrops/dark_knight_backdrop.jpeg",
    rating: 9.0,
    releaseDate: "2025-11-18",
    status: "now_showing" as const,
  },
  {
    id: 3,
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    duration: "2h 49min",
    genre: "Adventure, Drama, Sci-Fi",
    status: "coming_soon" as const,
    poster: "/src/assets/movies/posters/interstellar.jpeg",
    backdrop: "/src/assets/movies/backdrops/interstellar_backdrop.jpeg",
    rating: 8.6,
    releaseDate: "2025-11-20",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    duration: "2h 34min",
    genre: "Crime, Drama",
    poster: "/src/assets/movies/posters/pulp_fiction.jpeg",
    backdrop: "/src/assets/movies/backdrops/pulp_fiction_backdrop.jpeg",
    rating: 8.9,
    releaseDate: "2025-11-12",
    status: "now_showing" as const,
  },
  {
    id: 5,
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    duration: "2h 22min",
    genre: "Drama",
    poster: "/src/assets/movies/posters/shawshank.jpeg",
    backdrop: "/src/assets/movies/backdrops/shawshank_backdrop.jpeg",
    rating: 9.3,
    releaseDate: "2025-11-14",
    status: "now_showing" as const,
  },
  {
    id: 6,
    title: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    duration: "2h 19min",
    genre: "Drama, Thriller",
    poster: "/src/assets/movies/posters/fight_club.jpeg",
    backdrop: "/src/assets/movies/backdrops/fight_club_backdrop.jpeg",
    rating: 8.8,
    releaseDate: "2025-11-15",
    status: "now_showing" as const,
  },
  {
    id: 7,
    title: "Goodfellas",
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    duration: "2h 26min",
    genre: "Biography, Crime, Drama",
    poster: "/src/assets/movies/posters/goodfellas.jpeg",
    backdrop: "/src/assets/movies/backdrops/goodfellas_backdrop.png",
    rating: 8.7,
    releaseDate: "2025-11-13",
    status: "now_showing" as const,
  },
  {
    id: 8,
    title: "The Matrix",
    description:
      "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
    duration: "2h 16min",
    genre: "Action, Sci-Fi",
    poster: "/src/assets/movies/posters/matrix.jpeg",
    backdrop: "/src/assets/movies/backdrops/matrix_backdrop.jpeg",
    rating: 8.7,
    releaseDate: "2025-11-17",
    status: "now_showing" as const,
  },
  {
    id: 9,
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    duration: "2h 55min",
    genre: "Crime, Drama",
    poster: "/src/assets/movies/posters/godfather.jpeg",
    backdrop: "/src/assets/movies/backdrops/godfather_backdrop.jpeg",
    rating: 9.2,
    releaseDate: "2025-11-11",
    status: "now_showing" as const,
  },
  {
    id: 10,
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    duration: "2h 22min",
    genre: "Drama, Romance",
    poster: "/src/assets/movies/posters/forrest_gump.jpeg",
    backdrop: "/src/assets/movies/backdrops/forrest_gump_backdrop.jpeg",
    rating: 8.8,
    releaseDate: "2025-11-10",
    status: "now_showing" as const,
  },
] as const;
