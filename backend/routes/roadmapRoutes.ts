import { Router, Request, Response } from 'express';
import { RoadmapController } from '../controllers/RoadmapController';
import { createConnection } from '../utils/database';

const router = Router();
const roadmapController = new RoadmapController();

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

// GET /api/roadmaps?limit=50&offset=0 - Get all roadmaps with pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const result = await roadmapController.getRoadmaps(limit, offset);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/roadmaps/search?q=keyword - Search roadmaps by name
router.get('/search', async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q as string;
    
    if (!searchTerm) {
      return res.status(400).json({ success: false, error: 'Please provide a search term' });
    }
    
    const result = await roadmapController.searchRoadmaps(searchTerm);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/roadmaps/:roadmap_id - Get roadmap by ID
router.get('/:roadmap_id', async (req: Request, res: Response) => {
  try {
    const roadmap_id = parseInt(req.params.roadmap_id);
    if (isNaN(roadmap_id)) {
      return res.status(400).json({ success: false, error: 'Invalid roadmap ID' });
    }
    
    const result = await roadmapController.getRoadmapById(roadmap_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/roadmaps/:roadmap_id/with-courses - Get roadmap with all courses
router.get('/:roadmap_id/with-courses', async (req: Request, res: Response) => {
  try {
    const roadmap_id = parseInt(req.params.roadmap_id);
    if (isNaN(roadmap_id)) {
      return res.status(400).json({ success: false, error: 'Invalid roadmap ID' });
    }
    
    const result = await roadmapController.getRoadmapWithCourses(roadmap_id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /api/roadmaps - Create new roadmap
router.post('/', async (req: Request, res: Response) => {
  try {
    const { roadmap_name, description } = req.body;
    
    if (!roadmap_name || !description) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: roadmap_name, description' 
      });
    }
    
    const result = await roadmapController.createRoadmap(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// PUT /api/roadmaps/:roadmap_id - Update roadmap
router.put('/:roadmap_id', async (req: Request, res: Response) => {
  try {
    const roadmap_id = parseInt(req.params.roadmap_id);
    if (isNaN(roadmap_id)) {
      return res.status(400).json({ success: false, error: 'Invalid roadmap ID' });
    }
    
    const result = await roadmapController.updateRoadmap(roadmap_id, req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// DELETE /api/roadmaps/:roadmap_id - Delete roadmap
router.delete('/:roadmap_id', async (req: Request, res: Response) => {
  try {
    const roadmap_id = parseInt(req.params.roadmap_id);
    if (isNaN(roadmap_id)) {
      return res.status(400).json({ success: false, error: 'Invalid roadmap ID' });
    }
    
    const result = await roadmapController.deleteRoadmap(roadmap_id);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
