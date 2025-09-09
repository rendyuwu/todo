# Project Debug Rules (Non-Obvious Only)

- Error logging only occurs in development mode for security reasons
- Database connection errors may be silently swallowed in production
- Frontend JavaScript checks for Tailwind CSS availability and degrades gracefully
- SweetAlert2 modals fall back to native browser confirm dialogs when unavailable
- API error responses include stack traces only in development mode
- Test server must be running for API tests to pass (tests require live server)
- Database migrations must be run before starting the application
- Environment variables are loaded from .env file in project root
