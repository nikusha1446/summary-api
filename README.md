# Summary API

AI-powered text summarization REST API built with Node.js, Express, MongoDB, and OpenAI GPT-4o-mini.

## Features

- 🔐 **User Authentication** - JWT-based authentication with secure password hashing
- 📝 **Document Management** - CRUD operations for text documents
- 🤖 **AI Summarization** - Generate summaries in multiple styles using OpenAI
- ✅ **Validation** - Input validation using Zod

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcryptjs
- **AI:** OpenAI API (GPT-4o-mini)
- **Validation:** Zod

## Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikusha1446/summary-api.git
   cd summary-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/summary_api?appName=cluster
   JWT_SECRET=your-secret-jwt-key
   JWT_EXPIRES_IN=7d
   OPENAI_API_KEY=sk-proj-your-openai-api-key-here
   ```

4. **Start the server**
   
   Development mode (with hot reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## API Documentation

Base URL: `http://localhost:3000/api`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-11-27T..."
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-11-27T..."
  }
}
```

---

### Document Endpoints

All document endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

#### Create Document
```http
POST /api/documents
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Document",
  "content": "This is the content of my document..."
}
```

**Response (201):**
```json
{
  "message": "Document created successfully",
  "document": {
    "id": "...",
    "title": "My Document",
    "content": "This is the content...",
    "userId": "...",
    "createdAt": "2025-11-27T...",
    "updatedAt": "2025-11-27T..."
  }
}
```

#### Get All Documents
```http
GET /api/documents?page=1&limit=10
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200):**
```json
{
  "documents": [
    {
      "id": "...",
      "title": "My Document",
      "content": "This is the content...",
      "userId": "...",
      "createdAt": "2025-11-27T...",
      "updatedAt": "2025-11-27T..."
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalDocuments": 42,
    "limit": 10
  }
}
```

#### Get Document by ID
```http
GET /api/documents/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "document": {
    "id": "...",
    "title": "My Document",
    "content": "This is the content...",
    "userId": "...",
    "createdAt": "2025-11-27T...",
    "updatedAt": "2025-11-27T..."
  }
}
```

#### Update Document
```http
PATCH /api/documents/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

**Note:** If content is changed, all associated summaries are automatically deleted.

**Response (200):**
```json
{
  "message": "Document updated successfully. All summaries have been deleted due to content change.",
  "document": {
    "id": "...",
    "title": "Updated Title",
    "content": "Updated content...",
    "userId": "...",
    "createdAt": "2025-11-27T...",
    "updatedAt": "2025-11-27T..."
  }
}
```

#### Delete Document
```http
DELETE /api/documents/:id
Authorization: Bearer <token>
```

**Note:** Deletes the document and all associated summaries.

**Response (200):**
```json
{
  "message": "Document and associated summaries deleted successfully"
}
```

---

### Summary Endpoints

All summary endpoints require authentication.

#### Create Summary
```http
POST /api/summaries
Authorization: Bearer <token>
Content-Type: application/json

{
  "documentId": "...",
  "style": "brief"
}
```

**Style Options:**
- `brief` - Concise 2-3 sentence summary
- `detailed` - Comprehensive summary with all key points
- `bullet-points` - Summary in bullet point format

**Response (201):**
```json
{
  "message": "Summary created successfully",
  "summary": {
    "id": "...",
    "content": "This is a brief AI-generated summary...",
    "style": "brief",
    "documentId": "...",
    "createdAt": "2025-11-27T..."
  }
}
```

#### Get Summaries for Document
```http
GET /api/summaries/document/:documentId
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "document": {
    "id": "...",
    "title": "My Document",
    "content": "This is the content..."
  },
  "summaries": [
    {
      "id": "...",
      "content": "Bullet point summary...",
      "style": "bullet-points",
      "createdAt": "2025-11-27T..."
    },
    {
      "id": "...",
      "content": "Brief summary...",
      "style": "brief",
      "createdAt": "2025-11-27T..."
    }
  ],
  "count": 2
}
```

#### Delete Summary
```http
DELETE /api/summaries/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Summary deleted successfully"
}
```

---

## Project Structure

```
summary-api/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── document.controller.js # Document CRUD logic
│   │   └── summary.controller.js # Summary logic with OpenAI
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT verification
│   │   └── validate.middleware.js # Zod validation
│   ├── models/
│   │   ├── user.model.js         # User schema
│   │   ├── document.model.js     # Document schema
│   │   └── summary.model.js      # Summary schema
│   ├── routes/
│   │   ├── index.js              # Main router
│   │   ├── auth.routes.js        # Auth routes
│   │   ├── document.routes.js    # Document routes
│   │   └── summary.routes.js     # Summary routes
│   ├── utils/
│   │   ├── bcrypt.util.js        # Password hashing
│   │   ├── jwt.util.js           # JWT generation/verification
│   │   └── openai.util.js        # OpenAI API integration
│   ├── validators/
│   │   ├── auth.validator.js     # Auth validation schemas
│   │   ├── document.validator.js # Document validation schemas
│   │   └── summary.validator.js  # Summary validation schemas
│   └── index.js                  # App entry point
├── .env                          # Environment variables (not in git)
├── .env.example                  # Example environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String (optional),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Document
```javascript
{
  _id: ObjectId,
  title: String (optional),
  content: String (required),
  userId: ObjectId (ref: User),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Summary
```javascript
{
  _id: ObjectId,
  content: String (required),
  style: Enum ['brief', 'detailed', 'bullet-points'],
  documentId: ObjectId (ref: Document),
  createdAt: DateTime
}
```

**Relationships:**
- User → Documents (one-to-many)
- Document → Summaries (one-to-many)

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` |
| `JWT_EXPIRES_IN` | JWT token expiration | `7d` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-proj-...` |

---

## License

ISC
