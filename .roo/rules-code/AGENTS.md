# Project Coding Rules (Non-Obvious Only)

- All API responses must follow the format with `success`, `data`, and `message`/`error` fields
- Database models return `null` for non-existent records rather than throwing errors
- Validation middleware returns 400 status codes with detailed error arrays in a `details` field
- Frontend JavaScript implements graceful degradation when Tailwind CSS CDN fails by checking availability
- All database operations must use the shared Knex instance from `backend/config/database.js`
- Validation rules are duplicated between frontend forms and backend middleware for better UX
- Frontend implements client-side filtering for both status and priority with dynamic UI updates
- Error responses expose stack traces and details only in development mode for security
- API endpoints are prefixed with `/api/todos` and follow REST conventions with proper HTTP methods
- Static assets must be served from `frontend/public/` with Express static middleware
