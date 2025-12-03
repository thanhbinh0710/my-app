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

### Get All Courses (Paginated with Optional Filters)
**GET** `/api/courses`

**Query Parameters:**
- `limit` - Number of items per page (default: 50)
- `offset` - Number of items to skip (default: 0)
- `course_group` - Filter by course group (uses stored procedure)
- `min_credit` - Filter by minimum credits (uses stored procedure)
- `teacher_name` - Filter by teacher name (uses stored procedure)
- `sort_by` - Sort results: `course_id`, `course_name`, `course_credit`, `total_students` (uses stored procedure)

**Behavior:**
- Without filters: Returns regular paginated list
- With any filter parameter: Automatically uses `sp_GetCoursesWithFilters` stored procedure

**Examples:**
```bash
# Regular pagination
GET /api/courses?limit=20&offset=0

# Filter by minimum credits, sorted by name
GET /api/courses?min_credit=3&sort_by=course_name

# Filter by teacher name
GET /api/courses?teacher_name=Nguyễn

# Filter by course group
GET /api/courses?course_group=Hệ thống

# Combined filters
GET /api/courses?min_credit=4&teacher_name=Lê&sort_by=course_credit
```

**Response (with filters):**
```json
{
  "success": true,
  "data": [
    {
      "course_id": "CO3013",
      "course_name": "Hệ Cơ sở dữ liệu",
      "course_group": "Hệ thống",
      "course_credit": 4,
      "teacher_name": "PGS.TS. Lê Văn Bình",
      "faculty_name": "Khoa Khoa học và Kỹ thuật Máy tính",
      "total_students": 8,
      "course_status": "active"
    }
  ]
}
```

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

### Get Course Details with Students (Stored Procedure)
**GET** `/api/courses/:course_id/details`

Uses `sp_GetCourseDetailsWithStudents` stored procedure to get comprehensive course information including enrolled students.

**Example:**
```bash
GET /api/courses/CO1014/details
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courseDetails": {
      "course_id": "CO1014",
      "course_name": "Kỹ thuật Lập trình",
      "course_credit": 4,
      "course_status": "active",
      "teacher_name": "TS. Phạm Văn Đức",
      "total_enrolled": 6,
      "avg_grade": 7.63,
      "total_sections": 5
    },
    "students": [
      {
        "student_id": 14,
        "full_name": "Đỗ Thị Oanh",
        "email": "oanh.do@student.edu.vn",
        "grade": 8.20,
        "progress": "completed",
        "start_date": "2024-09-01"
      }
    ]
  }
}
```

### Get Students Enrolled in Course (Stored Procedure)
**GET** `/api/courses/:course_id/students`

### Get Teacher Statistics (Stored Procedure)
**GET** `/api/courses/statistics/teachers`

Uses `sp_GetCourseStatisticsByTeacher` stored procedure with advanced SQL features (JOIN 4 tables, COUNT/SUM/AVG/MAX aggregates, GROUP BY, HAVING, ORDER BY).

**Query Parameters:**
- `faculty_id` - Filter by faculty ID
- `min_students` - Filter teachers with at least this many students
- `min_courses` - Filter teachers with at least this many courses

**Examples:**
```bash
# Get all teacher statistics
GET /api/courses/statistics/teachers

# Get statistics for specific faculty
GET /api/courses/statistics/teachers?faculty_id=1

# Get teachers with at least 5 students
GET /api/courses/statistics/teachers?min_students=5

# Get teachers with at least 2 courses and 10 students
GET /api/courses/statistics/teachers?min_courses=2&min_students=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "teacher_id": 1,
      "teacher_name": "PGS.TS. Nguyễn Văn An",
      "faculty_name": "Khoa Khoa học và Kỹ thuật Máy tính",
      "total_courses": 4,
      "total_credits": 50,
      "total_students": 8,
      "avg_grade": 7.57,
      "max_grade": 9.20
    }
  ]
}
```

### Get Faculty Statistics (Stored Procedure)
**GET** `/api/courses/statistics/faculty`

### Get Student Course Information (Database Functions)
**GET** `/api/courses/student/:student_id`

Combines multiple database functions to get comprehensive student information:
- `fn_GetStudentGPA` - Calculate GPA
- `fn_CalculateRoadmapProgress` - Calculate overall progress
- `fn_CalculateCompletedCredits` - Calculate completed credits (optional)

**Query Parameters:**
- `roadmap_id` - Optional. Include to calculate completed credits for specific roadmap

**Examples:**
```bash
# Get student GPA and progress
GET /api/courses/student/14

# Get student GPA, progress, and completed credits for roadmap
GET /api/courses/student/14?roadmap_id=1
```

