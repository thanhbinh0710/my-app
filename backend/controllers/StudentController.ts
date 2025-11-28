import { StudentRepository } from '../repositories/StudentRepository';
import { UserRepository } from '../repositories/UserRepository';
import { CreateStudentRequest, UpdateStudentRequest } from '../models';

export class StudentController {
  private studentRepository: StudentRepository;
  private userRepository: UserRepository;

  constructor() {
    this.studentRepository = new StudentRepository();
    this.userRepository = new UserRepository();
  }

  // Get all students with user information
  async getStudents(limit: number = 50, offset: number = 0) {
    try {
      const students = await this.studentRepository.findAllWithUserInfo(limit, offset);
      const total = await this.studentRepository.count();
      
      return {
        success: true,
        data: students,
        pagination: {
          limit,
          offset,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Get student by user_id with user information
  async getStudentByUserId(user_id: number) {
    try {
      const student = await this.studentRepository.findWithUserInfo(user_id);
      
      if (!student) {
        return {
          success: false,
          error: 'Student not found'
        };
      }

      return {
        success: true,
        data: student
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Get student by student ID
  async getStudentByStudentId(student_id: string) {
    try {
      const student = await this.studentRepository.findByStudentId(student_id);
      
      if (!student) {
        return {
          success: false,
          error: 'Student not found'
        };
      }

      return {
        success: true,
        data: student
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Update student information
  async updateStudent(user_id: number, studentData: UpdateStudentRequest) {
    try {
      // Check if student exists
      const existingStudent = await this.studentRepository.findByUserId(user_id);
      if (!existingStudent) {
        return {
          success: false,
          error: 'Student not found'
        };
      }

      // If updating student_id, check for duplicates
      if (studentData.student_id) {
        const existingId = await this.studentRepository.findByStudentId(studentData.student_id);
        if (existingId && existingId.user_id !== user_id) {
          return {
            success: false,
            error: 'Student ID already exists'
          };
        }
      }

      const updatedStudent = await this.studentRepository.updateByUserId(user_id, studentData);
      
      if (!updatedStudent) {
        return {
          success: false,
          error: 'Failed to update student'
        };
      }

      // Get updated student with user info
      const studentWithUser = await this.studentRepository.findWithUserInfo(user_id);

      return {
        success: true,
        data: studentWithUser,
        message: 'Student updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update student'
      };
    }
  }

  // Get students by faculty
  async getStudentsByFaculty(faculty_id: number) {
    try {
      const students = await this.studentRepository.findByFaculty(faculty_id);
      
      return {
        success: true,
        data: students
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch students'
      };
    }
  }

  // Get students by year
  async getStudentsByYear(year: number) {
    try {
      const students = await this.studentRepository.findByYear(year);
      
      return {
        success: true,
        data: students
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch students'
      };
    }
  }

  // Update student academic progress
  async updateAcademicProgress(
    user_id: number, 
    progress: {
      total_credit_earn?: number;
      total_course_register?: number;
      total_course_complete?: number;
    }
  ) {
    try {
      // Validate that completed courses don't exceed registered courses
      if (progress.total_course_complete !== undefined && progress.total_course_register !== undefined) {
        if (progress.total_course_complete > progress.total_course_register) {
          return {
            success: false,
            error: 'Completed courses cannot exceed registered courses'
          };
        }
      }

      const updatedStudent = await this.studentRepository.updateByUserId(user_id, progress);
      
      if (!updatedStudent) {
        return {
          success: false,
          error: 'Student not found or update failed'
        };
      }

      return {
        success: true,
        data: updatedStudent,
        message: 'Academic progress updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update academic progress'
      };
    }
  }
}