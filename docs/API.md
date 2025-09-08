# API Documentation

This document provides detailed information about the RESTful API endpoints for the Modern TODO Application.

## Base URL

All API endpoints are prefixed with `/api`. The base URL for API requests is:

```
http://localhost:3000/api
```

In production, this would be your domain:

```
https://your-domain.com/api
```

## Authentication

This API does not require authentication. All endpoints are publicly accessible.

## Rate Limiting

There is currently no rate limiting implemented. For production deployments, consider implementing rate limiting to prevent abuse.

## Error Responses

All error responses follow a consistent format:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description"
}
```

In development mode, additional details may be included:

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "Title is required",
    "Status must be one of: pending, in_progress, completed"
  ],
  "stack": "Error stack trace"
}
```

## HTTP Status Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Created               |
| 400         | Bad Request           |
| 404         | Not Found             |
| 500         | Internal Server Error |

## Todo Endpoints

### Get All Todos

Get a list of all todos with optional filtering.

```
GET /todos
```

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Sample Todo",
      "description": "This is a sample todo item",
      "status": "pending",
      "priority": "medium",
      "created_at": "2023-01-01T00:00:00.000Z",
      "updated_at": "2023-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Create Todo

Create a new todo item.

```
POST /todos
```

#### Request Body

```json
{
  "title": "New Todo Item",
  "description": "Description of the new todo",
  "status": "pending",
  "priority": "medium"
}
```

#### Required Fields

| Field | Type   | Description                                          |
| ----- | ------ | ---------------------------------------------------- |
| title | string | The title of the todo (required, max 255 characters) |

#### Optional Fields

| Field       | Type   | Description                                          |
| ----------- | ------ | ---------------------------------------------------- |
| description | string | Detailed description of the todo                     |
| status      | string | Status of the todo (pending, in_progress, completed) |
| priority    | string | Priority level (low, medium, high)                   |

#### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "New Todo Item",
    "description": "Description of the new todo",
    "status": "pending",
    "priority": "medium",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  },
  "message": "Todo created successfully"
}
```

### Get Todo by ID

Get a specific todo by its ID.

```
GET /todos/{id}
```

#### Path Parameters

| Parameter | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| id        | integer | The ID of the todo to retrieve |

#### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample Todo",
    "description": "This is a sample todo item",
    "status": "pending",
    "priority": "medium",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  }
}
```

### Update Todo

Update an existing todo item.

```
PUT /todos/{id}
```

#### Path Parameters

| Parameter | Type    | Description                  |
| --------- | ------- | ---------------------------- |
| id        | integer | The ID of the todo to update |

#### Request Body

```json
{
  "title": "Updated Todo Title",
  "description": "Updated description",
  "status": "in_progress",
  "priority": "high"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Todo Title",
    "description": "Updated description",
    "status": "in_progress",
    "priority": "high",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-02T00:00:00.000Z"
  },
  "message": "Todo updated successfully"
}
```

### Update Todo Status

Update only the status of a todo item.

```
PATCH /todos/{id}/status
```

#### Path Parameters

| Parameter | Type    | Description                  |
| --------- | ------- | ---------------------------- |
| id        | integer | The ID of the todo to update |

#### Request Body

```json
{
  "status": "completed"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample Todo",
    "description": "This is a sample todo item",
    "status": "completed",
    "priority": "medium",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-02T00:00:00.000Z"
  },
  "message": "Todo status updated successfully"
}
```

### Delete Todo

Delete a todo item.

```
DELETE /todos/{id}
```

#### Path Parameters

| Parameter | Type    | Description                  |
| --------- | ------- | ---------------------------- |
| id        | integer | The ID of the todo to delete |

#### Response

```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

## Validation Rules

### Title

- Required for creation
- Must be a string
- Cannot be empty
- Maximum 255 characters

### Description

- Optional
- Must be a string if provided

### Status

- Optional for creation and update
- Must be one of: `pending`, `in_progress`, `completed`
- Defaults to `pending` if not provided

### Priority

- Optional for creation and update
- Must be one of: `low`, `medium`, `high`
- Defaults to `medium` if not provided

### ID

- Required for update, get by ID, and delete operations
- Must be a positive integer

## Example Usage

### Creating a Todo

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, bread, eggs, and vegetables",
    "status": "pending",
    "priority": "high"
  }'
```

### Getting All Todos

```bash
curl http://localhost:3000/api/todos
```

### Updating a Todo

```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries and snacks",
    "status": "in_progress"
  }'
```

### Deleting a Todo

```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## Error Examples

### Invalid ID

```json
{
  "success": false,
  "error": "ID must be a positive integer"
}
```

### Validation Error

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "Title is required",
    "Status must be one of: pending, in_progress, completed"
  ]
}
```

### Todo Not Found

```json
{
  "success": false,
  "error": "Todo not found",
  "message": "Todo with ID 999 does not exist"
}
```

This API documentation provides comprehensive information about all available endpoints and their usage. The API follows RESTful principles and provides consistent error handling and response formats.
