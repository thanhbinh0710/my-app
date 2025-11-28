import { RowDataPacket } from 'mysql2/promise';
import { BaseRepository } from './BaseRepository';
import { Course, CreateCourseRequest, UpdateCourseRequest, CourseWithTeacher } from '../models/Course';
import { DatabaseUtils } from '../utils/database';

export class CourseRepository extends BaseRepository<Course, CreateCourseRequest, UpdateCourseRequest> {
  constructor() {
    super('course');
  }

  protected mapRowToEntity(row: RowDataPacket): Course {
    return {
      course_id: row.course_id,
      course_name: row.course_name,
      course_group: row.course_group,
      creation_date: row.creation_date,
      course_passing_grade: row.course_passing_grade,
      course_status: row.course_status,
      teacher_id: row.teacher_id
    };
  }

  async create(data: CreateCourseRequest): Promise<Course> {
    const query = `
      INSERT INTO ${this.tableName} (course_name, course_group, course_passing_grade, course_status, teacher_id) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    await DatabaseUtils.executeQuery(query, [
      data.course_name,
      data.course_group || null,
      data.course_passing_grade || 50,
      data.course_status || 'active',
      data.teacher_id
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
    
    if (data.course_name !== undefined) {
      updates.push('course_name = ?');
      values.push(data.course_name);
    }
    
    if (data.course_group !== undefined) {
      updates.push('course_group = ?');
      values.push(data.course_group);
    }
    
    if (data.course_passing_grade !== undefined) {
      updates.push('course_passing_grade = ?');
      values.push(data.course_passing_grade);
    }
    
    if (data.course_status !== undefined) {
      updates.push('course_status = ?');
      values.push(data.course_status);
    }
    
    if (data.teacher_id !== undefined) {
      updates.push('teacher_id = ?');
      values.push(data.teacher_id);
    }
    
    if (updates.length === 0) {
      return this.findById(id);
    }
    
    values.push(id);
    const query = `UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE course_id = ?`;
    
    await DatabaseUtils.executeQuery(query, values);
    return this.findById(id);
  }

  // Additional course-specific methods
  async findByTeacher(teacher_id: number): Promise<Course[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE teacher_id = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [teacher_id]);
    
    return rows.map((row: RowDataPacket) => this.mapRowToEntity(row));
  }

  async findByStatus(status: 'active' | 'inactive' | 'archived'): Promise<Course[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE course_status = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [status]);
    
    return rows.map((row: RowDataPacket) => this.mapRowToEntity(row));
  }

  async searchByName(searchTerm: string): Promise<Course[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE course_name LIKE ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [`%${searchTerm}%`]);
    
    return rows.map((row: RowDataPacket) => this.mapRowToEntity(row));
  }

  async findWithTeacherInfo(id: number): Promise<CourseWithTeacher | null> {
    const query = `
      SELECT 
        c.*,
        t.user_id, t.teacher_id, t.certificate, t.faculty_id
      FROM ${this.tableName} c
      JOIN teacher t ON c.teacher_id = t.user_id
      WHERE c.course_id = ?
    `;
    
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [id]);
    
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return {
      course_id: row.course_id,
      course_name: row.course_name,
      course_group: row.course_group,
      creation_date: row.creation_date,
      course_passing_grade: row.course_passing_grade,
      course_status: row.course_status,
      teacher_id: row.teacher_id,
      teacher: {
        user_id: row.user_id,
        teacher_id: row.teacher_id,
        certificate: row.certificate,
        faculty_id: row.faculty_id
      }
    };
  }
}