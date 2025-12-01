import { RowDataPacket } from 'mysql2/promise';
import { BaseRepository } from './BaseRepository';
import { Roadmap, CreateRoadmapRequest, UpdateRoadmapRequest } from '../models/Roadmap';
import { DatabaseUtils } from '../utils/database';

export class RoadmapRepository extends BaseRepository<Roadmap, CreateRoadmapRequest, UpdateRoadmapRequest> {
  constructor() {
    super('roadmap');
  }

  async create(data: CreateRoadmapRequest): Promise<Roadmap> {
    const query = `
      INSERT INTO ${this.tableName} (roadmap_name, description, total_course, total_credit)
      VALUES (?, ?, ?, ?)
    `;
    
    await DatabaseUtils.executeQuery(query, [
      data.roadmap_name,
      data.description,
      data.total_course || 0,
      data.total_credit || 0
    ]);

    const insertId = await DatabaseUtils.getLastInsertId();
    const newRoadmap = await this.findById(insertId);
    
    if (!newRoadmap) {
      throw new Error('Failed to create roadmap');
    }

    return newRoadmap;
  }

  protected mapRowToEntity(row: RowDataPacket): Roadmap {
    return {
      roadmap_id: row.roadmap_id,
      roadmap_name: row.roadmap_name,
      description: row.description,
      total_course: row.total_course || 0,
      total_credit: row.total_credit || 0
    };
  }

  async searchByName(name: string): Promise<Roadmap[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE roadmap_name LIKE ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [`%${name}%`]);
    return results.map((row: any) => this.mapRowToEntity(row));
  }

  async findWithCourses(roadmap_id: number) {
    const query = `
      SELECT 
        r.*,
        c.course_id, c.course_name, c.course_credit,
        con.order as course_order
      FROM roadmap r
      LEFT JOIN contain con ON r.roadmap_id = con.roadmap_id
      LEFT JOIN course c ON con.course_id = c.course_id
      WHERE r.roadmap_id = ?
      ORDER BY con.order ASC
    `;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [roadmap_id]);
    return results as any[];
  }

  // Override findById to use roadmap_id
  async findById(id: number): Promise<Roadmap | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE roadmap_id = ?`;
    const results = await DatabaseUtils.executeQuery<RowDataPacket[]>(query, [id]);
    return results.length > 0 ? this.mapRowToEntity(results[0] as any) : null;
  }

  async update(id: number, data: UpdateRoadmapRequest): Promise<Roadmap> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.roadmap_name !== undefined) {
      fields.push('roadmap_name = ?');
      values.push(data.roadmap_name);
    }
    if (data.description !== undefined) {
      fields.push('description = ?');
      values.push(data.description);
    }
    if (data.total_course !== undefined) {
      fields.push('total_course = ?');
      values.push(data.total_course);
    }
    if (data.total_credit !== undefined) {
      fields.push('total_credit = ?');
      values.push(data.total_credit);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const query = `UPDATE ${this.tableName} SET ${fields.join(', ')} WHERE roadmap_id = ?`;
    await DatabaseUtils.executeQuery(query, values);

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Failed to retrieve updated roadmap');
    }

    return updated;
  }

  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE roadmap_id = ?`;
    await DatabaseUtils.executeQuery(query, [id]);
    return true;
  }
}
