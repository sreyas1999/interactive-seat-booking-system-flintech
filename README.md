
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
api/                # Vercel serverless functions (API endpoints)
public/             # Public assets
```

## API Endpoints

The application includes Vercel serverless functions for backend API:

### GET `/api/movies`

Returns a list of movies with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by movie status (`now_showing` or `coming_soon`)
- `id` (optional): Get a specific movie by ID

**Examples:**
```bash
# Get all movies
curl https://your-domain.vercel.app/api/movies

# Get only now showing movies
curl https://your-domain.vercel.app/api/movies?status=now_showing

# Get a specific movie
curl https://your-domain.vercel.app/api/movies?id=1
```

**Response Format:**
```json
{
  "success": true,
  "data": [...],
  "total": 10
}
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

3. **Configure environment variables:**
   
   Create a `.env.local` file in the project root:
   
   ```bash
   # .env.local
   VITE_API_BASE_URL=http://localhost:3000
   ```
   
   **Note:** Default values work for local development, so this step is optional unless you need custom configuration.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (default Vite port).

5. **Start API server locally:**
   
   The application uses Vercel serverless functions for the API. To run the API locally:
   
   ```bash
   # Install Vercel CLI globally if not already installed
   npm install -g vercel
   
   # Start local API and frontend server together
   vercel dev
   ```
   
   This will start:
   - Frontend (Vite dev server) at `http://localhost:3000`
   - API endpoints at `http://localhost:3000/api/movies`
   
   **Note:** When running `vercel dev`, it automatically handles both frontend and API routes.

## Environment Variables

The application uses environment variables for configuration:

- **`.env.local`**: Local development configuration (not committed to git)
- **`.env.production`**: Production configuration (committed to git)

**Required Variables:**
- `VITE_API_BASE_URL`: Base URL for API endpoints
  - Development: `http://localhost:3000` (default)
  - Production: `https://your-domain.vercel.app`

**Note:** Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client.

## Smart Caching Strategy

The application implements intelligent data caching for optimal performance:

- **Cache Duration**: Movie data is cached for 5 minutes
- **Auto-Refresh**: Automatically refetches data when cache expires
- **Performance**: Instant page loads with cached data
- **Freshness**: Always serves recent data without manual refresh
- **Storage**: Uses Redux for runtime cache + localStorage for timestamp tracking

This approach provides:
- ✅ Fast navigation between pages (no repeated API calls)
- ✅ Reduced server load and bandwidth usage
- ✅ Fresh data (auto-updates every 5 minutes)
- ✅ Better mobile experience (lower data consumption)

## Deployment

Deploy to Vercel:

```bash
# Login to Vercel (if not already logged in)
vercel login

# Deploy to production
vercel --prod
```

The application and API endpoints will be automatically deployed together.

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


