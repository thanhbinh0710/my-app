# Authentication API Documentation

## Overview
The authentication system provides secure login and registration endpoints with JWT token-based authentication.

## Endpoints

### 1. Register (POST /api/auth/register)

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "confirm_password": "password123"
}
```

**Validation Rules:**
- `fullname`: Required, 2-100 characters, letters and spaces only
- `email`: Required, must be valid email format, must be unique
- `password`: Required, minimum 8 characters
- `confirm_password`: Required, must match password

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "role": "student",
      "username": "john.doe",
      "full_name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Email already exists"
}
```

**Possible Error Messages:**
- "All fields are required: fullname, email, password, confirm_password"
- "Invalid email format"
- "Email already exists"
- "Password must be at least 8 characters long"
- "Passwords do not match"
- "Full name must be at least 2 characters long"
- "Full name can only contain letters and spaces"

---

### 2. Login (POST /api/auth/login)

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Required, must be valid email format
- `password`: Required

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "role": "student",
      "username": "john.doe",
      "full_name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

**Possible Error Messages:**
- "Email and password are required"
- "Invalid email format"
- "Invalid email or password"

---

### 3. Verify Token (POST /api/auth/verify)

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john.doe@example.com",
    "role": "student",
    "username": "john.doe",
    "full_name": "John Doe"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

**Possible Error Messages:**
- "No token provided"
- "Invalid or expired token"
- "User not found"

---

## Response Format

All API responses follow this consistent format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Testing with cURL

### Register:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "confirm_password": "password123"
  }'
```

### Login:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Verify Token:
```bash
curl -X POST http://localhost:3001/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Environment Variables

Make sure to set these in your `.env.local` file:

```
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=education_system
DB_PORT=3306
PORT=3001
```

---

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt with 12 salt rounds
2. **JWT Tokens**: Secure token-based authentication with 24-hour expiration
3. **Email Validation**: Proper email format validation
4. **Password Strength**: Minimum 8 characters required
5. **Unique Constraints**: Email must be unique across all users
6. **No Password Exposure**: Passwords are never returned in API responses
