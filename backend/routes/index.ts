import express from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import studentRoutes from './studentRoutes';
import courseRoutes from './courseRoutes';
import teacherRoutes from './teacherRoutes';
import enrollmentRoutes from './enrollmentRoutes';
import facultyRoutes from './facultyRoutes';
import roadmapRoutes from './roadmapRoutes';

const router = express.Router();

// API Routes
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/courses', courseRoutes);
router.use('/teachers', teacherRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/faculties', facultyRoutes);
router.use('/roadmaps', roadmapRoutes);

// API Info route
router.get('/', (req, res) => {
  const vietnamTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  res.json({
    success: true,
    message: 'Learning Management System API',
    version: '1.0.0',
    vietnamTime: vietnamTime,
    timezone: 'Asia/Ho_Chi_Minh (UTC+7)',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users', 
      students: '/api/students',
      courses: '/api/courses',
      teachers: '/api/teachers',
      enrollments: '/api/enrollments',
      faculties: '/api/faculties',
      roadmaps: '/api/roadmaps'
    }
  });
});

export default router;