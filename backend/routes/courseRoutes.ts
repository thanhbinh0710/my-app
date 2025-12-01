import { Router, Request, Response } from 'express';
import { CourseController } from '../controllers/CourseController';
import { ensureDbConnection } from '../middleware/database';

const router = Router();
const courseController = new CourseController();

// Apply middleware to all routes
router.use(ensureDbConnection);

// GET /api/courses - Get all courses with pagination
// Query params: limit, offset
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const result = await courseController.getCourses(limit, offset);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/courses/search - Search courses by name
// Query params: q (search term)
router.get('/search', async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q as string;
    
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a search term'
      });
    }
    
    const result = await courseController.searchCourses(searchTerm);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/courses/teacher/:teacher_id - Get courses by teacher
router.get('/teacher/:teacher_id', async (req: Request, res: Response) => {
  try {
    const teacher_id = parseInt(req.params.teacher_id);
    
    if (isNaN(teacher_id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid teacher ID'
      });
    }
    
    const result = await courseController.getCoursesByTeacher(teacher_id);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/courses/status/:status - Get courses by status
router.get('/status/:status', async (req: Request, res: Response) => {
  try {
    const status = req.params.status as 'active' | 'inactive' | 'archived';
    
    if (!['active', 'inactive', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }
    
    const result = await courseController.getCoursesByStatus(status);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/courses/:course_id/students - Get students enrolled in a course
router.get('/:course_id/students', async (req: Request, res: Response) => {
  try {
    const course_id = req.params.course_id;
    
    const result = await courseController.getStudentsByCourse(course_id);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/courses/:course_id/with-teacher - Get course with teacher info
router.get('/:course_id/with-teacher', async (req: Request, res: Response) => {
  try {
    const course_id = req.params.course_id;
    
    const result = await courseController.getCourseWithTeacher(course_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/courses/:course_id - Get course by ID
router.get('/:course_id', async (req: Request, res: Response) => {
  try {
    const course_id = req.params.course_id;
    
    const result = await courseController.getCourseById(course_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// POST /api/courses - Create new course
// Body: { course_id, course_name, course_group?, course_credit, teacher_id }
router.post('/', async (req: Request, res: Response) => {
  try {
    const { course_id, course_name, course_group, course_credit, teacher_id } = req.body;
    
    // Validate required fields
    if (!course_id || !course_name || !course_credit || !teacher_id) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: course_id, course_name, course_credit, teacher_id'
      });
    }
    
    const result = await courseController.createCourse(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// PUT /api/courses/:course_id - Update course
// Body: { course_name, course_credit, teacher_id }
router.put('/:course_id', async (req: Request, res: Response) => {
  try {
    const course_id = req.params.course_id;
    const { course_name, course_credit, teacher_id } = req.body;
    
    // Validate required fields
    if (!course_name || !course_credit || !teacher_id) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: course_name, course_credit, teacher_id'
      });
    }
    
    const result = await courseController.updateCourse(course_id, req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// DELETE /api/courses/:course_id - Delete course
router.delete('/:course_id', async (req: Request, res: Response) => {
  try {
    const course_id = req.params.course_id;
    
    const result = await courseController.deleteCourse(course_id);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/courses/statistics/faculty - Get statistics by faculty
router.get('/statistics/faculty', async (req: Request, res: Response) => {
  try {
    const result = await courseController.getStatisticsByFaculty();
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/courses/student/:student_id/gpa - Get student GPA
router.get('/student/:student_id/gpa', async (req: Request, res: Response) => {
  try {
    const student_id = parseInt(req.params.student_id);
    
    if (isNaN(student_id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID'
      });
    }
    
    const result = await courseController.getStudentGPA(student_id);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

export default router;
