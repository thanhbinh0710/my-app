import { EnrollmentRepository } from "../repositories/EnrollmentRepository";
import { StudentRepository } from "../repositories/StudentRepository";

export class StudentCourseService {
  private enrollmentRepository: EnrollmentRepository;
  private studentRepository: StudentRepository;

  constructor() {
    this.enrollmentRepository = new EnrollmentRepository();
    this.studentRepository = new StudentRepository();
  }

  /**
   * Get all courses for a student with detailed information
   */
  async getStudentCourses(student_id: number) {
    try {
      // Verify student exists - treat student_id as user_id
      const student = await this.studentRepository.findById(student_id);
      if (!student) {
        throw new Error("Student not found");
      }

      const courses =
        await this.enrollmentRepository.getStudentCoursesByUserId(
          student_id
        );

      return {
        student_id,
        student_name: student.user?.full_name || "Unknown",
        total_courses: courses.length,
        courses: courses.map((course) => ({
          course_id: course.course_id,
          course_name: course.course_name,
          instructor: course.instructor_name,
          credits: course.course_credit,
          status: course.course_status,
          progress: course.progress || 0,
          grade: course.grade,
          start_date: course.start_date,
          complete_date: course.complete_date,
          faculty: course.faculty_name,
        })),
      };
    } catch (error) {
      console.error("Error getting student courses:", error);
      throw error;
    }
  }

  /**
   * Get active (ongoing) courses for a student
   */
  async getStudentActiveCourses(student_id: number) {
    try {
      // Verify student exists - treat student_id as user_id
      const student = await this.studentRepository.findById(student_id);
      if (!student) {
        throw new Error("Student not found");
      }

      const courses = await this.enrollmentRepository.getStudentActiveCoursesbyUserId(
        student_id
      );

      return {
        student_id,
        student_name: student.user?.full_name || "Unknown",
        active_courses: courses.length,
        courses: courses.map((course) => ({
          id: course.course_id,
          name: course.course_name,
          code: course.course_id,
          instructor: course.instructor_name,
          credits: course.course_credit,
          progress: course.progress || 0,
          grade: course.grade,
          start_date: course.start_date,
          // Calculate some mock data for better UX
          totalLessons: Math.floor(course.course_credit * 15), // Estimate lessons based on credits
          completedLessons: Math.floor(
            ((course.progress || 0) * course.course_credit * 15) / 100
          ),
          nextLesson: this.getNextLesson(course.progress || 0),
        })),
      };
    } catch (error) {
      console.error("Error getting student active courses:", error);
      throw error;
    }
  }

  /**
   * Get student course statistics
   */
  async getStudentCourseStats(student_id: number) {
    try {
      const allCourses =
        await this.enrollmentRepository.getStudentCoursesByUserId(
          student_id
        );
      const activeCourses =
        await this.enrollmentRepository.getStudentActiveCoursesbyUserId(student_id);

      const completedCourses = allCourses.filter(
        (course) => course.complete_date !== null
      );
      const totalCredits = allCourses.reduce(
        (sum, course) => sum + (course.course_credit || 0),
        0
      );
      const completedCredits = completedCourses.reduce(
        (sum, course) => sum + (course.course_credit || 0),
        0
      );

      const grades = completedCourses
        .filter((course) => course.grade !== null)
        .map((course) => course.grade);

      const gpa =
        grades.length > 0
          ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length
          : 0;

      return {
        student_id,
        total_courses: allCourses.length,
        active_courses: activeCourses.length,
        completed_courses: completedCourses.length,
        total_credits: totalCredits,
        completed_credits: completedCredits,
        gpa: Math.round(gpa * 100) / 100,
        completion_rate:
          allCourses.length > 0
            ? Math.round((completedCourses.length / allCourses.length) * 100)
            : 0,
      };
    } catch (error) {
      console.error("Error getting student course stats:", error);
      throw error;
    }
  }

  /**
   * Helper method to generate next lesson based on progress
   */
  private getNextLesson(progress: number): string {
    if (progress < 20) return "Introduction & Basics";
    if (progress < 40) return "Core Concepts";
    if (progress < 60) return "Advanced Topics";
    if (progress < 80) return "Practical Applications";
    if (progress < 95) return "Final Project";
    return "Course Review";
  }
}
