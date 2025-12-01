import { Router, Request, Response } from 'express';
import { EnrollmentController } from '../controllers/EnrollmentController';
import { createConnection } from '../utils/database';

const router = Router();
const enrollmentController = new EnrollmentController();

// Middleware to ensure database connection
async function ensureDbConnection(req: Request, res: Response, next: Function) {
  try {
    await createConnection();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ success: false, error: 'Database connection failed' });
  }
}

router.use(ensureDbConnection);

// GET /api/enrollments?limit=50&offset=0 - Get all enrollments with pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const result = await enrollmentController.getEnrollments(limit, offset);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/enrollments/course/:course_id - Get enrollments by course
router.get('/course/:course_id', async (req: Request, res: Response) => {
  try {
    const course_id = req.params.course_id;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const result = await enrollmentController.getEnrollmentsByCourse(course_id, limit, offset);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/enrollments/student/:student_id - Get enrollments by student
router.get('/student/:student_id', async (req: Request, res: Response) => {
  try {
    const student_id = parseInt(req.params.student_id);
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    if (isNaN(student_id)) {
      return res.status(400).json({ success: false, error: 'Invalid student ID' });
    }
    
    const result = await enrollmentController.getEnrollmentsByStudent(student_id, limit, offset);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/enrollments/progress/:progress - Get enrollments by progress status
router.get('/progress/:progress', async (req: Request, res: Response) => {
  try {
    const progress = req.params.progress;
    const validProgress = ['enrolled', 'in_progress', 'completed', 'dropped', 'failed'];
    
    if (!validProgress.includes(progress)) {
      return res.status(400).json({ success: false, error: 'Invalid progress status' });
    }
    
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const result = await enrollmentController.getEnrollmentsByProgress(progress, limit, offset);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/enrollments/:course_id/:student_id - Get specific enrollment
router.get('/:course_id/:student_id', async (req: Request, res: Response) => {
  try {
    const course_id = req.params.course_id;
    const student_id = parseInt(req.params.student_id);
    
    if (isNaN(student_id)) {
      return res.status(400).json({ success: false, error: 'Invalid student ID' });
    }
    
    const result = await enrollmentController.getEnrollment(course_id, student_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /api/enrollments - Create new enrollment
router.post('/', async (req: Request, res: Response) => {
  try {
    const { course_id, student_id } = req.body;
    
    if (!course_id || !student_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: course_id, student_id' 
      });
    }
    
    const result = await enrollmentController.createEnrollment(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// PUT /api/enrollments/:course_id/:student_id - Update enrollment
router.put('/:course_id/:student_id', async (req: Request, res: Response) => {
  try {
    const course_id = req.params.course_id;
    const student_id = parseInt(req.params.student_id);
    
    if (isNaN(student_id)) {
      return res.status(400).json({ success: false, error: 'Invalid student ID' });
    }
    
    const result = await enrollmentController.updateEnrollment(course_id, student_id, req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// DELETE /api/enrollments/:course_id/:student_id - Delete enrollment
router.delete('/:course_id/:student_id', async (req: Request, res: Response) => {
  try {
    const course_id = req.params.course_id;
    const student_id = parseInt(req.params.student_id);
    
    if (isNaN(student_id)) {
      return res.status(400).json({ success: false, error: 'Invalid student ID' });
    }
    
    const result = await enrollmentController.deleteEnrollment(course_id, student_id);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
