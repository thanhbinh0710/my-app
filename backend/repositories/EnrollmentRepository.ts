import { RowDataPacket } from "mysql2/promise";
import {
  Enroll,
  CreateEnrollRequest,
  UpdateEnrollRequest,
} from "../models/Enrollment";
import { DatabaseUtils } from "../utils/database";

export class EnrollmentRepository {
  private tableName = "enroll";

  protected mapRowToEntity(row: RowDataPacket): Enroll {
    return {
      course_id: row.course_id,
      student_id: row.student_id,
      start_date: row.start_date,
      complete_date: row.complete_date,
      grade: row.grade,
      progress: row.progress,
    };
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<Enroll[]> {
    const query = `SELECT * FROM ${this.tableName} LIMIT ? OFFSET ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      limit,
      offset,
    ]);
    return results.map((row: any) => this.mapRowToEntity(row));
  }

  async findByCourseId(
    course_id: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Enroll[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE course_id = ? LIMIT ? OFFSET ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      course_id,
      limit,
      offset,
    ]);
    return results.map((row: any) => this.mapRowToEntity(row));
  }

  async findByStudentId(
    student_id: number,
    limit: number = 50,
    offset: number = 0
  ): Promise<Enroll[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE student_id = ? LIMIT ? OFFSET ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      student_id,
      limit,
      offset,
    ]);
    return results.map((row: any) => this.mapRowToEntity(row));
  }

  async findByProgress(
    progress: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Enroll[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE progress = ? LIMIT ? OFFSET ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      progress,
      limit,
      offset,
    ]);
    return results.map((row: any) => this.mapRowToEntity(row));
  }

  async findOne(course_id: string, student_id: number): Promise<Enroll | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE course_id = ? AND student_id = ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      course_id,
      student_id,
    ]);
    return results.length > 0 ? this.mapRowToEntity(results[0] as any) : null;
  }

  async create(data: CreateEnrollRequest): Promise<Enroll> {
    const query = `
      INSERT INTO ${this.tableName} (course_id, student_id, start_date, grade, progress)
      VALUES (?, ?, ?, ?, ?)
    `;

    await DatabaseUtils.executeQuery(query, [
      data.course_id,
      data.student_id,
      data.start_date || new Date().toISOString().split("T")[0],
      data.grade || null,
      data.progress || "enrolled",
    ]);

    const enrollment = await this.findOne(data.course_id, data.student_id);
    if (!enrollment) {
      throw new Error("Failed to create enrollment");
    }

    return enrollment;
  }

  async update(
    course_id: string,
    student_id: number,
    data: UpdateEnrollRequest
  ): Promise<Enroll> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.complete_date !== undefined) {
      fields.push("complete_date = ?");
      values.push(data.complete_date);
    }
    if (data.grade !== undefined) {
      fields.push("grade = ?");
      values.push(data.grade);
    }
    if (data.progress !== undefined) {
      fields.push("progress = ?");
      values.push(data.progress);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(course_id, student_id);
    const query = `UPDATE ${this.tableName} SET ${fields.join(
      ", "
    )} WHERE course_id = ? AND student_id = ?`;
    await DatabaseUtils.executeQuery(query, values);

    const updated = await this.findOne(course_id, student_id);
    if (!updated) {
      throw new Error("Failed to retrieve updated enrollment");
    }

    return updated;
  }

  async delete(course_id: string, student_id: number): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE course_id = ? AND student_id = ?`;
    await DatabaseUtils.executeQuery(query, [course_id, student_id]);
  }

  async count(): Promise<number> {
    const query = `SELECT COUNT(*) as total FROM ${this.tableName}`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query);
    return (results[0] as any)?.total || 0;
  }

  async countByCourse(course_id: string): Promise<number> {
    const query = `SELECT COUNT(*) as total FROM ${this.tableName} WHERE course_id = ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      course_id,
    ]);
    return (results[0] as any)?.total || 0;
  }

  async countByStudent(student_id: number): Promise<number> {
    const query = `SELECT COUNT(*) as total FROM ${this.tableName} WHERE student_id = ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      student_id,
    ]);
    return (results[0] as any)?.total || 0;
  }

  // Get student's enrolled courses with course details
  async getStudentCoursesWithDetails(student_id: number): Promise<any[]> {
    const query = `
      SELECT 
        c.course_id,
        c.course_name,
        c.course_credit,
        c.course_status,
        e.start_date,
        e.complete_date,
        e.grade,
        e.progress,
        t.teacher_id,
        u.full_name as instructor_name,
        f.faculty_name
      FROM ${this.tableName} e
      JOIN course c ON e.course_id = c.course_id
      LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
      LEFT JOIN user u ON t.user_id = u.user_id
      LEFT JOIN faculty f ON t.faculty_id = f.faculty_id
      WHERE e.student_id = ?
      ORDER BY e.start_date DESC
    `;

    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      student_id,
    ]);
    return results.map((row: any) => ({
      course_id: row.course_id,
      course_name: row.course_name,
      course_credit: row.course_credit,
      course_status: row.course_status,
      start_date: row.start_date,
      complete_date: row.complete_date,
      grade: row.grade,
      progress: row.progress,
      instructor_name: row.instructor_name || "Not Assigned",
      faculty_name: row.faculty_name || "Unknown",
    }));
  }

  // Get student's active courses (not completed)
  async getStudentActiveCourses(student_id: number): Promise<any[]> {
    const query = `
      SELECT 
        c.course_id,
        c.course_name,
        c.course_credit,
        e.start_date,
        e.grade,
        e.progress,
        u.full_name as instructor_name
      FROM ${this.tableName} e
      JOIN course c ON e.course_id = c.course_id
      LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
      LEFT JOIN user u ON t.user_id = u.user_id
      WHERE e.student_id = ? AND e.complete_date IS NULL AND c.course_status = 'active'
      ORDER BY e.start_date DESC
    `;

    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [
      student_id,
    ]);
    return results.map((row: any) => ({
      course_id: row.course_id,
      course_name: row.course_name,
      course_credit: row.course_credit,
      start_date: row.start_date,
      grade: row.grade,
      progress: row.progress || 0,
      instructor_name: row.instructor_name || "Not Assigned",
    }));
  }
}
