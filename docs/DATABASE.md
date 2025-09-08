# Database Schema Documentation

This document describes the database schema for the Modern TODO Application.

## Database Engine

The application uses MySQL as its database engine. The schema is designed to be compatible with MySQL 5.7+ and MariaDB 10.2+.

## Tables

### Todos Table

The main table for storing todo items.

#### Schema

```sql
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Columns

| Column      | Type         | Constraints                                           | Description                              |
| ----------- | ------------ | ----------------------------------------------------- | ---------------------------------------- |
| id          | INT          | PRIMARY KEY, AUTO_INCREMENT                           | Unique identifier for each todo          |
| title       | VARCHAR(255) | NOT NULL                                              | The title of the todo item               |
| description | TEXT         | NULL                                                  | Detailed description of the todo         |
| status      | ENUM         | DEFAULT 'pending'                                     | Current status of the todo               |
| priority    | ENUM         | DEFAULT 'medium'                                      | Priority level of the todo               |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                             | Timestamp when the todo was created      |
| updated_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp when the todo was last updated |

#### Status Values

The `status` column accepts the following values:

- `pending` - The todo is waiting to be started
- `in_progress` - The todo is currently being worked on
- `completed` - The todo has been finished

#### Priority Values

The `priority` column accepts the following values:

- `low` - Low priority task
- `medium` - Medium priority task (default)
- `high` - High priority task

## Indexes

### Primary Key Index

```sql
PRIMARY KEY (id)
```

Automatically created for the `id` column.

### Default Indexes

The following indexes are recommended for optimal performance:

```sql
-- Index for filtering by status
CREATE INDEX idx_todos_status ON todos(status);

-- Index for filtering by priority
CREATE INDEX idx_todos_priority ON todos(priority);

-- Index for sorting by creation date
CREATE INDEX idx_todos_created_at ON todos(created_at);

-- Composite index for filtering by status and priority
CREATE INDEX idx_todos_status_priority ON todos(status, priority);
```

## Relationships

The todos table is currently a standalone table with no foreign key relationships. This keeps the schema simple and focused on the core functionality.

## Migrations

Database schema changes are managed using Knex.js migrations. Each migration file contains both `up` and `down` functions to apply and rollback changes.

### Migration Files

1. `20250908000000_create_todos_table.js` - Creates the initial todos table
2. `20250908000001_add_priority_to_todos_table.js` - Adds the priority column

### Running Migrations

To apply all pending migrations:

```bash
npm run migrate
```

To rollback the last migration:

```bash
npm run migrate:rollback
```

To create a new migration:

```bash
npm run migrate:make migration_name
```

## Sample Data

Here are some example records that might exist in the todos table:

```sql
INSERT INTO todos (title, description, status, priority) VALUES
('Complete project proposal', 'Finish the project proposal document and send to stakeholders', 'in_progress', 'high'),
('Buy groceries', 'Milk, bread, eggs, and vegetables', 'pending', 'medium'),
('Schedule team meeting', 'Coordinate with team members for weekly sync', 'completed', 'low'),
('Research new technologies', 'Look into new frameworks for upcoming projects', 'pending', 'medium');
```

## Backup and Recovery

### Backup Strategy

Regular backups should be performed using mysqldump:

```bash
mysqldump -u username -p database_name > backup_$(date +%Y%m%d).sql
```

### Recovery Process

To restore from a backup:

```bash
mysql -u username -p database_name < backup_file.sql
```

## Performance Considerations

### Query Optimization

1. Use indexes on frequently queried columns
2. Limit the number of rows returned when possible
3. Use pagination for large result sets

### Connection Pooling

The application uses connection pooling through Knex.js to efficiently manage database connections:

```javascript
pool: {
  min: 2,
  max: 10
}
```

## Security Considerations

### SQL Injection Prevention

All database queries use parameterized statements to prevent SQL injection attacks.

### Data Validation

Input validation is performed at both the API and database levels.

### Access Control

Database users should have minimal required privileges:

```sql
-- Create a dedicated user for the application
CREATE USER 'todo_app'@'localhost' IDENTIFIED BY 'strong_password';

-- Grant only necessary privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON todo_app.* TO 'todo_app'@'localhost';
```

This database schema documentation provides a comprehensive overview of the database structure and management practices for the Modern TODO Application.
