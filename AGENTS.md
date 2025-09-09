# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build/Lint/Test Commands

- Run tests with `npm test` (runs all tests in tests/ directory)
- Run a single test file with `npx mocha tests/api.test.js --timeout 10000`
- Database migrations: `npm run migrate` (uses knex)
- Start development server: `npm run dev` (uses nodemon)
- Start React development server: `npm run start:client`
- Start both servers: `npm run dev:both`
- Build React app for production: `npm run build`
- Start production server: `npm start`

## Code Style Guidelines

- All API responses follow a consistent format with `success`, `data`, and `message`/`error` fields
- Controllers use async/await pattern with try/catch blocks
- Models return `null` for non-existent records rather than throwing errors
- Validation middleware returns 400 status codes with detailed error arrays
- Frontend uses React.js with functional components and hooks
- Frontend uses Tailwind CSS for styling
- Database queries use Knex.js query builder (not raw SQL)
- Environment variables are loaded via dotenv in both backend and database config
- Error responses expose stack traces and details only in development mode

## Project-Specific Patterns

- Todos have three statuses: "pending", "in_progress", "completed"
- Todos have three priorities: "low", "medium", "high" (defaults to "medium")
- Frontend uses SweetAlert2 for modals
- API endpoints are prefixed with `/api/todos` and follow REST conventions
- Database migrations are stored in `database/migrations/` with timestamp-based filenames
- Frontend implements client-side filtering for both status and priority
- All database operations use the shared Knex instance from `backend/config/database.js`
- Validation rules are duplicated between frontend forms and backend middleware
- Error handling middleware distinguishes between development and production responses
- Static assets served from `public/` and `build/` directories with Express static middleware

## Testing Specifics

- Tests use chai-http for API testing with Mocha test runner
- Test server URL configurable via TEST_SERVER_URL environment variable
- Tests require running server instance (not isolated unit tests)
- Each test suite verifies API response structure and status codes
- Tests create and delete their own test data during execution

## React-Specific Guidelines

- Use functional components with hooks for state management
- Follow component-based architecture with clear separation of concerns
- Use Axios for API calls
- Implement proper error handling and loading states
- Use Tailwind CSS classes for styling
- Follow React best practices for component lifecycle and re-rendering
- Use prop-types or TypeScript for type checking
- Implement proper accessibility attributes
- Use React Router for client-side routing (if applicable)
