# API Routes Documentation

Complete documentation of all API endpoints in the WRK Platform.

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication

All `/dashboard/*` endpoints require authentication via NextAuth session.

### Headers Required for Protected Routes
```http
Cookie: next-auth.session-token=<session-token>
```

---

## Authentication Endpoints

### NextAuth Core Endpoints

#### `GET /api/auth/providers`
Returns list of configured authentication providers.

**Response:**
```json
{
  "credentials": {
    "id": "credentials",
    "name": "credentials",
    "type": "credentials",
    "signinUrl": "http://localhost:3000/api/auth/signin/credentials",
    "callbackUrl": "http://localhost:3000/api/auth/callback/credentials"
  }
}
```

#### `POST /api/auth/signin/credentials`
Sign in with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "csrfToken": "token-from-csrf-endpoint"
}
```

**Response:** Redirect to dashboard or error page

#### `GET /api/auth/session`
Get current user session.

**Response:**
```json
{
  "user": {
    "email": "demo@wrk.ph",
    "name": "Demo User",
    "id": "user-id",
    "role": "CLIENT"
  },
  "expires": "2024-01-01T00:00:00.000Z"
}
```

#### `POST /api/auth/signout`
Sign out current user.

**Response:** Redirect to homepage

#### `GET /api/auth/csrf`
Get CSRF token for forms.

**Response:**
```json
{
  "csrfToken": "csrf-token-value"
}
```

### Custom Auth Endpoints

#### `POST /api/auth/signup`
Register new user account.

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "company": "Acme Inc"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully"
}
```

---

## Dashboard API Endpoints

### Projects

#### `GET /api/dashboard/projects`
Get all projects for authenticated user.

**Authentication:** Required

**Response:**
```json
[
  {
    "id": "project-id",
    "name": "Website Redesign",
    "description": "Complete website overhaul",
    "status": "ACTIVE",
    "creditBalance": 30000,
    "userId": "user-id",
    "serviceId": "service-id",
    "service": {
      "id": "service-id",
      "name": "Website Development",
      "category": "WEBSITE"
    },
    "tasks": [
      {
        "id": "task-id",
        "title": "Design Homepage",
        "status": "IN_PROGRESS"
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### `POST /api/dashboard/projects`
Create a new project.

**Authentication:** Required

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description",
  "serviceId": "website",
  "status": "ACTIVE"
}
```

**Response:**
```json
{
  "id": "new-project-id",
  "name": "New Project",
  "description": "Project description",
  "status": "ACTIVE",
  "creditBalance": 30000,
  "userId": "user-id",
  "serviceId": "service-id",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### `GET /api/dashboard/projects/[id]`
Get single project details.

**Authentication:** Required

**Response:** Project object with all relations

#### `PUT /api/dashboard/projects/[id]`
Update project details.

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "status": "ON_HOLD"
}
```

#### `DELETE /api/dashboard/projects/[id]`
Delete a project.

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Project deleted"
}
```

### Tasks

#### `GET /api/dashboard/tasks`
Get all tasks for user's projects.

**Authentication:** Required

**Query Parameters:**
- `projectId` (optional) - Filter by project
- `status` (optional) - Filter by status (TODO, IN_PROGRESS, REVIEW, DONE)

**Response:**
```json
[
  {
    "id": "task-id",
    "projectId": "project-id",
    "title": "Implement feature",
    "description": "Feature details",
    "status": "TODO",
    "dueDate": "2024-01-15T00:00:00.000Z",
    "project": {
      "id": "project-id",
      "name": "Project Name",
      "service": {
        "name": "Service Name",
        "category": "WEBSITE"
      }
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### `POST /api/dashboard/tasks`
Create a new task.

**Authentication:** Required

**Request Body:**
```json
{
  "projectId": "project-id",
  "title": "New Task",
  "description": "Task description",
  "status": "TODO",
  "dueDate": "2024-01-15"
}
```

#### `PATCH /api/dashboard/tasks`
Update task status.

**Authentication:** Required

**Request Body:**
```json
{
  "taskId": "task-id",
  "status": "IN_PROGRESS"
}
```

#### `PUT /api/dashboard/tasks/[id]`
Update task details.

**Authentication:** Required

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "DONE",
  "dueDate": "2024-01-20"
}
```

#### `DELETE /api/dashboard/tasks/[id]`
Delete a task.

**Authentication:** Required

---

## Other Endpoints (Stubs/Planned)

### Service Requests
- `GET /api/requests` - List service requests
- `POST /api/requests` - Create service request

### Quotes
- `GET /api/quotes` - List quotes
- `POST /api/quotes` - Create quote

### Invoices
- `GET /api/invoices` - List invoices
- `POST /api/invoices` - Create invoice

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/[id]` - Mark as read

### Upload
- `POST /api/upload` - Upload files (S3 integration pending)

### Stripe Webhook
- `POST /api/stripe/webhook` - Handle Stripe events

---

## Error Responses

All endpoints use consistent error formatting:

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Testing Endpoints

### Using cURL

#### Get Session
```bash
curl http://localhost:3000/api/auth/session
```

#### Sign In
```bash
curl -X POST http://localhost:3000/api/auth/signin/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@wrk.ph","password":"demo123"}'
```

#### Get Projects (with cookie)
```bash
curl http://localhost:3000/api/dashboard/projects \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

### Using Fetch (Browser/Node)

```javascript
// Sign In
const signIn = await fetch('/api/auth/signin/credentials', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'demo@wrk.ph',
    password: 'demo123'
  })
});

// Get Projects
const projects = await fetch('/api/dashboard/projects', {
  credentials: 'include' // Include cookies
});
const data = await projects.json();
```

---

## Rate Limiting

Currently not implemented. Planned limits:
- Authentication: 5 attempts per minute
- API calls: 100 requests per minute per user

## Webhooks

### Stripe Webhooks (Planned)
- `payment_intent.succeeded`
- `customer.subscription.created`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`

---

## Development Notes

1. All dashboard endpoints require authentication
2. User can only access their own resources
3. Validation happens on both client and server
4. Use consistent error messages
5. Return appropriate HTTP status codes

---

**Last Updated**: December 2024  
**Version**: 1.0.0