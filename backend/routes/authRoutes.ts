import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/AuthController';
import { ensureDbConnection } from '../middleware/database';

const router = Router();
const authController = new AuthController();

// Apply middleware to all routes
router.use(ensureDbConnection);

// POST /api/auth/register - User registration
// Body: { fullname: string, username: string, email: string, password: string, confirm_password: string }
router.post('/register', async (req: Request, res: Response) => {
  try {
    const result = await authController.register(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// POST /api/auth/login - User login
// Body: { identifier: string (username or email), password: string }
router.post('/login', async (req: Request, res: Response) => {
  try {
    const result = await authController.login(req.body);
    return res.status(result.success ? 200 : 401).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// POST /api/auth/verify - Verify JWT token
// Headers: { Authorization: 'Bearer <token>' }
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const result = await authController.verifyToken(token);
    
    return res.status(result.success ? 200 : 401).json(result);
  } catch (error) {
    console.error('Route Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

export default router;