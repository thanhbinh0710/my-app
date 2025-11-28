import { Router, Request, Response } from 'express';
import { StudentController } from '../controllers/StudentController';
import { createConnection } from '../utils/database';

const router = Router();
const studentController = new StudentController();

// Middleware to ensure database connection
async function ensureDbConnection(req: Request, res: Response, next: Function) {
  try {
    await createConnection();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Database connection failed' 
    });
  }
}

// Apply middleware to all routes
router.use(ensureDbConnection);

// GET /api/students - Get all students with optional filtering and pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const faculty_id = req.query.faculty_id as string;
    const year = req.query.year as string;

    let result;
    
    if (faculty_id) {
      result = await studentController.getStudentsByFaculty(parseInt(faculty_id));
    } else if (year) {
      result = await studentController.getStudentsByYear(parseInt(year));
    } else {
      result = await studentController.getStudents(limit, offset);
    }

    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/students/:user_id - Get student by user ID
router.get('/:user_id', async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.user_id);
    
    if (isNaN(user_id)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid user ID' 
      });
    }

    const result = await studentController.getStudentByUserId(user_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// PUT /api/students/:user_id - Update student
router.put('/:user_id', async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.user_id);
    
    if (isNaN(user_id)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid user ID' 
      });
    }

    const result = await studentController.updateStudent(user_id, req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// PUT /api/students/:user_id/progress - Update student academic progress
router.put('/:user_id/progress', async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.user_id);
    
    if (isNaN(user_id)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid user ID' 
      });
    }

    const result = await studentController.updateAcademicProgress(user_id, req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/students/student-id/:student_id - Get student by student ID
router.get('/student-id/:student_id', async (req: Request, res: Response) => {
  try {
    const student_id = req.params.student_id;
    
    const result = await studentController.getStudentByStudentId(student_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

export default router;