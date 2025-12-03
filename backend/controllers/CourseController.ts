import { CourseService } from '../services/CourseService';

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  /**
   * Get all courses with pagination
   */
  async getCourses(limit: number = 50, offset: number = 0) {
    try {
      const result = await this.courseService.getAllCourses(limit, offset);
      return {
        success: true,
        data: result.courses,
        pagination: result.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch courses'
      };
    }
  }

  /**
   * Get course by ID
   */
  async getCourseById(id: string) {
    try {
      const course = await this.courseService.getCourseById(id);
      return {
        success: true,
        data: course
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Course not found'
      };
    }
  }

  /**
   * Get course with teacher info
   */
  async getCourseWithTeacher(id: string) {
    try {
      const course = await this.courseService.getCourseWithTeacher(id);
      return {
        success: true,
        data: course
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không tìm thấy môn học'
      };
    }
  }

  /**
   * Create new course
   */
  async createCourse(data: {
    course_id: string;
    course_name: string;
    course_group?: string;
    course_credit: number;
    teacher_id: number;
  }) {
    try {
      const course = await this.courseService.createCourse(data);
      return {
        success: true,
        data: course,
        message: 'Tạo môn học thành công'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể tạo môn học'
      };
    }
  }

  /**
   * Update course
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
      const course = await this.courseService.updateCourse(course_id, data);
      return {
        success: true,
        data: course,
        message: 'Cập nhật môn học thành công'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể cập nhật môn học'
      };
    }
  }

  /**
   * Delete course
   */
  async deleteCourse(course_id: string) {
    try {
      const result = await this.courseService.deleteCourse(course_id);
      return {
        success: true,
        message: result.message
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể xóa môn học'
      };
    }
  }

  /**
   * Get students by course
   */
  async getStudentsByCourse(course_id: string) {
    try {
      const students = await this.courseService.getStudentsByCourse(course_id);
      return {
        success: true,
        data: students
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể lấy danh sách sinh viên'
      };
    }
  }

  /**
   * Get statistics by faculty
   */
  async getStatisticsByFaculty() {
    try {
      const stats = await this.courseService.getStatisticsByFaculty();
      return {
        success: true,
        data: stats
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể lấy thống kê'
      };
    }
  }

  /**
   * Get student GPA
   */
  async getStudentGPA(student_id: number) {
    try {
      const gpa = await this.courseService.getStudentGPA(student_id);
      return {
        success: true,
        data: { student_id, gpa }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể tính GPA'
      };
    }
  }

  /**
   * Search courses
   */
  async searchCourses(searchTerm: string) {
    try {
      const courses = await this.courseService.searchCourses(searchTerm);
      return {
        success: true,
        data: courses
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search courses'
      };
    }
  }

  /**
   * Get courses by teacher
   */
  async getCoursesByTeacher(teacher_id: number) {
    try {
      const courses = await this.courseService.getCoursesByTeacher(teacher_id);
      return {
        success: true,
        data: courses
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch courses'
      };
    }
  }

  /**
   * Get courses by status
   */
  async getCoursesByStatus(status: 'active' | 'inactive' | 'archived') {
    try {
      const courses = await this.courseService.getCoursesByStatus(status);
      return {
        success: true,
        data: courses
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch courses'
      };
    }
  }

  /**
   * Get courses with filters
   */
  async getCoursesWithFilters(
    course_group?: string | null,
    min_credit?: number | null,
    teacher_name?: string | null,
    sort_by?: string | null
  ) {
    try {
      const courses = await this.courseService.getCoursesWithFilters(
        course_group,
        min_credit,
        teacher_name,
        sort_by
      );
      return {
        success: true,
        data: courses
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể lấy danh sách môn học'
      };
    }
  }

  /**
   * Get course statistics by teacher
   */
  async getCourseStatisticsByTeacher(
    faculty_id?: number | null,
    min_students?: number | null,
    min_courses?: number | null
  ) {
    try {
      const stats = await this.courseService.getCourseStatisticsByTeacher(
        faculty_id,
        min_students,
        min_courses
      );
      return {
        success: true,
        data: stats
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể lấy thống kê giảng viên'
      };
    }
  }

  /**
   * Get course details with students
   */
  async getCourseDetailsWithStudents(course_id: string) {
    try {
      const details = await this.courseService.getCourseDetailsWithStudents(course_id);
      return {
        success: true,
        data: details
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể lấy chi tiết môn học'
      };
    }
  }

  /**
   * Calculate completed credits
   */
  async calculateCompletedCredits(student_id: number, roadmap_id: number) {
    try {
      const credits = await this.courseService.calculateCompletedCredits(student_id, roadmap_id);
      return {
        success: true,
        data: { student_id, roadmap_id, completed_credits: credits }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể tính số tín chỉ hoàn thành'
      };
    }
  }

  /**
   * Calculate roadmap progress
   */
  async calculateRoadmapProgress(student_id: number) {
    try {
      const progress = await this.courseService.calculateRoadmapProgress(student_id);
      return {
        success: true,
        data: { student_id, progress }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể tính tiến độ roadmap'
      };
    }
  }
}
