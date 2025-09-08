# Usage Guide

This guide explains how to set up, run, and use the Modern TODO Application.

## Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rendyuwu/todo.git
   cd todo-app
   ```

2. **Run the setup script:**

   ```bash
   npm run setup
   ```

3. **Edit the environment file:**

   ```bash
   # Edit .env with your database credentials
   nano .env
   ```

4. **Run database migrations:**

   ```bash
   npm run migrate
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

6. **Open your browser to:**
   ```
   http://localhost:3000
   ```

## Prerequisites

Before using the application, ensure you have:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MySQL** database server
- **Git** (for cloning the repository)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/rendyuwu/todo.git
cd todo-app
```

### 2. Install Dependencies

You can install dependencies manually or use the setup script:

**Manual installation:**

```bash
npm install
```

**Using setup script:**

```bash
npm run setup
```

### 3. Configure Environment

Copy the example environment file and edit it with your settings:

```bash
cp .env.example .env
nano .env  # or use your preferred text editor
```

Edit the following values:

```env
DB_HOST=localhost      # Your MySQL server host
DB_USER=your_username  # Your MySQL username
DB_PASSWORD=your_password  # Your MySQL password
DB_NAME=todo_app_dev   # Your database name
```

### 4. Set Up Database

Create the database in MySQL:

```sql
CREATE DATABASE todo_app_dev;
CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON todo_app_dev.* TO 'todo_user'@'localhost';
FLUSH PRIVILEGES;
```

### 5. Run Migrations

Apply the database schema:

```bash
npm run migrate
```

## Running the Application

### Development Mode

Start the development server with auto-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Mode

Start the production server:

```bash
npm start
```

## Using the Application

### Web Interface

1. **Access the Application**
   Open your web browser and navigate to `http://localhost:3000`

2. **Create a Todo**

   - Fill in the title (required)
   - Add a description (optional)
   - Select status and priority
   - Click "Add Task"

3. **View Todos**

   - All todos are displayed in the main list
   - Todos are sorted by creation date (newest first)

4. **Filter Todos**

   - Use status filters: All, Pending, In Progress, Completed
   - Use priority filters: All, High, Medium, Low

5. **Edit a Todo**

   - Click the edit icon (pencil) on any todo
   - Modify the fields in the modal
   - Click "Save Changes"

6. **Update Status**

   - Click the checkmark icon to mark a todo as completed
   - Or use the edit modal to change status

7. **Delete a Todo**
   - Click the trash icon on any todo
   - Confirm the deletion in the popup

### API Usage

The application provides a RESTful API at `/api/todos`:

#### Get All Todos

```bash
curl http://localhost:3000/api/todos
```

#### Create Todo

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Todo",
    "description": "Description here",
    "status": "pending",
    "priority": "medium"
  }'
```

#### Get Specific Todo

```bash
curl http://localhost:3000/api/todos/1
```

#### Update Todo

```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Todo",
    "status": "in_progress"
  }'
```

#### Update Status

```bash
curl -X PATCH http://localhost:3000/api/todos/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

#### Delete Todo

```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## Testing

### Run All Tests

```bash
npm test
```

### Run API Tests

```bash
npm run test:api
```

### Test Database Connection

```bash
npm run test:db
```

## Database Management

### Run Migrations

```bash
npm run migrate
```

### Rollback Last Migration

```bash
npm run migrate:rollback
```

### Create New Migration

```bash
npm run migrate:make migration_name
```

## Project Structure

```
todo-app/
├── backend/           # Server-side code
│   ├── controllers/   # Request handlers
│   ├── models/        # Data models
│   ├── routes/        # API routes
│   ├── middleware/    # Express middleware
│   └── config/        # Configuration files
├── frontend/          # Client-side code
│   ├── views/         # HTML templates
│   ├── public/        # Static assets
│   │   ├── css/       # Stylesheets
│   │   ├── js/        # JavaScript files
│   │   └── assets/    # Images, fonts, etc.
│   └── controllers/   # Page controllers
├── database/          # Database files
│   └── migrations/    # Migration scripts
├── docs/              # Documentation
├── config/            # Environment configs
├── scripts/           # Utility scripts
├── tests/             # Test files
├── .env.example       # Environment example
├── .env               # Your environment config
├── knexfile.js        # Database config
├── package.json       # Project dependencies
├── server.js          # Main server file
├── README.md          # Project overview
└── USAGE.md           # This file
```

## Configuration

### Environment Variables

The application uses the following environment variables:

| Variable    | Description                                  | Default      |
| ----------- | -------------------------------------------- | ------------ |
| NODE_ENV    | Environment (development/staging/production) | development  |
| PORT        | Server port                                  | 3000         |
| DB_HOST     | Database host                                | localhost    |
| DB_USER     | Database user                                | root         |
| DB_PASSWORD | Database password                            | password     |
| DB_NAME     | Database name                                | todo_app_dev |
| DB_PORT     | Database port                                | 3306         |

### Multiple Environments

The project includes configuration files for different environments:

- `config/development.env` - Development settings
- `config/staging.env` - Staging settings

To use a specific environment:

```bash
NODE_ENV=staging npm start
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check database credentials in `.env`
   - Ensure MySQL server is running
   - Verify database exists

2. **Port Already in Use**

   - Change PORT in `.env`
   - Kill existing process: `lsof -i :3000`

3. **Migration Errors**

   - Check database permissions
   - Verify database exists
   - Run migrations with verbose logging

4. **Nodemon Not Found**
   - Run: `npm install -g nodemon`
   - Or install locally: `npm install --save-dev nodemon`

### Getting Help

For issues not covered in this guide:

1. Check the console output for error messages
2. Review the documentation in the `docs/` folder
3. Open an issue on the repository

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
