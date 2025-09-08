# Deployment Guide

This guide provides detailed instructions for deploying the Modern TODO Application to different environments.

## Prerequisites

Before deploying, ensure you have:

1. Node.js (v14 or higher) installed
2. MySQL database access
3. Git (for version control)
4. SSH access to the deployment server (for remote deployments)

## Environment Configuration

### Development Environment

The development environment is configured in `config/development.env`:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=todo_app_dev
```

### Staging Environment

The staging environment is configured in `config/staging.env`:

```env
NODE_ENV=staging
PORT=3000
DB_HOST=staging-db-host
DB_USER=todo_staging_user
DB_PASSWORD=secure_password
DB_NAME=todo_app_staging
```

### Production Environment

For production, create a `.env` file with:

```env
NODE_ENV=production
PORT=80
DB_HOST=production-db-host
DB_USER=todo_prod_user
DB_PASSWORD=very_secure_password
DB_NAME=todo_app_production
```

## Database Setup

### 1. Create Database

Create the database for your target environment:

```sql
-- For development
CREATE DATABASE todo_app_dev;

-- For staging
CREATE DATABASE todo_app_staging;

-- For production
CREATE DATABASE todo_app_production;
```

### 2. Run Migrations

Execute database migrations to set up the schema:

```bash
# Development
npm run migrate

# Staging
NODE_ENV=staging npm run migrate

# Production
NODE_ENV=production npm run migrate
```

## Deployment Steps

### Local Development Deployment

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
   # Edit .env with your database credentials
   ```

4. Run migrations:

   ```bash
   npm run migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Staging Deployment

1. Clone the repository on the staging server:

   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install --production
   ```

3. Copy staging environment configuration:

   ```bash
   cp config/staging.env .env
   # Edit .env with staging database credentials
   ```

4. Run migrations:

   ```bash
   NODE_ENV=staging npm run migrate
   ```

5. Start the server:
   ```bash
   NODE_ENV=staging npm start
   ```

### Production Deployment

1. Clone the repository on the production server:

   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install --production
   ```

3. Copy production environment configuration:

   ```bash
   cp config/production.env .env
   # Edit .env with production database credentials
   ```

4. Run migrations:

   ```bash
   NODE_ENV=production npm run migrate
   ```

5. Start the server:
   ```bash
   NODE_ENV=production npm start
   ```

## Using PM2 for Production

For production deployments, it's recommended to use PM2 process manager:

1. Install PM2 globally:

   ```bash
   npm install -g pm2
   ```

2. Start the application with PM2:

   ```bash
   NODE_ENV=production pm2 start server.js --name "todo-app"
   ```

3. Set PM2 to start on system boot:
   ```bash
   pm2 startup
   pm2 save
   ```

## Reverse Proxy Configuration

### Nginx Configuration

For production deployments, use Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Apache Configuration

Alternatively, use Apache with mod_proxy:

```apache
<VirtualHost *:80>
    ServerName your-domain.com

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

## SSL Configuration

For HTTPS, obtain SSL certificates using Let's Encrypt:

1. Install Certbot:

   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. Obtain SSL certificate:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Monitoring and Logging

### Application Logs

Application logs are output to the console by default. For production, redirect logs to files:

```bash
NODE_ENV=production npm start > app.log 2> error.log &
```

### PM2 Logs

If using PM2, view logs with:

```bash
pm2 logs todo-app
```

### Database Monitoring

Monitor database performance with:

```sql
SHOW PROCESSLIST;
SHOW STATUS LIKE 'Threads_connected';
```

## Backup and Recovery

### Database Backup

Create regular backups of your database:

```bash
mysqldump -u username -p database_name > backup.sql
```

### Automated Backups

Set up automated backups with cron:

```bash
# Daily backup at 2 AM
0 2 * * * mysqldump -u username -p database_name > /backups/backup-$(date +\%Y\%m\%d).sql
```

## Scaling Considerations

### Horizontal Scaling

For high traffic, deploy multiple instances behind a load balancer:

1. Deploy multiple application instances on different ports
2. Use a load balancer (Nginx, HAProxy, or cloud load balancer)
3. Share session data using Redis or database sessions

### Database Scaling

For database scaling:

1. Use connection pooling in knexfile.js
2. Implement read replicas for read-heavy operations
3. Consider database sharding for very large datasets

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check database credentials in .env file
   - Verify database server is running
   - Ensure firewall allows connections on database port

2. **Port Already in Use**

   - Change PORT in .env file
   - Kill existing process: `lsof -i :3000 | grep LISTEN`

3. **Migration Errors**
   - Check database permissions
   - Verify database exists
   - Run migrations with verbose logging

### Health Checks

Implement health checks by adding a `/health` endpoint to server.js:

```javascript
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
```

## Security Considerations

### Environment Variables

Never commit sensitive environment variables to version control. Use:

- `.env` files for local development (add to .gitignore)
- Environment variable management tools for production
- Secret management services for cloud deployments

### Database Security

1. Use strong database passwords
2. Limit database user privileges
3. Use SSL connections for remote databases
4. Regularly update database software

### Application Security

1. Keep Node.js and dependencies updated
2. Use helmet.js for security headers (already implemented)
3. Implement rate limiting for API endpoints
4. Validate and sanitize all user inputs (already implemented)

## Performance Optimization

### Caching

Implement caching for frequently accessed data:

```javascript
const redis = require("redis");
const client = redis.createClient();

// Cache todo list for 5 minutes
app.get("/api/todos", async (req, res) => {
  const cached = await client.get("todos");
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const todos = await Todo.getAll();
  await client.setex("todos", 300, JSON.stringify(todos));
  res.json({ success: true, data: todos });
});
```

### Database Indexes

Add indexes to frequently queried columns:

```sql
CREATE INDEX idx_todos_status ON todos(status);
CREATE INDEX idx_todos_priority ON todos(priority);
CREATE INDEX idx_todos_created_at ON todos(created_at);
```

This deployment guide provides a comprehensive overview of deploying the Modern TODO Application to various environments. Follow these steps to successfully deploy and maintain your application.
