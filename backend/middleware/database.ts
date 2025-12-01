import { Request, Response, NextFunction } from 'express';
import { createConnection } from '../utils/database';

/**
 * Middleware to ensure database connection is established
 * before processing any request
 */
export async function ensureDbConnection(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
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
