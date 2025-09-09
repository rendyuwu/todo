# Project Documentation Rules (Non-Obvious Only)

- Project uses a full-stack architecture with Node.js/Express backend and vanilla JavaScript frontend
- Database layer uses Knex.js query builder with MySQL
- Frontend implements progressive enhancement with Tailwind CSS CDN and local fallback
- API follows REST conventions with consistent response format across all endpoints
- Validation is implemented in both frontend forms and backend middleware
- Application state is persisted in MySQL database with migrations
- Testing requires a running server instance (integration tests, not unit tests)
- Environment-specific configuration is managed through .env files
