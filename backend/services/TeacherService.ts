import { TeacherRepository } from '../repositories/TeacherRepository';
import { CreateTeacherRequest, UpdateTeacherRequest, Teacher } from '../models/Teacher';

export class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor() {
    this.teacherRepository = new TeacherRepository();
  }

  /**
   * Get all teachers with pagination
   */
  async getAllTeachers(limit: number = 50, offset: number = 0) {
    const teachers = await this.teacherRepository.findAll(limit, offset);
    const total = await this.teacherRepository.count();

    return {
      teachers,
      pagination: {
        limit,
        offset,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get teacher by user ID
   */
  async getTeacherById(user_id: number) {
    const teacher = await this.teacherRepository.findById(user_id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    return teacher;
  }

  /**
   * Get teacher by teacher ID
   */
  async getTeacherByTeacherId(teacher_id: string) {
    const teacher = await this.teacherRepository.findByTeacherId(teacher_id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    return teacher;
  }

  /**
   * Get teacher with user and faculty info
   */
  async getTeacherWithInfo(user_id: number) {
    const teacher = await this.teacherRepository.findWithUserInfo(user_id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    return teacher;
  }

  /**
   * Get teachers by faculty
   */
  async getTeachersByFaculty(faculty_id: number, limit: number = 50, offset: number = 0) {
    const teachers = await this.teacherRepository.findByFacultyId(faculty_id, limit, offset);
    const total = await this.teacherRepository.countByFaculty(faculty_id);

    return {
      teachers,
      pagination: {
        limit,
        offset,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Create new teacher
   */
  async createTeacher(data: CreateTeacherRequest) {
    try {
      return await this.teacherRepository.create(data);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create teacher');
    }
  }

  /**
   * Update teacher
   */
  async updateTeacher(user_id: number, data: UpdateTeacherRequest) {
    try {
      return await this.teacherRepository.update(user_id, data);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update teacher');
    }
  }

  /**
   * Delete teacher
   */
  async deleteTeacher(user_id: number) {
    try {
      await this.teacherRepository.delete(user_id);
      return { message: 'Teacher deleted successfully' };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete teacher');
    }
  }
}
