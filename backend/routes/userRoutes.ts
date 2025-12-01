import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { ensureDbConnection } from '../middleware/database';

const router = Router();
const userController = new UserController();

// Apply middleware to all routes
router.use(ensureDbConnection);

// GET /api/users - Get all users with optional filtering and pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const role = req.query.role as 'student' | 'teacher' | 'admin' | undefined;

    let result;
    if (role) {
      result = await userController.getUsersByRole(role);
    } else {
      result = await userController.getUsers(limit, offset);
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

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid user ID' 
      });
    }

    const result = await userController.getUserById(id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// POST /api/users - Create new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, role, username, password, full_name } = req.body;
    
    // Validate required fields
    if (!email || !role || !username || !password || !full_name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email, role, username, password, full_name'
      });
    }

    const result = await userController.createUser(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// POST /api/users/student - Create student with user account
router.post('/student', async (req: Request, res: Response) => {
  try {
    const { user, student } = req.body;
    
    // Validate required fields
    if (!user || !student) {
      return res.status(400).json({
        success: false,
        error: 'Missing user or student data'
      });
    }

    const result = await userController.createStudent(user, student);
    return res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

export default router;