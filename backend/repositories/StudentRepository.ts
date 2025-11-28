import { RowDataPacket } from 'mysql2/promise';
import { BaseRepository } from './BaseRepository';
import { Student, CreateStudentRequest, UpdateStudentRequest, StudentWithUser } from '../models/Student';
import { DatabaseUtils } from '../utils/database';

export class StudentRepository extends BaseRepository<Student, CreateStudentRequest, UpdateStudentRequest> {
  constructor() {
    super('student');
  }

  protected mapRowToEntity(row: RowDataPacket): Student {
    return {
      user_id: row.user_id,
      student_id: row.student_id,
      admission_date: row.admission_date,
      total_credit_earn: row.total_credit_earn,
      total_course_register: row.total_course_register,
      total_course_complete: row.total_course_complete,
      faculty_id: row.faculty_id,
      roadmap_id: row.roadmap_id
    };
  }

  // Override findById to use user_id as primary key
  async findById(user_id: number): Promise<Student | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE user_id = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [user_id]);
    
    if (rows.length === 0) return null;
    return this.mapRowToEntity(rows[0]);
  }

  // Add alias method for clarity
  async findByUserId(user_id: number): Promise<Student | null> {
    return this.findById(user_id);
  }

  async create(data: CreateStudentRequest): Promise<Student> {
    const query = `
      INSERT INTO ${this.tableName} (user_id, student_id, admission_date, faculty_id, roadmap_id) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    await DatabaseUtils.executeQuery(query, [
      data.user_id,
      data.student_id,
      data.admission_date,
      data.faculty_id || null,
      data.roadmap_id || null
    ]);
    
    const newStudent = await this.findById(data.user_id);
    
    if (!newStudent) {
      throw new Error('Failed to create student');
    }
    
    return newStudent;
  }

  async update(user_id: number, data: UpdateStudentRequest): Promise<Student | null> {
    return this.updateByUserId(user_id, data);
  }

  async updateByUserId(user_id: number, data: UpdateStudentRequest): Promise<Student | null> {
    const updates: string[] = [];
    const values: any[] = [];
    
    if (data.student_id !== undefined) {
      updates.push('student_id = ?');
      values.push(data.student_id);
    }
    
    if (data.admission_date !== undefined) {
      updates.push('admission_date = ?');
      values.push(data.admission_date);
    }
    
    if (data.total_credit_earn !== undefined) {
      updates.push('total_credit_earn = ?');
      values.push(data.total_credit_earn);
    }
    
    if (data.total_course_register !== undefined) {
      updates.push('total_course_register = ?');
      values.push(data.total_course_register);
    }
    
    if (data.total_course_complete !== undefined) {
      updates.push('total_course_complete = ?');
      values.push(data.total_course_complete);
    }
    
    if (data.faculty_id !== undefined) {
      updates.push('faculty_id = ?');
      values.push(data.faculty_id);
    }
    
    if (data.roadmap_id !== undefined) {
      updates.push('roadmap_id = ?');
      values.push(data.roadmap_id);
    }
    
    if (updates.length === 0) {
      return this.findById(user_id);
    }
    
    values.push(user_id);
    const query = `UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE user_id = ?`;
    
    await DatabaseUtils.executeQuery(query, values);
    return this.findById(user_id);
  }

  // Additional student-specific methods
  async findByStudentId(student_id: string): Promise<Student | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE student_id = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [student_id]);
    
    if (rows.length === 0) return null;
    return this.mapRowToEntity(rows[0]);
  }

  async findByFaculty(faculty_id: number): Promise<Student[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE faculty_id = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [faculty_id]);
    
    return rows.map((row: RowDataPacket) => this.mapRowToEntity(row));
  }

  async findByYear(year: number): Promise<Student[]> {
    // Extract year from student_id (first 2 digits represent year)
    const query = `SELECT * FROM ${this.tableName} WHERE LEFT(student_id, 2) = ?`;
    const yearStr = year.toString().slice(-2); // Get last 2 digits
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [yearStr]);
    
    return rows.map((row: RowDataPacket) => this.mapRowToEntity(row));
  }

  async findWithUserInfo(user_id: number): Promise<StudentWithUser | null> {
    const query = `
      SELECT 
        s.user_id, s.student_id, s.admission_date, s.total_credit_earn, 
        s.total_course_register, s.total_course_complete, s.faculty_id, s.roadmap_id,
        u.id, u.email, u.username, u.full_name, u.role
      FROM ${this.tableName} s
      JOIN user u ON s.user_id = u.id
      WHERE s.user_id = ?
    `;
    
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [user_id]);
    
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return {
      user_id: row.user_id,
      student_id: row.student_id,
      admission_date: row.admission_date,
      total_credit_earn: row.total_credit_earn,
      total_course_register: row.total_course_register,
      total_course_complete: row.total_course_complete,
      faculty_id: row.faculty_id,
      roadmap_id: row.roadmap_id,
      user: {
        id: row.id,
        email: row.email,
        username: row.username,
        full_name: row.full_name,
        role: row.role
      }
    };
  }

  async findAllWithUserInfo(limit: number = 50, offset: number = 0): Promise<StudentWithUser[]> {
    const query = `
      SELECT 
        s.user_id, s.student_id, s.admission_date, s.total_credit_earn, 
        s.total_course_register, s.total_course_complete, s.faculty_id, s.roadmap_id,
        u.id, u.email, u.username, u.full_name, u.role
      FROM ${this.tableName} s
      JOIN user u ON s.user_id = u.id
      LIMIT ? OFFSET ?
    `;
    
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [limit, offset]);
    
    return rows.map((row: RowDataPacket) => ({
      user_id: row.user_id,
      student_id: row.student_id,
      admission_date: row.admission_date,
      total_credit_earn: row.total_credit_earn,
      total_course_register: row.total_course_register,
      total_course_complete: row.total_course_complete,
      faculty_id: row.faculty_id,
      roadmap_id: row.roadmap_id,
      user: {
        id: row.id,
        email: row.email,
        username: row.username,
        full_name: row.full_name,
        role: row.role
      }
    }));
  }
}