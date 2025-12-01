import { EnrollmentService } from '../services/EnrollmentService';

export class EnrollmentController {
  private enrollmentService: EnrollmentService;

  constructor() {
    this.enrollmentService = new EnrollmentService();
  }

  /**
   * Get all enrollments with pagination
   */
  async getEnrollments(limit: number = 50, offset: number = 0) {
    try {
      const result = await this.enrollmentService.getAllEnrollments(limit, offset);
      return {
        success: true,
        data: result.enrollments,
        pagination: result.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch enrollments'
      };
    }
  }

  /**
   * Get enrollments by course
   */
  async getEnrollmentsByCourse(course_id: string, limit: number = 50, offset: number = 0) {
    try {
      const result = await this.enrollmentService.getEnrollmentsByCourse(course_id, limit, offset);
      return {
        success: true,
        data: result.enrollments,
        pagination: result.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch enrollments'
      };
    }
  }

  /**
   * Get enrollments by student
   */
  async getEnrollmentsByStudent(student_id: number, limit: number = 50, offset: number = 0) {
    try {
      const result = await this.enrollmentService.getEnrollmentsByStudent(student_id, limit, offset);
      return {
        success: true,
        data: result.enrollments,
        pagination: result.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch enrollments'
      };
    }
  }

  /**
   * Get enrollments by progress
   */
  async getEnrollmentsByProgress(progress: string, limit: number = 50, offset: number = 0) {
    try {
      const result = await this.enrollmentService.getEnrollmentsByProgress(progress, limit, offset);
      return {
        success: true,
        data: result.enrollments,
        pagination: result.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch enrollments'
      };
    }
  }

  /**
   * Get specific enrollment
   */
  async getEnrollment(course_id: string, student_id: number) {
    try {
      const enrollment = await this.enrollmentService.getEnrollment(course_id, student_id);
      return {
        success: true,
        data: enrollment
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Enrollment not found'
      };
    }
  }

  /**
   * Create new enrollment
   */
  async createEnrollment(data: any) {
    try {
      const enrollment = await this.enrollmentService.createEnrollment(data);
      return {
        success: true,
        data: enrollment,
        message: 'Enrollment created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create enrollment'
      };
    }
  }

  /**
   * Update enrollment
   */
  async updateEnrollment(course_id: string, student_id: number, data: any) {
    try {
      const enrollment = await this.enrollmentService.updateEnrollment(course_id, student_id, data);
      return {
        success: true,
        data: enrollment,
        message: 'Enrollment updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update enrollment'
      };
    }
  }

  /**
   * Delete enrollment
   */
  async deleteEnrollment(course_id: string, student_id: number) {
    try {
      const result = await this.enrollmentService.deleteEnrollment(course_id, student_id);
      return {
        success: true,
        message: result.message
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete enrollment'
      };
    }
  }
}
