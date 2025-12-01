import { TeacherService } from '../services/TeacherService';

export class TeacherController {
  private teacherService: TeacherService;

  constructor() {
    this.teacherService = new TeacherService();
  }

  /**
   * Get all teachers with pagination
   */
  async getTeachers(limit: number = 50, offset: number = 0) {
    try {
      const result = await this.teacherService.getAllTeachers(limit, offset);
      return {
        success: true,
        data: result.teachers,
        pagination: result.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch teachers'
      };
    }
  }

  /**
   * Get teacher by user ID
   */
  async getTeacherById(user_id: number) {
    try {
      const teacher = await this.teacherService.getTeacherById(user_id);
      return {
        success: true,
        data: teacher
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Teacher not found'
      };
    }
  }

  /**
   * Get teacher by teacher ID
   */
  async getTeacherByTeacherId(teacher_id: string) {
    try {
      const teacher = await this.teacherService.getTeacherByTeacherId(teacher_id);
      return {
        success: true,
        data: teacher
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Teacher not found'
      };
    }
  }

  /**
   * Get teacher with full info
   */
  async getTeacherWithInfo(user_id: number) {
    try {
      const teacher = await this.teacherService.getTeacherWithInfo(user_id);
      return {
        success: true,
        data: teacher
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Teacher not found'
      };
    }
  }

  /**
   * Get teachers by faculty
   */
  async getTeachersByFaculty(faculty_id: number, limit: number = 50, offset: number = 0) {
    try {
      const result = await this.teacherService.getTeachersByFaculty(faculty_id, limit, offset);
      return {
        success: true,
        data: result.teachers,
        pagination: result.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch teachers'
      };
    }
  }

  /**
   * Create new teacher
   */
  async createTeacher(data: any) {
    try {
      const teacher = await this.teacherService.createTeacher(data);
      return {
        success: true,
        data: teacher,
        message: 'Teacher created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create teacher'
      };
    }
  }

  /**
   * Update teacher
   */
  async updateTeacher(user_id: number, data: any) {
    try {
      const teacher = await this.teacherService.updateTeacher(user_id, data);
      return {
        success: true,
        data: teacher,
        message: 'Teacher updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update teacher'
      };
    }
  }

  /**
   * Delete teacher
   */
  async deleteTeacher(user_id: number) {
    try {
      const result = await this.teacherService.deleteTeacher(user_id);
      return {
        success: true,
        message: result.message
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete teacher'
      };
    }
  }
}
