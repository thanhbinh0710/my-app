import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { DatabaseUtils } from '../utils/database';

// Base repository interface for common CRUD operations
export interface IRepository<T, CreateRequest, UpdateRequest> {
  findById(id: number): Promise<T | null>;
  findAll(limit?: number, offset?: number): Promise<T[]>;
  create(data: CreateRequest): Promise<T>;
  update(id: number, data: UpdateRequest): Promise<T | null>;
  delete(id: number): Promise<boolean>;
  count(): Promise<number>;
}

// Base repository implementation with common methods
export abstract class BaseRepository<T, CreateRequest, UpdateRequest> implements IRepository<T, CreateRequest, UpdateRequest> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findById(id: number): Promise<T | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [id]);
    
    if (rows.length === 0) return null;
    return this.mapRowToEntity(rows[0]);
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName} LIMIT ? OFFSET ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [limit, offset]);
    
    return rows.map((row: RowDataPacket) => this.mapRowToEntity(row));
  }

  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await DatabaseUtils.executeQuery<ResultSetHeader>(query, [id]);
    
    return (result as any).affectedRows > 0;
  }

  async count(): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM ${this.tableName}`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, []);
    
    return rows[0].count;
  }

  // Abstract methods that must be implemented by child classes
  abstract create(data: CreateRequest): Promise<T>;
  abstract update(id: number, data: UpdateRequest): Promise<T | null>;
  protected abstract mapRowToEntity(row: RowDataPacket): T;
}