import { RowDataPacket } from "mysql2/promise";
import { BaseRepository } from "./BaseRepository";
import {
  Teacher,
  CreateTeacherRequest,
  UpdateTeacherRequest,
} from "../models/Teacher";
import { DatabaseUtils } from "../utils/database";

export class TeacherRepository extends BaseRepository<
  Teacher,
  CreateTeacherRequest,
  UpdateTeacherRequest
> {
  constructor() {
    super("teacher");
  }

  async create(data: CreateTeacherRequest): Promise<Teacher> {
    const query = `
      INSERT INTO ${this.tableName} (user_id, teacher_id, certificate, faculty_id)
      VALUES (?, ?, ?, ?)
    `;

    await DatabaseUtils.executeQuery(query, [
      data.user_id,
      data.teacher_id,
      data.certificate || null,
      data.faculty_id,
    ]);

    const newTeacher = await this.findById(data.user_id);

    if (!newTeacher) {
      throw new Error("Failed to create teacher");
    }

    return newTeacher;
  }

  protected mapRowToEntity(row: RowDataPacket): Teacher {
    return {
      user_id: row.user_id,
      teacher_id: row.teacher_id,
      certificate: row.certificate,
      faculty_id: row.faculty_id,
    };
  }

  // Override findAll to join with user table
  async findAll(limit: number = 10, offset: number = 0): Promise<any[]> {
    const query = `
      SELECT 
        t.*, u.email, u.username, u.full_name, u.role, f.faculty_name
      FROM teacher t
      LEFT JOIN user u ON t.user_id = u.user_id
      LEFT JOIN faculty f ON t.faculty_id = f.faculty_id
      ORDER BY t.user_id LIMIT ? OFFSET ?
    `;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      limit,
      offset,
    ]);

    return results.map((row: any) => ({
      user_id: row.user_id,
      teacher_id: row.teacher_id,
      certificate: row.certificate,
      faculty_id: row.faculty_id,
      full_name: row.full_name || `Teacher ${row.user_id}`,
      email: row.email,
      username: row.username,
      role: row.role,
      faculty_name: row.faculty_name,
    }));
  }

  async findByTeacherId(teacher_id: string): Promise<Teacher | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE teacher_id = ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      teacher_id,
    ]);
    return results.length > 0 ? this.mapRowToEntity(results[0] as any) : null;
  }

  async findByFacultyId(
    faculty_id: number,
    limit: number = 50,
    offset: number = 0
  ): Promise<Teacher[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE faculty_id = ? LIMIT ? OFFSET ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      faculty_id,
      limit,
      offset,
    ]);
    return results.map((row: any) => this.mapRowToEntity(row));
  }

  async findWithUserInfo(user_id: number) {
    const query = `
      SELECT 
        t.*,
        u.email, u.username, u.full_name, u.role,
        f.faculty_name
      FROM teacher t
      LEFT JOIN user u ON t.user_id = u.user_id
      LEFT JOIN faculty f ON t.faculty_id = f.faculty_id
      WHERE t.user_id = ?
    `;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      user_id,
    ]);
    return results.length > 0 ? (results[0] as any) : null;
  }

  async countByFaculty(faculty_id: number): Promise<number> {
    const query = `SELECT COUNT(*) as total FROM ${this.tableName} WHERE faculty_id = ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      faculty_id,
    ]);
    return (results[0] as any)?.total || 0;
  }

  // Override base methods to use user_id as primary key
  async findById(id: number): Promise<Teacher | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE user_id = ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      id,
    ]);
    return results.length > 0 ? this.mapRowToEntity(results[0] as any) : null;
  }

  async update(id: number, data: UpdateTeacherRequest): Promise<Teacher> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.teacher_id !== undefined) {
      fields.push("teacher_id = ?");
      values.push(data.teacher_id);
    }
    if (data.certificate !== undefined) {
      fields.push("certificate = ?");
      values.push(data.certificate);
    }
    if (data.faculty_id !== undefined) {
      fields.push("faculty_id = ?");
      values.push(data.faculty_id);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(id);
    const query = `UPDATE ${this.tableName} SET ${fields.join(
      ", "
    )} WHERE user_id = ?`;
    await DatabaseUtils.executeQuery(query, values);

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error("Failed to retrieve updated teacher");
    }

    return updated;
  }

  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE user_id = ?`;
    await DatabaseUtils.executeQuery(query, [id]);
    return true;
  }
}
