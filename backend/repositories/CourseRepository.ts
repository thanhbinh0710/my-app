import { RowDataPacket } from 'mysql2/promise';
import { BaseRepository } from './BaseRepository';
import { Course, CreateCourseRequest, UpdateCourseRequest, CourseWithFaculty } from '../models/Course';
import { DatabaseUtils } from '../utils/database';

export class CourseRepository extends BaseRepository<Course, CreateCourseRequest, UpdateCourseRequest> {
  constructor() {
    super('course');
  }

  protected mapRowToEntity(row: RowDataPacket): Course {
    return {
      id: row.id,
      course_code: row.course_code,
      course_name: row.course_name,
      credits: row.credits,
      description: row.description,
      faculty_id: row.faculty_id
    };
  }

  async create(data: CreateCourseRequest): Promise<Course> {
    const query = `
      INSERT INTO ${this.tableName} (course_code, course_name, credits, description, faculty_id) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    await DatabaseUtils.executeQuery(query, [
      data.course_code,
      data.course_name,
      data.credits,
      data.description,
      data.faculty_id
    ]);
    
    const insertId = await DatabaseUtils.getLastInsertId();
    const newCourse = await this.findById(insertId);
    
    if (!newCourse) {
      throw new Error('Failed to create course');
    }
    
    return newCourse;
  }

  async update(id: number, data: UpdateCourseRequest): Promise<Course | null> {
    const updates: string[] = [];
    const values: any[] = [];
    
    if (data.course_code !== undefined) {
      updates.push('course_code = ?');
      values.push(data.course_code);
    }
    
    if (data.course_name !== undefined) {
      updates.push('course_name = ?');
      values.push(data.course_name);
    }
    
    if (data.credits !== undefined) {
      updates.push('credits = ?');
      values.push(data.credits);
    }
    
    if (data.description !== undefined) {
      updates.push('description = ?');
      values.push(data.description);
    }
    
    if (data.faculty_id !== undefined) {
      updates.push('faculty_id = ?');
      values.push(data.faculty_id);
    }
    
    if (updates.length === 0) {
      return this.findById(id);
    }
    
    values.push(id);
    const query = `UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = ?`;
    
    await DatabaseUtils.executeQuery(query, values);
    return this.findById(id);
  }

  // Additional course-specific methods
  async findByCourseCode(course_code: string): Promise<Course | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE course_code = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [course_code]);
    
    if (rows.length === 0) return null;
    return this.mapRowToEntity(rows[0]);
  }

  async findByFaculty(faculty_id: number): Promise<Course[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE faculty_id = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [faculty_id]);
    
    return rows.map((row: RowDataPacket) => this.mapRowToEntity(row));
  }

  async findByCredits(credits: number): Promise<Course[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE credits = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [credits]);
    
    return rows.map((row: RowDataPacket) => this.mapRowToEntity(row));
  }

  async searchByName(searchTerm: string): Promise<Course[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE course_name LIKE ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [`%${searchTerm}%`]);
    
    return rows.map((row: RowDataPacket) => this.mapRowToEntity(row));
  }

  async findWithFacultyInfo(id: number): Promise<CourseWithFaculty | null> {
    const query = `
      SELECT 
        c.id, c.course_code, c.course_name, c.credits, c.description, c.faculty_id,
        f.id as faculty_id, f.faculty_name, f.description as faculty_description
      FROM ${this.tableName} c
      JOIN faculty f ON c.faculty_id = f.id
      WHERE c.id = ?
    `;
    
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [id]);
    
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return {
      id: row.id,
      course_code: row.course_code,
      course_name: row.course_name,
      credits: row.credits,
      description: row.description,
      faculty_id: row.faculty_id,
      faculty: {
        id: row.faculty_id,
        faculty_name: row.faculty_name,
        description: row.faculty_description
      }
    };
  }

  async findAllWithFacultyInfo(limit: number = 50, offset: number = 0): Promise<CourseWithFaculty[]> {
    const query = `
      SELECT 
        c.id, c.course_code, c.course_name, c.credits, c.description, c.faculty_id,
        f.id as faculty_id, f.faculty_name, f.description as faculty_description
      FROM ${this.tableName} c
      JOIN faculty f ON c.faculty_id = f.id
      LIMIT ? OFFSET ?
    `;
    
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [limit, offset]);
    
    return rows.map((row: RowDataPacket) => ({
      id: row.id,
      course_code: row.course_code,
      course_name: row.course_name,
      credits: row.credits,
      description: row.description,
      faculty_id: row.faculty_id,
      faculty: {
        id: row.faculty_id,
        faculty_name: row.faculty_name,
        description: row.faculty_description
      }
    }));
  }

  async getTotalCreditsByFaculty(faculty_id: number): Promise<number> {
    const query = `SELECT SUM(credits) as total_credits FROM ${this.tableName} WHERE faculty_id = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [faculty_id]);
    
    return rows[0].total_credits || 0;
  }
}