**Response (without roadmap_id):**
```json
{
  "success": true,
  "data": {
    "student_id": 14,
    "gpa": 7.85,
    "roadmap_progress": 35.50
  }
}
```

**Response (with roadmap_id):**
```json
{
  "success": true,
  "data": {
    "student_id": 14,
    "gpa": 7.85,
    "roadmap_progress": 35.50,
    "completed_credits": 45,
    "roadmap_id": 1
  }
}
```

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

#### 1. Course Management (Requirement 2.1)
- **`sp_InsertCourse`** - Create course with validation
  - Parameters: `course_id`, `course_name`, `course_group`, `course_credit`, `teacher_id`
  - Used by: `POST /api/courses`
  
- **`sp_UpdateCourse`** - Update course information
  - Parameters: `course_id`, `course_name`, `course_credit`, `teacher_id`
  - Used by: `PUT /api/courses/:course_id`
  
- **`sp_DeleteCourse`** - Delete course (checks enrollments)
  - Parameters: `course_id`
  - Used by: `DELETE /api/courses/:course_id`

#### 2. SELECT Procedures with Advanced SQL (Requirement 2.3)

- **`sp_GetCoursesWithFilters`** - Filter and sort courses
  - **SQL Features:** JOIN 5 tables, WHERE conditions, GROUP BY, dynamic ORDER BY with CASE
  - **Parameters:** 
    - `p_course_group` (VARCHAR) - Filter by course group
    - `p_min_credit` (INT) - Minimum credits required
    - `p_teacher_name` (VARCHAR) - Filter by teacher name (LIKE search)
    - `p_sort_by` (VARCHAR) - Sort column: 'course_id', 'course_name', 'course_credit', 'total_students'
  - **Returns:** Course list with teacher info, faculty, and student count
  - **Used by:** `GET /api/courses` (with filter parameters)
  - **Example Call:**
    ```sql
    CALL sp_GetCoursesWithFilters('Hệ thống', 3, 'Nguyễn', 'course_name');
    ```

- **`sp_GetCourseStatisticsByTeacher`** - Teacher performance statistics
  - **SQL Features:** JOIN 4 tables, COUNT/SUM/AVG/MAX aggregates, GROUP BY teacher, HAVING filters, ORDER BY
  - **Parameters:**
    - `p_faculty_id` (INT) - Filter by faculty
    - `p_min_students` (INT) - Minimum students taught
    - `p_min_courses` (INT) - Minimum courses taught
  - **Returns:** Teacher statistics with course counts, credits, students, and grades
  - **Used by:** `GET /api/courses/statistics/teachers`
  - **Example Call:**
    ```sql
    CALL sp_GetCourseStatisticsByTeacher(1, 5, 2);
    ```

- **`sp_GetCourseDetailsWithStudents`** - Detailed course information
  - **SQL Features:** Multiple result sets, JOIN queries, COUNT/AVG aggregates
  - **Parameters:** `p_course_id` (VARCHAR)
  - **Returns:** 
    - Result Set 1: Course details with counts
    - Result Set 2: List of enrolled students
  - **Used by:** `GET /api/courses/:course_id/details`
  - **Example Call:**
    ```sql
    CALL sp_GetCourseDetailsWithStudents('CO1014');
    ```

#### 3. Other Procedures
- **`sp_GetStudentsByCourse`** - Get all students in a course (JOIN query)
- **`sp_Statistic_Students_By_Faculty`** - Faculty statistics (GROUP BY, HAVING)

### Database Functions (Requirement 2.4)

#### 1. **`fn_GetStudentGPA`** - Calculate student GPA
- **SQL Features:** CURSOR, LOOP, IF statements
- **Parameter:** `p_StudentID` (INT)
- **Returns:** DECIMAL(3,2) - GPA value
- **Used by:** `GET /api/courses/student/:student_id`
- **Example:**
  ```sql
  SELECT fn_GetStudentGPA(14) as gpa;
  ```

#### 2. **`fn_CalculateCompletedCredits`** - Calculate completed credits in roadmap
- **SQL Features:** CURSOR to iterate courses, IF statements for grade validation, LOOP, input validation with SIGNAL
- **Parameters:** 
  - `p_student_id` (INT)
  - `p_roadmap_id` (INT)
- **Returns:** INT - Total completed credits
- **Logic:** Iterates through roadmap courses, counts credits for courses with grade >= 5.0
- **Used by:** `GET /api/courses/student/:student_id?roadmap_id=X`
- **Example:**
  ```sql
  SELECT fn_CalculateCompletedCredits(14, 1) as completed_credits;
  ```

