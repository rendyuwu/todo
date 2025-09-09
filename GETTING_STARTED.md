# Getting Started with Modern TODO App

This guide will help you set up and run the Modern TODO Application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **MySQL** database server - [Download MySQL](https://dev.mysql.com/downloads/mysql/)
4. **Git** (optional, for cloning the repository) - [Download Git](https://git-scm.com/)

## Installation

### 1. Clone or Download the Repository

If you have Git installed:

```bash
git clone <repository-url>
cd todo-app
```

If you don't have Git, download and extract the project files to a folder.

### 2. Install Dependencies

Navigate to the project directory and install the required packages:

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=todo_app_dev
DB_PORT=3306
```

### 4. Set Up the Database

Start your MySQL server, then create the database:

```sql
CREATE DATABASE todo_app_dev;
```

### 5. Run Database Migrations

Apply the database schema:

```bash
npm run migrate
```

## Running the Application

### Development Mode

There are several ways to run the application in development mode:

1. **Run both servers separately** (recommended for development):

   In one terminal, start the backend server:

   ```bash
   npm run dev
   ```

   In another terminal, start the React development server:

   ```bash
   npm run start:client
   ```

2. **Run both servers simultaneously**:
   ```bash
   npm run dev:both
   ```

The application will be available at: http://localhost:3000

### Production Mode

Build the React application and start the production server:

```bash
npm run build
npm start
```

## Verifying the Installation

To verify that everything is set up correctly, run the test script:

```bash
npm run test:app
```

This will check if the server is running and responding correctly.

## Using the Application

1. Open your web browser and navigate to http://localhost:3000
2. You should see the Modern TODO App interface
3. Create, read, update, and delete todo items using the interface
4. Filter todos by status and priority using the filter buttons

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check that MySQL is running
   - Verify your database credentials in the `.env` file
   - Ensure the database `todo_app_dev` exists

2. **Port Already in Use**

   - Change the PORT in your `.env` file
   - Kill the process using the port:

     ```bash
     # On Windows
     netstat -ano | findstr :3000
     taskkill /PID <process_id> /F

     # On macOS/Linux
     lsof -i :3000
     kill -9 <process_id>
     ```

3. **Migration Errors**

   - Check database permissions
   - Verify the database exists
   - Run migrations with verbose output:
     ```bash
     npm run migrate -- --verbose
     ```

4. **Nodemon Not Found**
   - Install nodemon globally:
     ```bash
     npm install -g nodemon
     ```

### Checking Dependencies

Verify all dependencies are installed correctly:

```bash
npm list
```

### Checking Database Connection

Test the database connection:

```bash
npm run test:db
```

## Project Structure

The application is organized as follows:

```
todo-app/
├── backend/           # Server-side code
│   ├── controllers/   # Request handlers
│   ├── models/        # Data models
│   ├── routes/        # API routes
│   ├── middleware/    # Express middleware
│   └── config/        # Configuration files
├── src/               # React frontend code
│   ├── components/    # React components
│   ├── services/      # API service layer
│   ├── App.js         # Main application component
│   ├── App.css        # Application styles
│   ├── index.js       # Entry point
│   └── index.css      # Global styles
├── public/            # Public assets
│   └── index.html     # HTML template
├── build/             # Built React application
├── database/          # Database files
│   └── migrations/    # Migration scripts
├── docs/              # Documentation
├── config/            # Environment configs
├── scripts/           # Utility scripts
├── tests/             # Test files
├── .env               # Your environment config
├── .env.example       # Environment example
├── knexfile.js        # Database config
├── package.json       # Project dependencies
├── server.js          # Main server file
└── README.md          # Project overview
```

## Development Workflow

### Frontend Development

1. Start the React development server:

   ```bash
   npm run start:client
   ```

2. The development server will:
   - Automatically reload on code changes
   - Show linting errors in the browser
   - Provide hot module replacement

### Backend Development

1. Start the backend development server:

   ```bash
   npm run dev
   ```

2. The server will:
   - Automatically restart on code changes
   - Log requests and errors
   - Serve the API endpoints

### Full Development Environment

1. Start both servers:

   ```bash
   npm run dev:both
   ```

2. This will:
   - Run the backend server on port 3000
   - Run the React development server on port 3000 (with proxy to backend)
   - Automatically open the browser

## Next Steps

1. Explore the API documentation in `docs/API.md`
2. Learn about the database schema in `docs/DATABASE.md`
3. Read the deployment guide in `docs/DEPLOYMENT.md`
4. Check out the full usage guide in `USAGE.md`

## Getting Help

If you encounter any issues not covered in this guide:

1. Check the console output for error messages
2. Review the documentation in the `docs/` folder
3. Ensure all prerequisites are met
4. Verify your environment configuration

For additional support, please open an issue on the repository.
