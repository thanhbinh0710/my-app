import { UserService } from '../services';
import { StudentRepository } from '../repositories/StudentRepository';
import { CreateUserRequest, CreateStudentRequest } from '../models';

export class UserController {
  private userService: UserService;
  private studentRepository: StudentRepository;

  constructor() {
    this.userService = new UserService();
    this.studentRepository = new StudentRepository();
  }

  // Get all users with pagination
  async getUsers(limit: number = 50, offset: number = 0) {
    try {
      const result = await this.userService.getAllUsers(limit, offset);
      return {
        success: true,
        data: result.users,
        pagination: result.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Get user by ID
  async getUserById(id: number) {
    try {
      const user = await this.userService.getUserById(id);
      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'User not found'
      };
    }
  }

  // Create new user
  async createUser(userData: CreateUserRequest) {
    try {
      const user = await this.userService.createUser(userData);
      return {
        success: true,
        data: user,
        message: 'User created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create user'
      };
    }
  }

  // Create student with user account
  async createStudent(userData: CreateUserRequest, studentData: Omit<CreateStudentRequest, 'user_id'>) {
    try {
      // Set role to student
      const userDataWithRole = { ...userData, role: 'student' as const };
      
      // Create user first
      const user = await this.userService.createUser(userDataWithRole);

      // Create student record
      const studentRecord = await this.studentRepository.create({
        ...studentData,
        user_id: user.user_id
      });

      // Get student with user info
      const studentWithUser = await this.studentRepository.findWithUserInfo(studentRecord.user_id);

      return {
        success: true,
        data: studentWithUser,
        message: 'Student created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create student'
      };
    }
  }

  // Get users by role
  async getUsersByRole(role: 'student' | 'teacher' | 'admin') {
    try {
      const users = await this.userService.getUsersByRole(role);
      return {
        success: true,
        data: users
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch users'
      };
    }
  }
}