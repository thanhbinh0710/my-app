import { StudentCourseService } from "../services/StudentCourseService";

export class StudentCourseController {
  private studentCourseService: StudentCourseService;

  constructor() {
    this.studentCourseService = new StudentCourseService();
  }

  /**
   * Get all courses for a student
   */
  async getStudentCourses(student_id: number) {
    try {
      const result = await this.studentCourseService.getStudentCourses(
        student_id
      );
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Get student courses error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get student courses",
      };
    }
  }

  /**
   * Get active courses for a student
   */
  async getStudentActiveCourses(student_id: number) {
    try {
      const result = await this.studentCourseService.getStudentActiveCourses(
        student_id
      );
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Get student active courses error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get student active courses",
      };
    }
  }

  /**
   * Get student course statistics
   */
  async getStudentCourseStats(student_id: number) {
    try {
      const result = await this.studentCourseService.getStudentCourseStats(
        student_id
      );
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Get student course stats error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get student course statistics",
      };
    }
  }
}
