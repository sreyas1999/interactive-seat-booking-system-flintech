
# Interactive Seat Booking System

An advanced web application for interactive seat booking in movie theatres. Users can browse movies, select theatres, view seat layouts, and book seats with real-time updates and confirmation dialogs.

## Features
- Browse movies and view details
- Select theatres and showtimes
- Interactive seat selection grid
- Real-time seat availability
- Booking summary and confirmation popup
- Responsive design for desktop and mobile
- Error boundaries and loading states

## Technologies Used
- **React** (with Hooks)
- **Redux Toolkit** (state management)
- **React Router v6** (routing)
- **TypeScript**
- **Vite** (build tool)
- **Jest** & **React Testing Library** (unit/integration tests)
- **d3-seating-chart** (seat grid rendering)
- **CSS Modules** and global styles

## Project Structure

```
src/
  assets/           # Images and static assets
  components/       # Reusable UI components
  features/         # Feature modules
  hooks/            # Custom React hooks
  pages/            # Main application pages
  redux/            # Store, slices, reducers
  styles/           # CSS files
  theme/            # Theme configuration
  types/            # TypeScript types
  utils/            # Utility functions
  __tests__/        # Test files for pages/components
public/              # Public assets
```

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/interactive-seat-booking-system-flintech.git
   cd interactive-seat-booking-system-flintech
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (default Vite port).

## Running Tests

Unit and integration tests are written using Jest and React Testing Library.

To run all tests:
```bash
npx jest
```
Or with npm script (if defined):
```bash
npm test
```

Tests are located in `src/__tests__/`. Each test file covers a main page or feature, with Redux and Router context provided for accurate simulation.

## How to Use

1. **Browse Movies:**
   - Home page lists available movies.
   - Click a movie to view details and available theatres.

2. **Select Theatre & Show:**
   - Choose a theatre and showtime for your movie.

3. **Book Seats:**
   - View interactive seat grid.
   - Select available seats; see price legend and booking summary.

4. **Confirm Booking:**
   - Review booking summary.
   - Confirm to finalize booking; see confirmation dialog.

## Development & Contribution

- Follow standard React/Redux best practices.
- Use TypeScript for type safety.
- Write tests for new features in `src/__tests__/`.
- Run `npm run lint` to check code quality (if ESLint is configured).
- Submit pull requests with clear descriptions.


