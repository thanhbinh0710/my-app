import { DatabaseUtils, createConnection } from '../../utils/database';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

export class SeederRunner {
  private static seedersPath = path.join(__dirname);

  private static async ensureSeedersTable(): Promise<void> {
    const createSeedersTableQuery = `
      CREATE TABLE IF NOT EXISTS seeders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        seeder_name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;
    
    await DatabaseUtils.executeQuery(createSeedersTableQuery);
    console.log('✅ Seeders table ensured');
  }

  private static async hasExecutedSeeder(seederName: string): Promise<boolean> {
    try {
      const [result] = await DatabaseUtils.executeQuery(
        'SELECT COUNT(*) as count FROM seeders WHERE seeder_name = ?',
        [seederName]
      );
      return result.count > 0;
    } catch {
      return false; // If table doesn't exist yet
    }
  }

  private static async recordSeeder(seederName: string): Promise<void> {
    await DatabaseUtils.executeQuery(
      'INSERT IGNORE INTO seeders (seeder_name) VALUES (?)',
      [seederName]
    );
    console.log(`✅ Recorded seeder: ${seederName}`);
  }

  private static async executeSeederFile(filePath: string): Promise<void> {
    const sqlContent = fs.readFileSync(filePath, 'utf8');
    
    // Remove all SQL comments first
    let cleanedSQL = sqlContent
      // Remove single-line comments
      .split('\n')
      .map(line => {
        const commentIndex = line.indexOf('--');
        if (commentIndex >= 0) {
          return line.substring(0, commentIndex);
        }
        return line;
      })
      .join('\n')
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Split by semicolon and filter
    const statements = cleanedSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await DatabaseUtils.executeQuery(statement);
        } catch (error: any) {
          // Ignore duplicate entry errors for seeders but log others
          if (error.message.includes('Duplicate entry') || 
              error.message.includes('already exists')) {
            console.log(`⚠️  Warning: ${error.message}`);
          } else {
            console.error(`Error executing statement: ${statement.substring(0, 100)}...`);
            console.error('Error details:', error.message);
            throw error;
          }
        }
      }
    }
  }

  public static async runSeeds(): Promise<void> {
    try {
      await createConnection();
      console.log('🌱 Starting database seeding...');

      // Ensure seeders tracking table exists
      await this.ensureSeedersTable();

      // Get all seeder files
      const seederFiles = fs.readdirSync(this.seedersPath)
        .filter(file => file.endsWith('.sql'))
        .sort(); // Execute in alphabetical order

      for (const file of seederFiles) {
        if (!(await this.hasExecutedSeeder(file))) {
          console.log(`🌱 Running seeder: ${file}`);
          
          // Special handling for enrollment seeder - drop trigger to avoid conflicts
          if (file === '008_enrollments.sql') {
            try {
              await DatabaseUtils.executeQuery('DROP TRIGGER IF EXISTS trg_update_course_registration');
              console.log('⚙️  Temporarily dropped trigger: trg_update_course_registration');
            } catch (error: any) {
              console.log(`⚠️  Could not drop trigger: ${error.message}`);
            }
          }
          
          await this.executeSeederFile(path.join(this.seedersPath, file));
          await this.recordSeeder(file);
          
          // Recreate trigger after enrollment seeder
          if (file === '008_enrollments.sql') {
            try {
              const createTrigger = `
                CREATE TRIGGER trg_update_course_registration
                AFTER INSERT ON enroll
                FOR EACH ROW
                BEGIN
                    UPDATE student 
                    SET total_course_register = total_course_register + 1
                    WHERE student_id = NEW.student_id;
                END
              `;
              await DatabaseUtils.executeQuery(createTrigger);
              console.log('⚙️  Recreated trigger: trg_update_course_registration');
            } catch (error: any) {
              console.log(`⚠️  Could not recreate trigger: ${error.message}`);
            }
          }
          
          console.log(`✅ Seeder completed: ${file}`);
        } else {
          console.log(`ℹ️ Seeder ${file} already executed, skipping...`);
        }
      }

      console.log('🎉 All seeders completed successfully!');

    } catch (error) {
      console.error('❌ Seeding failed:', error);
      throw error;
    }
  }

  public static async getSeederStatus(): Promise<void> {
    try {
      await createConnection();
      
      const seeders = await DatabaseUtils.executeQuery(
        'SELECT seeder_name, executed_at FROM seeders ORDER BY executed_at ASC'
      );

      console.log('\n🌱 Seeder Status:');
      console.log('==================');
      
      if (seeders.length === 0) {
        console.log('No seeders executed yet.');
      } else {
        seeders.forEach((seeder: any, index: number) => {
          // Format date to Vietnam timezone
          const vietnamTime = new Date(seeder.executed_at).toLocaleString('en-US', {
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
          console.log(`${index + 1}. ${seeder.seeder_name} - ${vietnamTime} (Vietnam Ho Chi Minh)`);
        });
      }
      
    } catch (error) {
      console.error('❌ Failed to get seeder status:', error);
      throw error;
    }
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'run':
    case '':
    case undefined:
      SeederRunner.runSeeds();
      break;
    case 'status':
      SeederRunner.getSeederStatus();
      break;
    default:
      console.log(`
Usage: npm run seed [command]

Commands:
  seed        - Run all seeders
  seed:status - Show seeder status

Examples:
  npm run seed
  npm run seed:status
      `);
  }
}