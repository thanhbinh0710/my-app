import { EnrollmentRepository } from '../repositories/EnrollmentRepository';
import { CreateEnrollRequest, UpdateEnrollRequest, Enroll } from '../models/Enrollment';

export class EnrollmentService {
  private enrollmentRepository: EnrollmentRepository;

  constructor() {
    this.enrollmentRepository = new EnrollmentRepository();
  }

  /**
   * Get all enrollments with pagination
   */
  async getAllEnrollments(limit: number = 50, offset: number = 0) {
    const enrollments = await this.enrollmentRepository.findAll(limit, offset);
    const total = await this.enrollmentRepository.count();

    return {
      enrollments,
      pagination: {
        limit,
        offset,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get enrollments by course
   */
  async getEnrollmentsByCourse(course_id: string, limit: number = 50, offset: number = 0) {
    const enrollments = await this.enrollmentRepository.findByCourseId(course_id, limit, offset);
    const total = await this.enrollmentRepository.countByCourse(course_id);

    return {
      enrollments,
      pagination: {
        limit,
        offset,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get enrollments by student
   */
  async getEnrollmentsByStudent(student_id: number, limit: number = 50, offset: number = 0) {
    const enrollments = await this.enrollmentRepository.findByStudentId(student_id, limit, offset);
    const total = await this.enrollmentRepository.countByStudent(student_id);

    return {
      enrollments,
      pagination: {
        limit,
        offset,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get enrollments by progress status
   */
  async getEnrollmentsByProgress(progress: string, limit: number = 50, offset: number = 0) {
    const enrollments = await this.enrollmentRepository.findByProgress(progress, limit, offset);
    const total = await this.enrollmentRepository.count();

    return {
      enrollments,
      pagination: {
        limit,
        offset,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get specific enrollment
   */
  async getEnrollment(course_id: string, student_id: number) {
    const enrollment = await this.enrollmentRepository.findOne(course_id, student_id);
    if (!enrollment) {
      throw new Error('Enrollment not found');
    }
    return enrollment;
  }

  /**
   * Create new enrollment
   */
  async createEnrollment(data: CreateEnrollRequest) {
    try {
      // Check if enrollment already exists
      const existing = await this.enrollmentRepository.findOne(data.course_id, data.student_id);
      if (existing) {
        throw new Error('Student is already enrolled in this course');
      }

      return await this.enrollmentRepository.create(data);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create enrollment');
    }
  }

  /**
   * Update enrollment (grade, progress, etc.)
   */
  async updateEnrollment(course_id: string, student_id: number, data: UpdateEnrollRequest) {
    try {
      return await this.enrollmentRepository.update(course_id, student_id, data);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update enrollment');
    }
  }

  /**
   * Delete enrollment (drop course)
   */
  async deleteEnrollment(course_id: string, student_id: number) {
    try {
      await this.enrollmentRepository.delete(course_id, student_id);
      return { message: 'Enrollment deleted successfully' };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete enrollment');
    }
  }
}
