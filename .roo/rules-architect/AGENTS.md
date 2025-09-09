# Project Architecture Rules (Non-Obvious Only)

- Application follows a traditional MVC-like architecture with separate backend and frontend
- Backend uses Express.js with route-controller-model pattern
- Frontend uses vanilla JavaScript with modular functions organized by feature
- Database access is centralized through a shared Knex instance
- API responses follow a consistent format with success flag and data/error fields
- Validation is duplicated between frontend and backend for better user experience
- Frontend implements client-side filtering to reduce server requests
- Error handling middleware differentiates between development and production environments
- Static assets are served directly by Express static middleware
- Database migrations are used for schema version control
