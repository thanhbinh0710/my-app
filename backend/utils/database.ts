import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Database configuration interface
interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  connectionLimit: number;
  acquireTimeout: number;
  timeout: number;
}

// Database configuration
const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'learning_management_system',
  port: parseInt(process.env.DB_PORT || '3306'),
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
};

// Create connection pool
let pool: mysql.Pool | null = null;

export const createConnection = async (): Promise<mysql.Pool> => {
  if (!pool) {
    try {
      pool = mysql.createPool({
        ...dbConfig,
        waitForConnections: true,
        queueLimit: 0,
        // Additional MySQL specific options
        charset: 'utf8mb4',
        timezone: '+00:00',
      });

      // Test connection
      const connection = await pool.getConnection();
      console.log('✅ Database connected successfully!');
      connection.release();
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }
  return pool;
};

export const getConnection = (): mysql.Pool => {
  if (!pool) {
    throw new Error('Database not initialized. Call createConnection() first.');
  }
  return pool;
};

export const closeConnection = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('🔌 Database connection closed');
  }
};

// Database utility functions
export class DatabaseUtils {
  static async executeQuery<T = any>(
    query: string, 
    params: any[] = []
  ): Promise<T[]> {
    try {
      const connection = getConnection();
      // Use query() for better compatibility with DDL statements
      const [rows] = params.length > 0 
        ? await connection.execute(query, params)
        : await connection.query(query);
      return rows as T[];
    } catch (error) {
      console.error('❌ Query execution failed:', error);
      console.error('Query:', query);
      console.error('Params:', params);
      throw error;
    }
  }

  static async executeTransaction<T>(
    queries: Array<{ query: string; params?: any[] }>
  ): Promise<T[]> {
    const connection = await getConnection().getConnection();
    
    try {
      await connection.beginTransaction();
      
      const results: T[] = [];
      for (const { query, params = [] } of queries) {
        const [result] = await connection.execute(query, params);
        results.push(result as T);
      }
      
      await connection.commit();
      return results;
    } catch (error) {
      await connection.rollback();
      console.error('❌ Transaction failed:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async callProcedure<T = any>(
    procedureName: string,
    params: any[] = []
  ): Promise<T[]> {
    try {
      const placeholders = params.map(() => '?').join(', ');
      const query = `CALL ${procedureName}(${placeholders})`;
      
      const connection = getConnection();
      const [rows] = await connection.execute(query, params);
      
      // Stored procedures return an array of result sets
      return Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] as T[] : rows as T[];
    } catch (error) {
      console.error('❌ Procedure execution failed:', error);
      console.error('Procedure:', procedureName);
      console.error('Params:', params);
      throw error;
    }
  }

  static async getLastInsertId(): Promise<number> {
    const [result] = await this.executeQuery('SELECT LAST_INSERT_ID() as id');
    return result.id;
  }

  // Pagination helper
  static buildPaginationQuery(
    baseQuery: string,
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): { query: string; countQuery: string; offset: number } {
    const offset = (page - 1) * limit;
    const query = `${baseQuery} ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`;
    
    // Extract the main query part for counting
    const fromIndex = baseQuery.toLowerCase().indexOf('from');
    const countQuery = `SELECT COUNT(*) as total ${baseQuery.substring(fromIndex)}`;
    
    return { query, countQuery, offset };
  }

  // Validation helpers
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  }

  static validateStudentId(studentId: string): boolean {
    const studentIdRegex = /^[A-Z0-9]{6,20}$/;
    return studentIdRegex.test(studentId);
  }

  static validateTeacherId(teacherId: string): boolean {
    const teacherIdRegex = /^[A-Z0-9]{6,20}$/;
    return teacherIdRegex.test(teacherId);
  }

  // Error handling
  static handleDatabaseError(error: any): never {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Duplicate entry detected. This record already exists.');
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new Error('Referenced record does not exist.');
    }
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      throw new Error('Cannot delete record. It is referenced by other records.');
    }
    if (error.code === 'ER_DATA_TOO_LONG') {
      throw new Error('Data too long for field.');
    }
    if (error.code === 'ER_BAD_NULL_ERROR') {
      throw new Error('Required field cannot be null.');
    }
    
    throw new Error(`Database error: ${error.message || 'Unknown database error'}`);
  }
}

// Export default connection for direct use
export default {
  createConnection,
  getConnection,
  closeConnection,
  DatabaseUtils
};