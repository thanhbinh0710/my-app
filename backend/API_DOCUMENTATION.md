# Learning Management System API Documentation

## Base URL
```
http://localhost:3001/api
```

## Pagination
All GET list endpoints support pagination with query parameters:
- `limit`: Number of items per page (default: 50, max: 100)
- `offset`: Number of items to skip (default: 0)

Example: `GET /api/courses?limit=20&offset=40`

Response includes pagination info:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "limit": 20,
    "offset": 40,
    "total": 150,
    "totalPages": 8
  }
}
```

---

## Authentication Endpoints

### Register
**POST** `/api/auth/register`

Body:
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirm_password": "password123"
}
```

### Login
**POST** `/api/auth/login`

Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": { ... }
  }
}
```

### Verify Token
**POST** `/api/auth/verify`

Headers:
```
Authorization: Bearer <token>
```

---

## User Endpoints

### Get All Users (Paginated)
**GET** `/api/users?limit=50&offset=0`

### Get User by ID
**GET** `/api/users/:user_id`

### Create User
**POST** `/api/users`

### Update User
**PUT** `/api/users/:user_id`

### Delete User
**DELETE** `/api/users/:user_id`

---

## Course Endpoints

### Get All Courses (Paginated)
**GET** `/api/courses?limit=50&offset=0`

### Search Courses
**GET** `/api/courses/search?q=mathematics`

### Get Courses by Teacher
**GET** `/api/courses/teacher/:teacher_id`

### Get Courses by Status
**GET** `/api/courses/status/:status`
- Status options: `active`, `inactive`, `archived`

### Get Course by ID
**GET** `/api/courses/:course_id`

### Get Course with Teacher Info
**GET** `/api/courses/:course_id/with-teacher`

### Get Students Enrolled in Course (Stored Procedure)
**GET** `/api/courses/:course_id/students`

### Get Faculty Statistics (Stored Procedure)
**GET** `/api/courses/statistics/faculty`

### Get Student GPA (Database Function)
**GET** `/api/courses/student/:student_id/gpa`

### Create Course
**POST** `/api/courses`

Body:
```json
{
  "course_id": "CS101",
  "course_name": "Introduction to Programming",
  "course_group": "Computer Science",
  "course_credit": 3,
  "teacher_id": 1,
  "course_passing_grade": 50,
  "course_status": "active"
}
```

### Update Course
**PUT** `/api/courses/:course_id`

### Delete Course
**DELETE** `/api/courses/:course_id`

---

## Student Endpoints

### Get All Students (Paginated)
**GET** `/api/students?limit=50&offset=0`

### Get Students by Faculty
**GET** `/api/students?faculty_id=1`

### Get Students by Year
**GET** `/api/students?year=2024`

### Get Student by User ID
**GET** `/api/students/:user_id`

### Get Student by Student ID
**GET** `/api/students/student-id/:student_id`

### Update Student
**PUT** `/api/students/:user_id`

### Update Student Progress
**PUT** `/api/students/:user_id/progress`

---

## Teacher Endpoints

### Get All Teachers (Paginated)
**GET** `/api/teachers?limit=50&offset=0`

### Get Teachers by Faculty
**GET** `/api/teachers/faculty/:faculty_id?limit=50&offset=0`

### Get Teacher by User ID
**GET** `/api/teachers/:user_id`

### Get Teacher by Teacher ID
**GET** `/api/teachers/teacher-id/:teacher_id`

### Get Teacher with Full Info
**GET** `/api/teachers/:user_id/with-info`

Returns teacher data with user details and faculty information.

### Create Teacher
**POST** `/api/teachers`

Body:
```json
{
  "user_id": 5,
  "teacher_id": "TCH001",
  "certificate": "PhD in Computer Science",
  "faculty_id": 1
}
```

### Update Teacher
**PUT** `/api/teachers/:user_id`

### Delete Teacher
**DELETE** `/api/teachers/:user_id`

---

## Enrollment Endpoints

### Get All Enrollments (Paginated)
**GET** `/api/enrollments?limit=50&offset=0`

### Get Enrollments by Course
**GET** `/api/enrollments/course/:course_id?limit=50&offset=0`

### Get Enrollments by Student
**GET** `/api/enrollments/student/:student_id?limit=50&offset=0`

### Get Enrollments by Progress Status
**GET** `/api/enrollments/progress/:progress?limit=50&offset=0`

Progress options: `enrolled`, `in_progress`, `completed`, `dropped`, `failed`

### Get Specific Enrollment
**GET** `/api/enrollments/:course_id/:student_id`

### Create Enrollment (Enroll Student in Course)
**POST** `/api/enrollments`

Body:
```json
{
  "course_id": 1,
  "student_id": 10,
  "start_date": "2025-01-15",
  "progress": "enrolled"
}
```

### Update Enrollment (Update Grade/Progress)
**PUT** `/api/enrollments/:course_id/:student_id`

Body:
```json
{
  "grade": 85.5,
  "progress": "completed",
  "complete_date": "2025-05-30"
}
```

### Delete Enrollment (Drop Course)
**DELETE** `/api/enrollments/:course_id/:student_id`

---

## Faculty Endpoints

### Get All Faculties (Paginated)
**GET** `/api/faculties?limit=50&offset=0`

### Search Faculties by Name
**GET** `/api/faculties/search?q=engineering`

### Get Faculty by ID
**GET** `/api/faculties/:faculty_id`

### Get Faculty with Statistics
**GET** `/api/faculties/:faculty_id/statistics`

Returns faculty data with counts of teachers, students, and courses.

### Create Faculty
**POST** `/api/faculties`

Body:
```json
{
  "faculty_name": "Faculty of Engineering",
  "office_location": "Building A, Room 101",
  "phone_number": "+1234567890",
  "email": "engineering@university.edu"
}
```

### Update Faculty
**PUT** `/api/faculties/:faculty_id`

### Delete Faculty
**DELETE** `/api/faculties/:faculty_id`

---

## Roadmap Endpoints

### Get All Roadmaps (Paginated)
**GET** `/api/roadmaps?limit=50&offset=0`

### Search Roadmaps by Name
**GET** `/api/roadmaps/search?q=data`

### Get Roadmap by ID
**GET** `/api/roadmaps/:roadmap_id`

### Get Roadmap with All Courses
**GET** `/api/roadmaps/:roadmap_id/with-courses`

Returns roadmap with all courses in order.

### Create Roadmap
**POST** `/api/roadmaps`

Body:
```json
{
  "roadmap_name": "Data Science Program",
  "description": "Complete curriculum for Data Science major",
  "total_course": 40,
  "total_credit": 120
}
```

### Update Roadmap
**PUT** `/api/roadmaps/:roadmap_id`

### Delete Roadmap
**DELETE** `/api/roadmaps/:roadmap_id`

---

## Response Format

All endpoints return responses in this format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```

