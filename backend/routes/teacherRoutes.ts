import { Router, Request, Response } from 'express';
import { TeacherController } from '../controllers/TeacherController';
import { createConnection } from '../utils/database';

const router = Router();
const teacherController = new TeacherController();

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

// GET /api/teachers?limit=50&offset=0 - Get all teachers with pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const result = await teacherController.getTeachers(limit, offset);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/teachers/faculty/:faculty_id - Get teachers by faculty
router.get('/faculty/:faculty_id', async (req: Request, res: Response) => {
  try {
    const faculty_id = parseInt(req.params.faculty_id);
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    if (isNaN(faculty_id)) {
      return res.status(400).json({ success: false, error: 'Invalid faculty ID' });
    }
    
    const result = await teacherController.getTeachersByFaculty(faculty_id, limit, offset);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/teachers/teacher-id/:teacher_id - Get teacher by teacher ID
router.get('/teacher-id/:teacher_id', async (req: Request, res: Response) => {
  try {
    const result = await teacherController.getTeacherByTeacherId(req.params.teacher_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/teachers/:user_id - Get teacher by user ID
router.get('/:user_id', async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.user_id);
    if (isNaN(user_id)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }
    
    const result = await teacherController.getTeacherById(user_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/teachers/:user_id/with-info - Get teacher with full info
router.get('/:user_id/with-info', async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.user_id);
    if (isNaN(user_id)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }
    
    const result = await teacherController.getTeacherWithInfo(user_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /api/teachers - Create new teacher
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user_id, teacher_id, certificate, faculty_id } = req.body;
    
    if (!user_id || !teacher_id || !faculty_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: user_id, teacher_id, faculty_id' 
      });
    }
    
    const result = await teacherController.createTeacher(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// PUT /api/teachers/:user_id - Update teacher
router.put('/:user_id', async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.user_id);
    if (isNaN(user_id)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }
    
    const result = await teacherController.updateTeacher(user_id, req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// DELETE /api/teachers/:user_id - Delete teacher
router.delete('/:user_id', async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.user_id);
    if (isNaN(user_id)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }
    
    const result = await teacherController.deleteTeacher(user_id);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