#### 3. **`fn_CalculateRoadmapProgress`** - Calculate roadmap completion percentage
- **SQL Features:** CURSOR for grade data, LOOP to count completed courses, percentage calculation
- **Parameter:** `p_student_id` (INT)
- **Returns:** DECIMAL(5,2) - Progress percentage (0.00 to 100.00)
- **Logic:** Calculates (completed_courses / total_courses) * 100
- **Used by:** `GET /api/courses/student/:student_id`
- **Example:**
  ```sql
  SELECT fn_CalculateRoadmapProgress(14) as progress;
  ```

### Triggers
- Auto-update student credits on course completion
- Validate max 30 credits per semester
- Update course registration counts
- Update faculty teacher counts

---

## Testing the API

### Using cURL

#### Get Courses with Filters
```bash
# Get all courses with at least 3 credits, sorted by name
curl "http://localhost:3001/api/courses?min_credit=3&sort_by=course_name"

# Filter by teacher name
curl "http://localhost:3001/api/courses?teacher_name=Nguyễn"

# Filter by course group
curl "http://localhost:3001/api/courses?course_group=Hệ thống"

# Combined filters
curl "http://localhost:3001/api/courses?min_credit=4&teacher_name=Lê&sort_by=course_credit"
```

#### Get Teacher Statistics
```bash
# Get all teacher statistics
curl "http://localhost:3001/api/courses/statistics/teachers"

# Filter by faculty
curl "http://localhost:3001/api/courses/statistics/teachers?faculty_id=1"

# Filter by minimum students and courses
curl "http://localhost:3001/api/courses/statistics/teachers?min_students=5&min_courses=2"
```

#### Get Course Details with Students
```bash
# Get detailed course information including enrolled students
curl "http://localhost:3001/api/courses/CO1014/details"
```

#### Get Student Information
```bash
# Get student GPA and roadmap progress
curl "http://localhost:3001/api/courses/student/14"

# Get student info with completed credits for specific roadmap
curl "http://localhost:3001/api/courses/student/14?roadmap_id=1"
```

#### Course CRUD Operations
```bash
# Get all courses with pagination
curl "http://localhost:3001/api/courses?limit=10&offset=0"

# Create new course (uses stored procedure)
curl -X POST "http://localhost:3001/api/courses" \
  -H "Content-Type: application/json" \
  -d '{
    "course_id": "CO9999",
    "course_name": "New Course",
    "course_group": "Test",
    "course_credit": 3,
    "teacher_id": 1
  }'

# Update course (uses stored procedure)
curl -X PUT "http://localhost:3001/api/courses/CO9999" \
  -H "Content-Type: application/json" \
  -d '{
    "course_name": "Updated Course",
    "course_credit": 4,
    "teacher_id": 1
  }'

# Delete course (uses stored procedure)
curl -X DELETE "http://localhost:3001/api/courses/CO9999"
```

#### Enrollment Operations
```bash
# Create new enrollment
curl -X POST "http://localhost:3001/api/enrollments" \
  -H "Content-Type: application/json" \
  -d '{"course_id": 1, "student_id": 5, "start_date": "2025-01-15"}'
```

### Using PowerShell (Windows)

```powershell
# Get courses with filters
Invoke-RestMethod -Uri "http://localhost:3001/api/courses?min_credit=3&sort_by=course_name" -Method GET | ConvertTo-Json -Depth 3

# Get teacher statistics
Invoke-RestMethod -Uri "http://localhost:3001/api/courses/statistics/teachers?faculty_id=1" -Method GET | ConvertTo-Json -Depth 3

# Get course details
Invoke-RestMethod -Uri "http://localhost:3001/api/courses/CO1014/details" -Method GET | ConvertTo-Json -Depth 3

# Get student information
Invoke-RestMethod -Uri "http://localhost:3001/api/courses/student/14?roadmap_id=1" -Method GET | ConvertTo-Json -Depth 3

# Create course
$body = @{
    course_id = "CO9999"
    course_name = "New Course"
    course_credit = 3
    teacher_id = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/courses" -Method POST -Body $body -ContentType "application/json"
```

### Using JavaScript/Axios

```javascript
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

// Get courses with filters
const courses = await axios.get(`${BASE_URL}/courses`, {
  params: {
    min_credit: 3,
    sort_by: 'course_name',
    teacher_name: 'Nguyễn'
  }
});

// Get teacher statistics
const stats = await axios.get(`${BASE_URL}/courses/statistics/teachers`, {
  params: {
    faculty_id: 1,
    min_students: 5
  }
});

// Get course details
const details = await axios.get(`${BASE_URL}/courses/CO1014/details`);

// Get student information
const student = await axios.get(`${BASE_URL}/courses/student/14`, {
  params: { roadmap_id: 1 }
});

// Create course
const newCourse = await axios.post(`${BASE_URL}/courses`, {
  course_id: 'CO9999',
  course_name: 'New Course',
  course_credit: 3,
  teacher_id: 1
});
```

