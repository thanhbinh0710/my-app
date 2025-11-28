import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createConnection } from './utils/database';
import routes from './routes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize database connection
async function initializeDatabase() {
  try {
    await createConnection();
    console.log('📚 Database connection established');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Routes
app.use('/api', routes);

// Health check route with Vietnam timezone
app.get('/health', (req, res) => {
  const vietnamTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    vietnamTime: vietnamTime,
    timezone: 'Asia/Ho_Chi_Minh (UTC+7)'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Error handler
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Unhandled Error:', error);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  initializeDatabase().then(() => {
    app.listen(PORT, () => {
      const vietnamTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    });
  });
}

export default app;