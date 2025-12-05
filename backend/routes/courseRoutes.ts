import { Router, Request, Response } from 'express';
import { CourseController } from '../controllers/CourseController';
import { ensureDbConnection } from '../middleware/database';

const router = Router();
const courseController = new CourseController();

// Apply middleware to all routes
router.use(ensureDbConnection);

// GET /api/courses - Get all courses with pagination and optional filters
// Query params: limit, offset, course_group, min_credit, teacher_name, sort_by
router.get('/', async (req: Request, res: Response) => {
  try {
    // Check if any filter parameters are provided
    const hasFilters = req.query.course_group || req.query.min_credit || req.query.teacher_name || req.query.sort_by;
    
    if (hasFilters) {
      // Use stored procedure with filters
      const course_group = req.query.course_group as string | undefined;
      const min_credit = req.query.min_credit ? parseInt(req.query.min_credit as string) : null;
      const teacher_name = req.query.teacher_name as string | undefined;
      const sort_by = req.query.sort_by as string | undefined;
      
      const result = await courseController.getCoursesWithFilters(
        course_group || null,
        min_credit,
        teacher_name || null,
        sort_by || null
      );
      return res.status(result.success ? 200 : 400).json(result);
    } else {
      // Use regular pagination
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const result = await courseController.getCourses(limit, offset);
      return res.status(result.success ? 200 : 400).json(result);
    }
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

// GET /api/courses/:course_id/details - Get course details with students (using sp_GetCourseDetailsWithStudents)
router.get('/:course_id/details', async (req: Request, res: Response) => {
  try {
    const course_id = req.params.course_id;
    
    const result = await courseController.getCourseDetailsWithStudents(course_id);
    return res.status(result.success ? 200 : 404).json(result);
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
// Body: { course_id, course_name, course_group?, course_credit, teacher_id, course_status? }
router.post('/', async (req: Request, res: Response) => {
  try {
    const { course_id, course_name, course_group, course_credit, teacher_id, course_status } = req.body;
    
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
// Body: { course_name, course_credit, teacher_id, course_status? }
router.put('/:course_id', async (req: Request, res: Response) => {
  try {
    const course_id = req.params.course_id;
    const { course_name, course_credit, teacher_id, course_status } = req.body;
    
    console.log('PUT /api/courses/:course_id - Request body:', req.body);
    console.log('course_status received:', course_status);
    
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

// GET /api/courses/statistics/teachers - Get statistics by teacher (using sp_GetCourseStatisticsByTeacher)
// Query params: faculty_id, min_students, min_courses
router.get('/statistics/teachers', async (req: Request, res: Response) => {
  try {
    const faculty_id = req.query.faculty_id ? parseInt(req.query.faculty_id as string) : null;
    const min_students = req.query.min_students ? parseInt(req.query.min_students as string) : null;
    const min_courses = req.query.min_courses ? parseInt(req.query.min_courses as string) : null;
    
    const result = await courseController.getCourseStatisticsByTeacher(
      faculty_id,
      min_students,
      min_courses
    );
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

// GET /api/courses/student/:student_id - Get student course info (GPA, progress, completed credits)
// Query params: roadmap_id (optional, for completed credits calculation)
router.get('/student/:student_id', async (req: Request, res: Response) => {
  try {
    const student_id = parseInt(req.params.student_id);
    const roadmap_id = req.query.roadmap_id ? parseInt(req.query.roadmap_id as string) : null;
    
    if (isNaN(student_id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID'
      });
    }
    
    // Get GPA
    const gpaResult = await courseController.getStudentGPA(student_id);
    
    // Get roadmap progress
    const progressResult = await courseController.calculateRoadmapProgress(student_id);
    
    // Get completed credits if roadmap_id is provided
    let completedCredits = null;
    if (roadmap_id && !isNaN(roadmap_id)) {
      const creditsResult = await courseController.calculateCompletedCredits(student_id, roadmap_id);
      completedCredits = creditsResult.data?.completed_credits || 0;
    }
    
    return res.status(200).json({
      success: true,
      data: {
        student_id,
        gpa: gpaResult.data?.gpa || 0,
        roadmap_progress: progressResult.data?.progress || 0,
        ...(completedCredits !== null && { completed_credits: completedCredits, roadmap_id })
      }
    });
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

export default router;