### Using Postman
Import the endpoints and test with the provided body examples.

---

## Key Features

✅ **Pagination on all GET lists** - Default 50 items, customizable with `limit` and `offset`

✅ **Smart filtering** - GET /api/courses automatically uses stored procedure when filters are provided

✅ **Search functionality** - Courses, faculties, and roadmaps

✅ **Advanced filtering** - By faculty, teacher, status, progress, credits, course group

✅ **Stored procedures integration** 
- Course CRUD operations use MySQL procedures (INSERT, UPDATE, DELETE)
- SELECT procedures with JOIN, GROUP BY, HAVING, dynamic ORDER BY
- sp_GetCoursesWithFilters - Filter and sort courses
- sp_GetCourseStatisticsByTeacher - Teacher statistics with aggregates
- sp_GetCourseDetailsWithStudents - Detailed course info with multiple result sets

✅ **Database functions integration**
- fn_GetStudentGPA - GPA calculation with CURSOR and LOOP
- fn_CalculateCompletedCredits - Credits calculation with CURSOR, IF, LOOP
- fn_CalculateRoadmapProgress - Progress percentage calculation

✅ **Comprehensive CRUD** - Full Create, Read, Update, Delete for all entities

✅ **Relationship queries** - Get related data (courses with teachers, roadmaps with courses, etc.)

✅ **Vietnamese + English messages** - API messages support both languages

---

## Academic Requirements Mapping

### Requirement 2.1: INSERT, UPDATE, DELETE Procedures
✅ Implemented in `010_create_procedures.sql`
- `sp_InsertCourse` - Used by POST /api/courses
- `sp_UpdateCourse` - Used by PUT /api/courses/:course_id  
- `sp_DeleteCourse` - Used by DELETE /api/courses/:course_id

### Requirement 2.3: SELECT Procedures (2+ with WHERE/HAVING)
✅ Implemented in `010_create_procedures.sql`

1. **sp_GetCoursesWithFilters**
   - JOIN 5 tables (course, teacher, user, faculty, enroll)
   - WHERE with multiple conditions (course_group, teacher_name, min_credit)
   - GROUP BY for student count
   - Dynamic ORDER BY using CASE statements
   - Used by: GET /api/courses (with filters)

2. **sp_GetCourseStatisticsByTeacher**  
   - JOIN 4 tables (teacher, user, faculty, course, enroll)
   - Aggregate functions: COUNT, SUM, AVG, MAX
   - GROUP BY teacher_id
   - HAVING for filtering results (min_students, min_courses)
   - ORDER BY total_students DESC
   - Used by: GET /api/courses/statistics/teachers

3. **sp_GetCourseDetailsWithStudents**
   - Multiple result sets
   - Related to course table (requirement 2.1)
   - Used by: GET /api/courses/:course_id/details

### Requirement 2.4: Functions (2+ with IF/LOOP/Cursor)
✅ Implemented in `011_create_functions.sql`

1. **fn_CalculateCompletedCredits**
   - CURSOR to iterate through roadmap courses
   - LOOP to process each course
   - IF statements for passing grade validation (>= 5.0)
   - Input validation with SIGNAL
   - Used by: GET /api/courses/student/:student_id?roadmap_id=X

2. **fn_CalculateRoadmapProgress**
   - CURSOR for grade data  
   - LOOP to count completed courses
   - Percentage calculation logic
   - Returns 0.00 if no data
   - Used by: GET /api/courses/student/:student_id

### Requirement 3.1: CRUD UI for Table in 2.1
✅ Frontend UI exists for Course management (related to 2.1)

### Requirement 3.2: UI with SELECT Procedure (Search/Filter/Sort)
📋 **To Implement:** Frontend UI to call GET /api/courses with filters
- Display results from sp_GetCoursesWithFilters
- UI controls for: course_group dropdown, min_credit input, teacher_name search, sort_by selector
- Show course list with update/delete buttons

### Requirement 3.3: UI for Other Procedure/Function  
📋 **To Implement:** Frontend UI options:
- Display teacher statistics (sp_GetCourseStatisticsByTeacher)
- Show student progress (fn_CalculateRoadmapProgress)
- Display course details (sp_GetCourseDetailsWithStudents)