### List Response (with pagination)
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "total": 150,
    "totalPages": 3
  }
}
```

---

## Database Features

### Stored Procedures
- `sp_InsertCourse` - Create course with validation
- `sp_UpdateCourse` - Update course information
- `sp_DeleteCourse` - Delete course (checks enrollments)
- `sp_GetStudentsByCourse` - Get all students in a course (JOIN query)
- `sp_Statistic_Students_By_Faculty` - Faculty statistics (GROUP BY, HAVING)

### Database Function
- `fn_GetStudentGPA` - Calculate student GPA using cursor

### Triggers
- Auto-update student credits on course completion
- Validate max 30 credits per semester
- Update course registration counts
- Update faculty teacher counts

---

## Testing the API

### Using cURL
```bash
# Get all courses with pagination
curl "http://localhost:3001/api/courses?limit=10&offset=0"

# Create new enrollment
curl -X POST "http://localhost:3001/api/enrollments" \
  -H "Content-Type: application/json" \
  -d '{"course_id": 1, "student_id": 5}'

# Get student GPA
curl "http://localhost:3001/api/courses/student/5/gpa"
```

### Using Postman
Import the endpoints and test with the provided body examples.

---

## Key Features

✅ **Pagination on all GET lists** - Default 50 items, customizable with `limit` and `offset`
✅ **Search functionality** - Courses, faculties, and roadmaps
✅ **Filtering** - By faculty, teacher, status, progress
✅ **Stored procedures integration** - Course operations use MySQL procedures
✅ **Database function integration** - GPA calculation uses MySQL function with cursor
✅ **Comprehensive CRUD** - Full Create, Read, Update, Delete for all entities
✅ **Relationship queries** - Get related data (courses with teachers, roadmaps with courses, etc.)
✅ **English error messages** - All responses in English
