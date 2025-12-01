import { Router, Request, Response } from 'express';
import { FacultyController } from '../controllers/FacultyController';
import { createConnection } from '../utils/database';

const router = Router();
const facultyController = new FacultyController();

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

// GET /api/faculties?limit=50&offset=0 - Get all faculties with pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const result = await facultyController.getFaculties(limit, offset);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/faculties/search?q=keyword - Search faculties by name
router.get('/search', async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q as string;
    
    if (!searchTerm) {
      return res.status(400).json({ success: false, error: 'Please provide a search term' });
    }
    
    const result = await facultyController.searchFaculties(searchTerm);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/faculties/:faculty_id - Get faculty by ID
router.get('/:faculty_id', async (req: Request, res: Response) => {
  try {
    const faculty_id = parseInt(req.params.faculty_id);
    if (isNaN(faculty_id)) {
      return res.status(400).json({ success: false, error: 'Invalid faculty ID' });
    }
    
    const result = await facultyController.getFacultyById(faculty_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/faculties/:faculty_id/statistics - Get faculty with statistics
router.get('/:faculty_id/statistics', async (req: Request, res: Response) => {
  try {
    const faculty_id = parseInt(req.params.faculty_id);
    if (isNaN(faculty_id)) {
      return res.status(400).json({ success: false, error: 'Invalid faculty ID' });
    }
    
    const result = await facultyController.getFacultyWithStatistics(faculty_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /api/faculties - Create new faculty
router.post('/', async (req: Request, res: Response) => {
  try {
    const { faculty_name } = req.body;
    
    if (!faculty_name) {
      return res.status(400).json({ success: false, error: 'Missing required field: faculty_name' });
    }
    
    const result = await facultyController.createFaculty(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// PUT /api/faculties/:faculty_id - Update faculty
router.put('/:faculty_id', async (req: Request, res: Response) => {
  try {
    const faculty_id = parseInt(req.params.faculty_id);
    if (isNaN(faculty_id)) {
      return res.status(400).json({ success: false, error: 'Invalid faculty ID' });
    }
    
    const result = await facultyController.updateFaculty(faculty_id, req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// DELETE /api/faculties/:faculty_id - Delete faculty
router.delete('/:faculty_id', async (req: Request, res: Response) => {
  try {
    const faculty_id = parseInt(req.params.faculty_id);
    if (isNaN(faculty_id)) {
      return res.status(400).json({ success: false, error: 'Invalid faculty ID' });
    }
    
    const result = await facultyController.deleteFaculty(faculty_id);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
