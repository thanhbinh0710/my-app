import { CourseRepository } from '../repositories/CourseRepository';
import { CreateCourseRequest, UpdateCourseRequest, Course } from '../models/Course';
import { DatabaseUtils } from '../utils/database';

export class CourseService {
  private courseRepository: CourseRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
  }

  /**
   * Get all courses with pagination
   */
  async getAllCourses(limit: number = 50, offset: number = 0) {
    const courses = await this.courseRepository.findAll(limit, offset);
    const total = await this.courseRepository.count();

    return {
      courses,
      pagination: {
        limit,
        offset,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get course by ID
   */
  async getCourseById(id: string) {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }

  /**
   * Get course with teacher info
   */
  async getCourseWithTeacher(id: string) {
    const course = await this.courseRepository.findWithTeacherInfo(id);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }

  /**
   * Create course using stored procedure
   */
  async createCourse(data: {
    course_id: string;
    course_name: string;
    course_group?: string;
    course_credit: number;
    teacher_id: number;
  }) {
    try {
      // Call stored procedure sp_InsertCourse
      await DatabaseUtils.callProcedure('sp_InsertCourse', [
        data.course_id,
        data.course_name,
        data.course_group || null,
        data.course_credit,
        data.teacher_id
      ]);

      // Fetch the created course
      const course = await this.courseRepository.findById(data.course_id);
      return course;
    } catch (error: any) {
      // MySQL error messages are in Vietnamese from stored procedure
      throw new Error(error.message || 'Failed to create course');
    }
  }

  /**
   * Update course using stored procedure
   */
  async updateCourse(
    course_id: string,
    data: {
      course_name: string;
      course_credit: number;
      teacher_id: number;
    }
  ) {
    try {
      // Call stored procedure sp_UpdateCourse
      await DatabaseUtils.callProcedure('sp_UpdateCourse', [
        course_id,
        data.course_name,
        data.course_credit,
        data.teacher_id
      ]);

      // Fetch the updated course
      const course = await this.courseRepository.findById(course_id);
      return course;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update course');
    }
  }

  /**
   * Delete course using stored procedure
   */
  async deleteCourse(course_id: string) {
    try {
      // Call stored procedure sp_DeleteCourse
      await DatabaseUtils.callProcedure('sp_DeleteCourse', [course_id]);
      return { message: 'Course deleted successfully' };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete course');
    }
  }

  /**
   * Get students by course (using stored procedure)
   */
  async getStudentsByCourse(course_id: string) {
    try {
      const students = await DatabaseUtils.callProcedure('sp_GetStudentsByCourse', [course_id]);
      return students;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch students list');
    }
  }

  /**
   * Get statistics of students by faculty (using stored procedure)
   */
  async getStatisticsByFaculty() {
    try {
      const stats = await DatabaseUtils.callProcedure('sp_Statistic_Students_By_Faculty', []);
      return stats;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch statistics');
    }
  }

  /**
   * Get student GPA (using function)
   */
  async getStudentGPA(student_id: number) {
    try {
      const query = 'SELECT fn_GetStudentGPA(?) as gpa';
      const result = await DatabaseUtils.executeQuery(query, [student_id]);
      return result[0]?.gpa || 0;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to calculate GPA');
    }
  }

  /**
   * Search courses by name
   */
  async searchCourses(searchTerm: string) {
    const courses = await this.courseRepository.searchByName(searchTerm);
    return courses;
  }

  /**
   * Get courses by teacher
   */
  async getCoursesByTeacher(teacher_id: number) {
    const courses = await this.courseRepository.findByTeacher(teacher_id);
    return courses;
  }

  /**
   * Get courses by status
   */
  async getCoursesByStatus(status: 'active' | 'inactive' | 'archived') {
    const courses = await this.courseRepository.findByStatus(status);
    return courses;
  }
}
