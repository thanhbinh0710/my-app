# Database Setup Guide

## Prerequisites
- MySQL Server 8.0 or higher
- Node.js 18 or higher
- Environment variables configured in `.env`

## Environment Configuration

Create a `.env` file in the root directory:

```bash
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=learning_management_system
DB_PORT=3306

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here
```

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run migrations (creates database and tables):**
   ```bash
   npm run migrate
   ```

3. **Run seeders (inserts sample data):**
   ```bash
   npm run seed
   ```

4. **Or setup everything at once:**
   ```bash
   npm run db:setup
   ```

## Available Commands

- `npm run migrate` - Run all pending database migrations
- `npm run migrate:status` - Check migration status
- `npm run seed` - Run all seeders (safe to run multiple times)
- `npm run seed:status` - Check seeder status
- `npm run db:setup` - Run migrations then seeders

## Sample Data Overview

The seeders create realistic sample data based on Ho Chi Minh University of Technology (HCMUT):

### Faculties (10 faculties)
- Computer Science & Engineering
- Electronics & Telecommunications  
- Mechanical Engineering
- Civil Engineering
- Chemical Engineering
- Applied Science
- Geology & Petroleum Engineering
- Environment & Resources
- Economics
- Transportation Engineering

### Academic Programs (10 programs)
- Computer Science (CS)
- Software Engineering (SE)
- Information Systems (IS)
- Network & Data Communication (NE)
- Data Science (DS)
- Artificial Intelligence (AI)
- Information Security (InfoSec)
- Electronics Engineering
- Telecommunications Engineering
- Biomedical Engineering

### Users & Roles
- **Admin accounts:** 2 (system admin, faculty dean)
- **Teacher accounts:** 8 (with realistic Vietnamese names and academic titles)
- **Student accounts:** 15 (K22 and K23 cohorts)

### Courses (20 courses)
Based on HCMUT Computer Science curriculum:
- Foundation courses (CO1013, CO1014, MI1013)
- Intermediate courses (CO2013, CO2014, CO3013-CO3017)
- Advanced courses (CO4013-CO4021, CO4999)

### Default Credentials
All accounts use password: `password123`

#### Example logins:
- Admin: `admin` / `password123`
- Teacher: `nvan.an` / `password123`
- Student: `2213001` / `password123`

## Migration Safety

- Migrations use `CREATE TABLE IF NOT EXISTS` - safe to run multiple times
- Seeders use `INSERT IGNORE` - safe to run multiple times
- No data will be lost when re-running commands

## Troubleshooting

1. **Connection issues:** Check MySQL service is running and credentials in `.env.local`
2. **Permission errors:** Ensure MySQL user has CREATE DATABASE privileges
3. **Migration fails:** Check MySQL version (8.0+ recommended)

## Database Schema

The schema follows the original design specification with these main entities:
- Users (admin, teacher, student roles)
- Faculties and Academic Roadmaps
- Courses, Sections, and Enrollments
- Learning Content (Lectures, Discussions, Quizzes)
- Relationship tables (Contain, Teach, Do)