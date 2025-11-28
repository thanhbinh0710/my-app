import { DatabaseUtils, createConnection } from '../../utils/database';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { exit } from 'process';

// Load environment variables
dotenv.config({ path: '.env.local' });

export class MigrationRunner {
  private static migrationsPath = path.join(__dirname);
  
  // Updated migration files list to include all new files
  private static migrationFiles = [
    '001_create_database.sql',
    '002_create_base_tables.sql', 
    '003_create_user_tables.sql',
    '004_create_course_tables.sql',
    '005_create_enrollment_tables.sql',
    '006_create_content_tables.sql',
    '007_create_indexes.sql',
    '008_create_views.sql',
    '009_create_triggers.sql', 
    '010_create_procedures.sql',
    '011_create_functions.sql'
  ];

  // Create initial database without specifying database name
  private static async createInitialConnection(): Promise<mysql.Pool> {
    const config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || '3306'),
      connectionLimit: 10,
      charset: 'utf8mb4',
      timezone: '+00:00'
    };

    return mysql.createPool(config);
  }

  private static async ensureMigrationsTable(): Promise<void> {
    const createMigrationsTableQuery = `
      CREATE TABLE IF NOT EXISTS migrations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        migration_name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;
    
    await DatabaseUtils.executeQuery(createMigrationsTableQuery);
    console.log('✅ Migrations table ensured');
  }

  private static async hasExecutedMigration(migrationName: string): Promise<boolean> {
    try {
      const [result] = await DatabaseUtils.executeQuery(
        'SELECT COUNT(*) as count FROM migrations WHERE migration_name = ?',
        [migrationName]
      );
      return result.count > 0;
    } catch {
      return false; // If table doesn't exist yet
    }
  }

  private static async recordMigration(migrationName: string): Promise<void> {
    await DatabaseUtils.executeQuery(
      'INSERT IGNORE INTO migrations (migration_name) VALUES (?)',
      [migrationName]
    );
    console.log(`✅ Recorded migration: ${migrationName}`);
  }

  private static async executeMigrationFile(filePath: string): Promise<void> {
    const sqlContent = fs.readFileSync(filePath, 'utf8');
    
    // Handle DELIMITER statements properly for stored procedures/functions/triggers
    const statements = this.splitSQLStatements(sqlContent);

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await DatabaseUtils.executeQuery(statement);
        } catch (error: any) {
          // Ignore harmless errors but log them
          if (error.message.includes('already exists') || 
              error.message.includes('database exists') ||
              error.message.includes('Duplicate key name')) {
            console.log(`⚠️  Warning: ${error.message}`);
          } else {
            console.error(`Error executing: ${statement.substring(0, 100)}...`);
            throw error;
          }
        }
      }
    }
  }

  private static splitSQLStatements(sql: string): string[] {
    const statements: string[] = [];
    let current = '';
    let inDelimiter = false;
    
    const lines = sql.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Skip comments
      if (trimmed.startsWith('--') || trimmed.startsWith('/*') || trimmed === '') {
        continue;
      }
      
      // Handle DELIMITER commands
      if (trimmed.startsWith('DELIMITER')) {
        inDelimiter = trimmed !== 'DELIMITER ;';
        continue;
      }
      
      current += line + '\n';
      
      // If we're in a delimiter block, look for the custom delimiter
      if (inDelimiter) {
        if (trimmed.endsWith('//')) {
          statements.push(current.replace(/\/\/$/m, ';').trim());
          current = '';
        }
      } else {
        // Normal case - split by semicolon
        if (trimmed.endsWith(';')) {
          statements.push(current.trim());
          current = '';
        }
      }
    }
    
    // Add any remaining content
    if (current.trim()) {
      statements.push(current.trim());
    }
    
    return statements.filter(stmt => stmt.length > 0);
  }

  public static async runMigrations(): Promise<void> {
    try {
      console.log('🚀 Starting database migration...');

      // Handle first migration (database creation) specially
      const firstMigration = this.migrationFiles[0];
      const firstMigrationPath = path.join(this.migrationsPath, firstMigration);
      
      // Create initial connection without database
      let initialPool: mysql.Pool | null = null;
      try {
        initialPool = await this.createInitialConnection();
        console.log('📝 Running database creation migration...');
        
        const sql = fs.readFileSync(firstMigrationPath, 'utf8');
        const statements = this.splitSQLStatements(sql);
        
        for (const statement of statements) {
          if (statement.trim()) {
            await initialPool.query(statement);
          }
        }
        
        console.log('✅ Database creation completed');
        await initialPool.end();
        initialPool = null;
      } catch (error: any) {
        if (initialPool) await initialPool.end();
        if (!error.message.includes('database exists')) {
          throw error;
        }
        console.log('ℹ️  Database already exists, continuing...');
      }

      // Now connect to the specific database for remaining migrations
      await createConnection();
      
      // Ensure migrations tracking table exists
      await this.ensureMigrationsTable();

      // Process remaining migration files
      for (let i = 0; i < this.migrationFiles.length; i++) {
        const migrationFile = this.migrationFiles[i];
        const migrationPath = path.join(this.migrationsPath, migrationFile);
        
        if (!fs.existsSync(migrationPath)) {
          console.warn(`⚠️  Migration file not found: ${migrationFile}`);
          continue;
        }

        if (!(await this.hasExecutedMigration(migrationFile))) {
          console.log(`📝 Running migration: ${migrationFile}`);
          
          if (i === 0) {
            // First migration already handled above
            await this.recordMigration(migrationFile);
          } else {
            await this.executeMigrationFile(migrationPath);
            await this.recordMigration(migrationFile);
          }
          
          console.log(`✅ Migration completed: ${migrationFile}`);
        } else {
          console.log(`⏭️  Skipping migration: ${migrationFile} (already executed)`);
        }
      }

      console.log('🎉 All migrations completed successfully!');
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
      throw error;
    }
  }

  public static async getMigrationStatus(): Promise<void> {
    try {
      await createConnection();
      
      const migrations = await DatabaseUtils.executeQuery(
        'SELECT migration_name, executed_at FROM migrations ORDER BY executed_at ASC'
      );

      console.log('\n📊 Migration Status:');
      console.log('====================');
      
      if (migrations.length === 0) {
        console.log('No migrations executed yet.');
      } else {
        migrations.forEach((migration: any, index: number) => {
          // Format date to Vietnam timezone
          const vietnamTime = new Date(migration.executed_at).toLocaleString('en-US', {
            timeZone: 'Asia/Ho_Chi_Minh',
            weekday: 'short',
            year: 'numeric',
            month: 'short', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });
          console.log(`${index + 1}. ${migration.migration_name} - ${vietnamTime} (Vietnam Ho Chi Minh)`);
        });
      }
      
    } catch (error) {
      console.error('❌ Failed to get migration status:', error);
      throw error;
    }
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'up':
    case '':
    case undefined:
      MigrationRunner.runMigrations();
      break;
    case 'status':
      MigrationRunner.getMigrationStatus();
      break;
    default:
      console.log(`
Usage: npm run migrate [command]

Commands:
  migrate        - Run all pending migrations
  migrate:status - Show migration status

Examples:
  npm run migrate
  npm run migrate:status
      `);
  }
}