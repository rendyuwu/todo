# Modern Full-Stack TODO Application

A modern, full-stack TODO application built with Node.js, Express.js, MySQL, and Tailwind CSS. This application implements complete CRUD functionality for managing todo items with a clean, responsive user interface.

## ✅ CSP Issue Fixed!

**Important Update**: The application previously had issues with button functionality (Edit, Delete, Done) due to Content Security Policy (CSP) violations. This has been fixed by removing inline event handlers and implementing proper event delegation. See [CSP Fix Documentation](docs/CSP_FIX.md) for details.

## ✅ Enhanced User Experience with SweetAlert2

**New Feature**: The application now uses SweetAlert2 for beautiful, customizable confirmation dialogs instead of basic browser alerts. This enhances the user experience with modern, professional-looking dialogs.

## Features

- **Full CRUD Operations**: Create, Read, Update, Delete todo items
- **Responsive UI**: Mobile-friendly interface using Tailwind CSS
- **RESTful API**: Well-structured API endpoints for todo management
- **Database Integration**: MySQL database with Knex.js migrations
- **Environment Configuration**: Separate configs for development and staging
- **Input Validation**: Comprehensive validation for all user inputs
- **Error Handling**: Graceful error handling and user feedback
- **Modern JavaScript**: ES6+ syntax throughout the codebase
- **CSP Compliant**: No inline event handlers, uses event delegation
- **Enhanced UX**: SweetAlert2 for beautiful confirmation dialogs

## Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: Server-side rendered HTML with JavaScript
- **Database**: MySQL
- **ORM/Migration**: Knex.js
- **Styling**: Tailwind CSS
- **Confirmation Dialogs**: SweetAlert2
- **Environment Management**: dotenv

## Project Structure

```
todo-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
├── frontend/
│   ├── views/
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   └── assets/
│   └── controllers/
├── database/
│   └── migrations/
├── config/
│   ├── development.env
│   └── staging.env
├── .env.example
├── knexfile.js
├── package.json
├── server.js
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your database credentials

4. Create database tables:
   ```bash
   npm run migrate
   ```

## Database Setup

1. Create a MySQL database:

   ```sql
   CREATE DATABASE todo_app_dev;
   ```

2. Update your `.env` file with the correct database credentials:

   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=todo_app_dev
   ```

3. Run migrations:
   ```bash
   npm run migrate
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run migrate:rollback` - Rollback the last migration
- `npm run migrate:make <name>` - Create a new migration file
- `npm test` - Run all tests
- `npm run test:csp` - Test CSP fix implementation
- `npm run test:sweetalert` - Test SweetAlert2 implementation

## API Endpoints

### Todo Routes

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| GET    | `/api/todos`            | Get all todos       |
| POST   | `/api/todos`            | Create a new todo   |
| GET    | `/api/todos/:id`        | Get a specific todo |
| PUT    | `/api/todos/:id`        | Update a todo       |
| PATCH  | `/api/todos/:id/status` | Update todo status  |
| DELETE | `/api/todos/:id`        | Delete a todo       |

### Todo Object

```json
{
  "id": 1,
  "title": "Sample Todo",
  "description": "This is a sample todo item",
  "status": "pending",
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}
```

## Environment Configuration

### Development (.env.development)

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=todo_app_dev
```

### Staging (.env.staging)

```env
NODE_ENV=staging
PORT=3000
DB_HOST=staging-db-host
DB_USER=todo_staging_user
DB_PASSWORD=secure_password
DB_NAME=todo_app_staging
```

## Database Schema

### Todos Table

| Column      | Type         | Constraints                                           |
| ----------- | ------------ | ----------------------------------------------------- |
| id          | INT          | PRIMARY KEY, AUTO_INCREMENT                           |
| title       | VARCHAR(255) | NOT NULL                                              |
| description | TEXT         | NULL                                                  |
| status      | ENUM         | pending, in_progress, completed                       |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                             |
| updated_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

## Development Workflow

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Access the application at `http://localhost:3000`

3. Make changes to the code - nodemon will automatically restart the server

## Deployment

### Staging Deployment

1. Set `NODE_ENV=staging` in your environment
2. Configure staging database credentials
3. Run migrations:
   ```bash
   NODE_ENV=staging npm run migrate
   ```
4. Start the server:
   ```bash
   NODE_ENV=staging npm start
   ```

### Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production database credentials
3. Run migrations:
   ```bash
   NODE_ENV=production npm run migrate
   ```
4. Start the server:
   ```bash
   NODE_ENV=production npm start
   ```

## Testing

Run the test suite with:

```bash
npm test
```

Test the CSP fix with:

```bash
npm run test:csp
```

Test SweetAlert2 implementation with:

```bash
npm run test:sweetalert
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on the repository.
