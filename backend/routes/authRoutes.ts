import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { createConnection } from '../utils/database';

const router = Router();
const userController = new UserController();

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

// POST /api/auth/login - User login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required'
      });
    }

    const result = await userController.login(username, password);
    return res.status(result.success ? 200 : 401).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// POST /api/auth/register - User registration
router.post('/register', async (req: Request, res: Response) => {
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

export default router;