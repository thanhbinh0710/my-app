import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { BaseRepository } from './BaseRepository';
import { User, CreateUserRequest, UpdateUserRequest } from '../models/User';
import { DatabaseUtils } from '../utils/database';
import bcrypt from 'bcryptjs';

export class UserRepository extends BaseRepository<User, CreateUserRequest, UpdateUserRequest> {
  constructor() {
    super('user');
  }

  protected mapRowToEntity(row: RowDataPacket): User {
    return {
      id: row.id,
      email: row.email,
      role: row.role as 'student' | 'teacher' | 'admin',
      username: row.username,
      password: row.password,
      full_name: row.full_name
    };
  }

  async create(data: CreateUserRequest): Promise<User> {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const query = `
      INSERT INTO ${this.tableName} (email, role, username, password, full_name) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    await DatabaseUtils.executeQuery(query, [
      data.email,
      data.role,
      data.username,
      hashedPassword,
      data.full_name
    ]);
    
    const insertId = await DatabaseUtils.getLastInsertId();
    const newUser = await this.findById(insertId);
    
    if (!newUser) {
      throw new Error('Failed to create user');
    }
    
    return newUser;
  }

  async update(id: number, data: UpdateUserRequest): Promise<User | null> {
    const updates: string[] = [];
    const values: any[] = [];
    
    if (data.email !== undefined) {
      updates.push('email = ?');
      values.push(data.email);
    }
    
    if (data.username !== undefined) {
      updates.push('username = ?');
      values.push(data.username);
    }
    
    if (data.full_name !== undefined) {
      updates.push('full_name = ?');
      values.push(data.full_name);
    }
    
    if (updates.length === 0) {
      return this.findById(id);
    }
    
    values.push(id);
    const query = `UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = ?`;
    
    await DatabaseUtils.executeQuery(query, values);
    return this.findById(id);
  }

  // Additional user-specific methods
  async findByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE email = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [email]);
    
    if (rows.length === 0) return null;
    return this.mapRowToEntity(rows[0]);
  }

  async findByUsername(username: string): Promise<User | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE username = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [username]);
    
    if (rows.length === 0) return null;
    return this.mapRowToEntity(rows[0]);
  }

  async verifyPassword(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async updatePassword(id: number, newPassword: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = `UPDATE ${this.tableName} SET password = ? WHERE id = ?`;
    
    const result = await DatabaseUtils.executeQuery<ResultSetHeader>(query, [hashedPassword, id]);
    return (result as any).affectedRows > 0;
  }

  async findByRole(role: 'student' | 'teacher' | 'admin'): Promise<User[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE role = ?`;
    const rows = await DatabaseUtils.executeQuery<RowDataPacket>(query, [role]);
    
    return rows.map((row: RowDataPacket) => this.mapRowToEntity(row));
  }
}