# Book Review API

A RESTful API for managing book reviews, built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Book management (CRUD operations)
- Review system with ratings
- Search functionality
- Pagination support
- Input validation

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- Express Validator for input validation
- Docker support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Docker and Docker Compose (for containerized setup)

## Setup Instructions

### Option 1: Local Setup

1. Clone the repository:
```bash
git clone https://github.com/Dhaval-pathak/Book-Review-API.git
cd book-review-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/book-review-api
JWT_SECRET=your_jwt_secret_key
```

4. Start the development server:
```bash
npm run dev
```

### Option 2: Docker Setup

1. Clone the repository:
```bash
git clone https://github.com/Dhaval-pathak/Book-Review-API.git
cd book-review-api
```

2. Build and start the containers:
```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`.

To stop the containers:
```bash
docker-compose down
```

To stop the containers and remove volumes:
```bash
docker-compose down -v
```

## API Documentation

### Authentication

#### Register a new user
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Books

#### Get all books (with pagination and filters)
```http
GET /api/books?page=1&limit=10&author=John&genre=Fiction
```

#### Get book by ID
```http
GET /api/books/:id
```

#### Add a new book (Authenticated)
```http
POST /api/books
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "description": "A story of the fabulously wealthy Jay Gatsby..."
}
```

### Reviews

#### Add a review (Authenticated)
```http
POST /api/books/:bookId/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "comment": "Great book!"
}
```

#### Update a review (Authenticated)
```http
PUT /api/reviews/:reviewId
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Updated review"
}
```

#### Delete a review (Authenticated)
```http
DELETE /api/reviews/:reviewId
Authorization: Bearer <token>
```

### Search

#### Search books
```http
GET /api/search?q=gatsby
```

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Book
```javascript
{
  title: String,
  author: String,
  genre: String,
  description: String,
  averageRating: Number,
  createdAt: Date
}
```

### Review
```javascript
{
  book: ObjectId (ref: 'Book'),
  user: ObjectId (ref: 'User'),
  rating: Number,
  comment: String,
  createdAt: Date
}
```

## Design Decisions

1. **Authentication**: JWT is used for stateless authentication, making the API scalable and easy to maintain.
2. **Pagination**: Implemented for better performance when dealing with large datasets.
3. **Input Validation**: Express Validator is used to ensure data integrity.
4. **Error Handling**: Centralized error handling middleware for consistent error responses.
5. **MongoDB**: Chosen for its flexibility with document-based storage and easy scaling.

## Testing

Run tests using:
```bash
npm test
```
