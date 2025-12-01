import { RowDataPacket } from 'mysql2/promise';
import { BaseRepository } from './BaseRepository';
import { Faculty, CreateFacultyRequest, UpdateFacultyRequest } from '../models/Faculty';
import { DatabaseUtils } from '../utils/database';

export class FacultyRepository extends BaseRepository<Faculty, CreateFacultyRequest, UpdateFacultyRequest> {
  constructor() {
    super('faculty');
  }

  async create(data: CreateFacultyRequest): Promise<Faculty> {
    const query = `
      INSERT INTO ${this.tableName} (faculty_name, office_location, phone_number, email)
      VALUES (?, ?, ?, ?)
    `;
    
    await DatabaseUtils.executeQuery(query, [
      data.faculty_name,
      data.office_location || null,
      data.phone_number || null,
      data.email || null
    ]);

    const insertId = await DatabaseUtils.getLastInsertId();
    const newFaculty = await this.findById(insertId);
    
    if (!newFaculty) {
      throw new Error('Failed to create faculty');
    }

    return newFaculty;
  }

  protected mapRowToEntity(row: RowDataPacket): Faculty {
    return {
      faculty_id: row.faculty_id,
      faculty_name: row.faculty_name,
      office_location: row.office_location,
      phone_number: row.phone_number,
      email: row.email,
      number_of_teacher_in_faculty: row.number_of_teacher_in_faculty || 0
    };
  }

  async searchByName(name: string): Promise<Faculty[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE faculty_name LIKE ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [`%${name}%`]);
    return results.map((row: any) => this.mapRowToEntity(row));
  }

  async findWithStatistics(faculty_id: number) {
    const query = `
      SELECT 
        f.*,
        COUNT(DISTINCT t.user_id) as teacher_count,
        COUNT(DISTINCT s.user_id) as student_count,
        COUNT(DISTINCT c.course_id) as course_count
      FROM faculty f
      LEFT JOIN teacher t ON f.faculty_id = t.faculty_id
      LEFT JOIN student s ON f.faculty_id = s.faculty_id
      LEFT JOIN course c ON t.user_id = c.teacher_id
      WHERE f.faculty_id = ?
      GROUP BY f.faculty_id
    `;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [faculty_id]);
    return results.length > 0 ? (results[0] as any) : null;
  }

  // Override findById to use faculty_id
  async findById(id: number): Promise<Faculty | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE faculty_id = ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [id]);
    return results.length > 0 ? this.mapRowToEntity(results[0] as any) : null;
  }

  async update(id: number, data: UpdateFacultyRequest): Promise<Faculty> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.faculty_name !== undefined) {
      fields.push('faculty_name = ?');
      values.push(data.faculty_name);
    }
    if (data.office_location !== undefined) {
      fields.push('office_location = ?');
      values.push(data.office_location);
    }
    if (data.phone_number !== undefined) {
      fields.push('phone_number = ?');
      values.push(data.phone_number);
    }
    if (data.email !== undefined) {
      fields.push('email = ?');
      values.push(data.email);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const query = `UPDATE ${this.tableName} SET ${fields.join(', ')} WHERE faculty_id = ?`;
    await DatabaseUtils.executeQuery(query, values);

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Failed to retrieve updated faculty');
    }

    return updated;
  }

  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE faculty_id = ?`;
    await DatabaseUtils.executeQuery(query, [id]);
    return true;
  }
}
