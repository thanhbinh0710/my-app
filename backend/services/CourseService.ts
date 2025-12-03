import { CourseRepository } from "../repositories/CourseRepository";
import {
  CreateCourseRequest,
  UpdateCourseRequest,
  Course,
} from "../models/Course";
import { DatabaseUtils } from "../utils/database";

export class CourseService {
  private courseRepository: CourseRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
  }

  /**
   * Get all courses with pagination
   */
  async getAllCourses(limit: number = 50, offset: number = 0) {
    try {
      // Use same query structure as getCoursesWithFilters to ensure consistency
      const query = `
        SELECT 
          c.course_id,
          c.course_name,
          c.course_group,
          c.course_credit,
          c.course_passing_grade,
          c.course_status,
          c.creation_date,
          c.teacher_id,
          COALESCE(u.full_name, CONCAT('Teacher ID: ', c.teacher_id)) AS teacher_name,
          f.faculty_name,
          COUNT(DISTINCT e.student_id) AS total_students
        FROM course c
        LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
        LEFT JOIN user u ON t.user_id = u.user_id
        LEFT JOIN faculty f ON t.faculty_id = f.faculty_id
        LEFT JOIN enroll e ON c.course_id = e.course_id
        GROUP BY c.course_id, c.course_name, c.course_group, c.course_credit, 
                 c.course_passing_grade, c.course_status, c.creation_date, 
                 c.teacher_id, u.full_name, f.faculty_name
        ORDER BY c.course_id
        LIMIT ? OFFSET ?
      `;

      const courses = await DatabaseUtils.executeQuery(query, [limit, offset]);

      // Get total count
      const countQuery = "SELECT COUNT(*) as total FROM course";
      const countResult = await DatabaseUtils.executeQuery(countQuery, []);
      const total = countResult[0]?.total || 0;

      return {
        courses,
        pagination: {
          limit,
          offset,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch courses");
    }
  }

  /**
   * Get course by ID
   */
  async getCourseById(id: string) {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  }

  /**
   * Get course with teacher info
   */
  async getCourseWithTeacher(id: string) {
    const course = await this.courseRepository.findWithTeacherInfo(id);
    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  }

  /**
   * Create course using direct SQL
   */
  async createCourse(data: {
    course_id: string;
    course_name: string;
    course_group?: string;
    course_credit: number;
    teacher_id: number;
    course_status?: string;
  }) {
    try {
      // Validate inputs
      if (!data.course_name || data.course_name.trim() === "") {
        throw new Error("Tên môn học không được để trống!");
      }

      if (data.course_credit <= 0) {
        throw new Error("Số tín chỉ phải lớn hơn 0!");
      }

      // Check for duplicate course ID
      const existingCourse = await this.courseRepository.findById(
        data.course_id
      );
      if (existingCourse) {
        throw new Error("Mã môn học đã tồn tại!");
      }

      // Check if teacher exists
      const teacherQuery =
        "SELECT COUNT(*) as count FROM teacher WHERE teacher_id = ?";
      const teacherResult = await DatabaseUtils.executeQuery(teacherQuery, [
        data.teacher_id,
      ]);
      if (teacherResult[0].count === 0) {
        throw new Error("Giáo viên không tồn tại!");
      }

      // Create course using repository
      const courseStatus = data.course_status || "active";

      // Insert course directly
      const insertQuery = `
        INSERT INTO course (course_id, course_name, course_group, course_credit, teacher_id, course_status)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      await DatabaseUtils.executeQuery(insertQuery, [
        data.course_id,
        data.course_name,
        data.course_group || null,
        data.course_credit,
        data.teacher_id,
        courseStatus,
      ]);

      // Fetch the created course
      const course = await this.courseRepository.findById(data.course_id);
      return course;
    } catch (error: any) {
      throw new Error(error.message || "Failed to create course");
    }
  }

  /**
   * Update course using direct SQL
   */
  async updateCourse(
    course_id: string,
    data: {
      course_name: string;
      course_credit: number;
      teacher_id: number;
      course_status?: string;
    }
  ) {
    try {
      // Check if course exists
      const existingCourse = await this.courseRepository.findById(course_id);
      if (!existingCourse) {
        throw new Error("Không tìm thấy môn học để cập nhật!");
      }

      // Validate inputs
      if (!data.course_name || data.course_name.trim() === "") {
        throw new Error("Tên môn học không được để trống!");
      }

      if (data.course_credit <= 0) {
        throw new Error("Số tín chỉ phải lớn hơn 0!");
      }

      // Check if teacher exists
      const teacherQuery =
        "SELECT COUNT(*) as count FROM teacher WHERE teacher_id = ?";
      const teacherResult = await DatabaseUtils.executeQuery(teacherQuery, [
        data.teacher_id,
      ]);
      if (teacherResult[0].count === 0) {
        throw new Error("Giáo viên không tồn tại!");
      }

      // Update course
      const updateQuery = `
        UPDATE course 
        SET course_name = ?, course_credit = ?, teacher_id = ?, course_status = ?
        WHERE course_id = ?
      `;

      await DatabaseUtils.executeQuery(updateQuery, [
        data.course_name,
        data.course_credit,
        data.teacher_id,
        data.course_status || "active",
        course_id,
      ]);

      // Fetch the updated course
      const course = await this.courseRepository.findById(course_id);
      return course;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update course");
    }
  }

  /**
   * Delete course using direct SQL (with enrollment check)
   */
  async deleteCourse(course_id: string) {
    try {
      // Check if course exists
      const existingCourse = await this.courseRepository.findById(course_id);
      if (!existingCourse) {
        throw new Error("Không tìm thấy môn học để xóa!");
      }

      // Check for enrollments
      const enrollmentQuery =
        "SELECT COUNT(*) as count FROM enroll WHERE course_id = ?";
      const enrollmentResult = await DatabaseUtils.executeQuery(
        enrollmentQuery,
        [course_id]
      );

      if (enrollmentResult[0].count > 0) {
        throw new Error("Không thể xóa môn học vì đã có sinh viên đăng ký!");
      }

      // Delete course
      const deleteQuery = "DELETE FROM course WHERE course_id = ?";
      await DatabaseUtils.executeQuery(deleteQuery, [course_id]);

      return { message: "Course deleted successfully" };
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete course");
    }
  }

  /**
   * Get students by course (using direct SQL)
   */
  async getStudentsByCourse(course_id: string) {
    try {
      if (!course_id || course_id.trim() === "") {
        throw new Error("Mã môn học không được để trống!");
      }

      const query = `
        SELECT 
          s.student_id, 
          u.full_name, 
          u.email, 
          e.progress, 
          e.grade, 
          e.start_date
        FROM enroll e
        JOIN student s ON e.student_id = s.student_id
        JOIN user u ON s.user_id = u.user_id
        WHERE e.course_id = ?
        ORDER BY u.full_name
      `;

      const students = await DatabaseUtils.executeQuery(query, [course_id]);
      return students;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch students list");
    }
  }

  /**
   * Get statistics of students by faculty (using direct SQL)
   */
  async getStatisticsByFaculty() {
    try {
      const query = `
        SELECT 
          f.faculty_name, 
          COUNT(DISTINCT s.student_id) AS TotalStudents
        FROM faculty f
        JOIN student s ON f.faculty_id = s.faculty_id
        JOIN enroll e ON s.student_id = e.student_id
        GROUP BY f.faculty_id, f.faculty_name
        HAVING COUNT(DISTINCT s.student_id) > 0
        ORDER BY TotalStudents DESC
      `;

      const stats = await DatabaseUtils.executeQuery(query, []);
      return stats;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch statistics");
    }
  }

  /**
   * Get student GPA (using function)
   */
  async getStudentGPA(student_id: number) {
    try {
      const query = "SELECT fn_GetStudentGPA(?) as gpa";
      const result = await DatabaseUtils.executeQuery(query, [student_id]);
      return result[0]?.gpa || 0;
    } catch (error: any) {
      throw new Error(error.message || "Failed to calculate GPA");
    }
  }

  /**
   * Search courses by name or teacher name
   */
  async searchCourses(searchTerm: string) {
    try {
      const query = `
        SELECT 
          c.*,
          COALESCE(u.full_name, CONCAT('Teacher ID: ', c.teacher_id)) AS teacher_name
        FROM course c
        LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
        LEFT JOIN user u ON t.user_id = u.user_id
        WHERE 
          c.course_name LIKE ? OR 
          COALESCE(u.full_name, '') LIKE ?
        ORDER BY c.course_name
      `;

      const searchPattern = `%${searchTerm}%`;
      const courses = await DatabaseUtils.executeQuery(query, [
        searchPattern,
        searchPattern,
      ]);

      return courses.map((row: any) => ({
        course_id: row.course_id,
        course_name: row.course_name,
        course_group: row.course_group,
        creation_date: row.creation_date,
        course_passing_grade: row.course_passing_grade,
        course_credit: row.course_credit,
        teacher_name: row.teacher_name,
        course_status: row.course_status,
        teacher_id: row.teacher_id,
      }));
    } catch (error: any) {
      throw new Error(error.message || "Failed to search courses");
    }
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
  async getCoursesByStatus(status: "active" | "inactive" | "archived") {
    const courses = await this.courseRepository.findByStatus(status);
    return courses;
  }

  /**
   * Get courses with filters (using direct SQL query)
   */
  async getCoursesWithFilters(
    course_group?: string | null,
    min_credit?: number | null,
    teacher_name?: string | null,
    sort_by?: string | null
  ) {
    try {
      // Build the SQL query with filters
      let query = `
        SELECT 
          c.course_id,
          c.course_name,
          c.course_group,
          c.course_credit,
          c.course_passing_grade,
          c.course_status,
          c.creation_date,
          c.teacher_id,
          COALESCE(u.full_name, CONCAT('Teacher ID: ', c.teacher_id)) AS teacher_name,
          f.faculty_name,
          COUNT(DISTINCT e.student_id) AS total_students
        FROM course c
        LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
        LEFT JOIN user u ON t.user_id = u.user_id
        LEFT JOIN faculty f ON t.faculty_id = f.faculty_id
        LEFT JOIN enroll e ON c.course_id = e.course_id
        WHERE 1=1
      `;

      const params: any[] = [];

      if (course_group) {
        query += " AND c.course_group = ?";
        params.push(course_group);
      }

      if (min_credit && min_credit > 0) {
        query += " AND c.course_credit >= ?";
        params.push(min_credit);
      }

      if (teacher_name) {
        query += " AND COALESCE(u.full_name, '') LIKE ?";
        params.push(`%${teacher_name}%`);
      }

      query += `
        GROUP BY c.course_id, c.course_name, c.course_group, c.course_credit, 
                 c.course_passing_grade, c.course_status, c.creation_date, 
                 c.teacher_id, u.full_name, f.faculty_name
      `;

      // Add sorting
      const sortBy = sort_by || "course_id";
      switch (sortBy) {
        case "course_name":
          query += " ORDER BY c.course_name";
          break;
        case "course_credit":
          query += " ORDER BY c.course_credit DESC";
          break;
        case "total_students":
          query += " ORDER BY total_students DESC";
          break;
        default:
          query += " ORDER BY c.course_id";
      }

      const results = await DatabaseUtils.executeQuery(query, params);
      return results;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch courses with filters");
    }
  }

  /**
   * Get course statistics by teacher (using direct SQL query)
   */
  async getCourseStatisticsByTeacher(
    faculty_id?: number | null,
    min_students?: number | null,
    min_courses?: number | null
  ) {
    try {
      let query = `
        SELECT 
          t.teacher_id,
          u.full_name AS teacher_name,
          u.email AS teacher_email,
          f.faculty_name,
          COUNT(DISTINCT c.course_id) AS total_courses,
          SUM(c.course_credit) AS total_credits,
          COUNT(DISTINCT e.student_id) AS total_students,
          AVG(e.grade) AS average_grade,
          MAX(c.creation_date) AS latest_course_date
        FROM teacher t
        INNER JOIN user u ON t.user_id = u.user_id
        INNER JOIN faculty f ON t.faculty_id = f.faculty_id
        INNER JOIN course c ON t.teacher_id = c.teacher_id
        LEFT JOIN enroll e ON c.course_id = e.course_id
        WHERE c.course_status = 'active'
      `;

      const params: any[] = [];

      if (faculty_id && faculty_id > 0) {
        query += " AND t.faculty_id = ?";
        params.push(faculty_id);
      }

      query += `
        GROUP BY t.teacher_id, u.full_name, u.email, f.faculty_name
      `;

      // Add HAVING clause for min_students and min_courses
      const havingConditions: string[] = [];

      if (min_students && min_students > 0) {
        havingConditions.push("COUNT(DISTINCT e.student_id) >= ?");
        params.push(min_students);
      }

      if (min_courses && min_courses > 0) {
        havingConditions.push("COUNT(DISTINCT c.course_id) >= ?");
        params.push(min_courses);
      }

      if (havingConditions.length > 0) {
        query += " HAVING " + havingConditions.join(" AND ");
      }

      query += " ORDER BY total_students DESC, total_courses DESC";

      const results = await DatabaseUtils.executeQuery(query, params);
      return results;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch teacher statistics");
    }
  }

  /**
   * Get course details with enrolled students (using direct SQL queries)
   */
  async getCourseDetailsWithStudents(course_id: string) {
    try {
      // Validate input
      if (!course_id || course_id.trim() === "") {
        throw new Error("Mã khóa học không được để trống!");
      }

      // Get course details
      const courseQuery = `
        SELECT 
          c.course_id,
          c.course_name,
          c.course_group,
          c.course_credit,
          c.course_passing_grade,
          c.course_status,
          c.creation_date,
          u.full_name AS teacher_name,
          u.email AS teacher_email,
          f.faculty_name,
          COUNT(DISTINCT e.student_id) AS total_enrolled,
          AVG(e.grade) AS average_grade,
          COUNT(DISTINCT s.section_id) AS total_sections
        FROM course c
        INNER JOIN teacher t ON c.teacher_id = t.teacher_id
        INNER JOIN user u ON t.user_id = u.user_id
        INNER JOIN faculty f ON t.faculty_id = f.faculty_id
        LEFT JOIN enroll e ON c.course_id = e.course_id
        LEFT JOIN section s ON c.course_id = s.course_id
        WHERE c.course_id = ?
        GROUP BY c.course_id, c.course_name, c.course_group, c.course_credit, 
                 c.course_passing_grade, c.course_status, c.creation_date, 
                 u.full_name, u.email, f.faculty_name
      `;

      // Get enrolled students
      const studentsQuery = `
        SELECT 
          st.student_id,
          u2.full_name AS student_name,
          u2.email AS student_email,
          r.roadmap_name,
          e.progress,
          e.grade,
          e.start_date
        FROM enroll e
        INNER JOIN student st ON e.student_id = st.student_id
        INNER JOIN user u2 ON st.user_id = u2.user_id
        LEFT JOIN roadmap r ON st.roadmap_id = r.roadmap_id
        WHERE e.course_id = ?
        ORDER BY u2.full_name
      `;

      // Execute both queries
      const [courseDetails, students] = await Promise.all([
        DatabaseUtils.executeQuery(courseQuery, [course_id]),
        DatabaseUtils.executeQuery(studentsQuery, [course_id]),
      ]);

      return {
        courseDetails: courseDetails[0] || null,
        students: students || [],
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch course details");
    }
  }

  /**
   * Calculate completed credits for a student in a roadmap (using fn_CalculateCompletedCredits)
   */
  async calculateCompletedCredits(student_id: number, roadmap_id: number) {
    try {
      const query =
        "SELECT fn_CalculateCompletedCredits(?, ?) as completed_credits";
      const result = await DatabaseUtils.executeQuery(query, [
        student_id,
        roadmap_id,
      ]);
      return result[0]?.completed_credits || 0;
    } catch (error: any) {
      throw new Error(error.message || "Failed to calculate completed credits");
    }
  }

  /**
   * Calculate roadmap progress for a student (using fn_CalculateRoadmapProgress)
   */
  async calculateRoadmapProgress(student_id: number) {
    try {
      const query = "SELECT fn_CalculateRoadmapProgress(?) as progress";
      const result = await DatabaseUtils.executeQuery(query, [student_id]);
      return result[0]?.progress || 0;
    } catch (error: any) {
      throw new Error(error.message || "Failed to calculate roadmap progress");
    }
  }
}
