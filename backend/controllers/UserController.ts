import { UserRepository } from '../repositories/UserRepository';
import { StudentRepository } from '../repositories/StudentRepository';
import { CreateUserRequest, CreateStudentRequest, User, Student } from '../models';
import bcrypt from 'bcryptjs';

export class UserController {
  private userRepository: UserRepository;
  private studentRepository: StudentRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.studentRepository = new StudentRepository();
  }

  // Get all users with pagination
  async getUsers(limit: number = 50, offset: number = 0) {
    try {
      const users = await this.userRepository.findAll(limit, offset);
      const total = await this.userRepository.count();
      
      // Remove passwords from response
      const safeUsers = users.map(user => {
        const { password, ...safeUser } = user;
        return safeUser;
      });

      return {
        success: true,
        data: safeUsers,
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

  // Get user by ID
  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findById(id);
      
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      // Remove password from response
      const { password, ...safeUser } = user;
      
      return {
        success: true,
        data: safeUser
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Create new user
  async createUser(userData: CreateUserRequest) {
    try {
      // Validate email format
      if (!this.validateEmail(userData.email)) {
        return {
          success: false,
          error: 'Invalid email format'
        };
      }

      // Check if username already exists
      const existingUser = await this.userRepository.findByUsername(userData.username);
      if (existingUser) {
        return {
          success: false,
          error: 'Username already exists'
        };
      }

      // Check if email already exists
      const existingEmail = await this.userRepository.findByEmail(userData.email);
      if (existingEmail) {
        return {
          success: false,
          error: 'Email already exists'
        };
      }

      const user = await this.userRepository.create(userData);
      
      // Remove password from response
      const { password, ...safeUser } = user;
      
      return {
        success: true,
        data: safeUser,
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
      const userResult = await this.createUser(userDataWithRole);
      if (!userResult.success || !userResult.data) {
        return userResult;
      }

      // Create student record
      const studentRecord = await this.studentRepository.create({
        ...studentData,
        user_id: userResult.data.id
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

  // Login user
  async login(username: string, password: string) {
    try {
      const user = await this.userRepository.verifyPassword(username, password);
      
      if (!user) {
        return {
          success: false,
          error: 'Invalid username or password'
        };
      }

      // Remove password from response
      const { password: _, ...safeUser } = user;
      
      return {
        success: true,
        data: safeUser,
        message: 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
    }
  }

  // Get users by role
  async getUsersByRole(role: 'student' | 'teacher' | 'admin') {
    try {
      const users = await this.userRepository.findByRole(role);
      
      // Remove passwords from response
      const safeUsers = users.map(user => {
        const { password, ...safeUser } = user;
        return safeUser;
      });

      return {
        success: true,
        data: safeUsers
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch users'
      };
    }
  }

  // Private helper methods
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}