import { UserRepository } from '../repositories/UserRepository';
import { CreateUserRequest, UpdateUserRequest, User } from '../models/User';
import { ValidationUtils } from '../utils/helpers';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Get all users with pagination
   */
  async getAllUsers(limit: number = 50, offset: number = 0) {
    const users = await this.userRepository.findAll(limit, offset);
    const total = await this.userRepository.count();

    // Remove passwords from response
    const safeUsers = users.map(user => {
      const { password, ...safeUser } = user;
      return safeUser;
    });

    return {
      users: safeUsers,
      pagination: {
        limit,
        offset,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get user by ID
   */
  async getUserById(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    // Remove password from response
    const { password, ...safeUser } = user;

    return safeUser;
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    // Remove password from response
    const { password, ...safeUser } = user;

    return safeUser;
  }

  /**
   * Get user by username
   */
  async getUserByUsername(username: string) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    // Remove password from response
    const { password, ...safeUser } = user;

    return safeUser;
  }

  /**
   * Create new user
   */
  async createUser(userData: CreateUserRequest) {
    // Validate email format
    if (!ValidationUtils.validateEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Check if username already exists
    const existingUser = await this.userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Check if email already exists
    const existingEmail = await this.userRepository.findByEmail(userData.email);
    if (existingEmail) {
      throw new Error('Email already exists');
    }

    // Validate username
    const usernameValidation = ValidationUtils.validateUsername(userData.username);
    if (!usernameValidation.isValid) {
      throw new Error(usernameValidation.errors[0]);
    }

    // Validate full name
    const fullNameValidation = ValidationUtils.validateFullName(userData.full_name);
    if (!fullNameValidation.isValid) {
      throw new Error(fullNameValidation.errors[0]);
    }

    const user = await this.userRepository.create(userData);

    // Remove password from response
    const { password, ...safeUser } = user;

    return safeUser;
  }

  /**
   * Update user
   */
  async updateUser(id: number, userData: UpdateUserRequest) {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Validate email format if provided
    if (userData.email && !ValidationUtils.validateEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Check if email already exists (and not the same user)
    if (userData.email) {
      const emailUser = await this.userRepository.findByEmail(userData.email);
      if (emailUser && emailUser.user_id !== id) {
        throw new Error('Email already exists');
      }
    }

    // Check if username already exists (and not the same user)
    if (userData.username) {
      const usernameUser = await this.userRepository.findByUsername(userData.username);
      if (usernameUser && usernameUser.user_id !== id) {
        throw new Error('Username already exists');
      }

      // Validate username
      const usernameValidation = ValidationUtils.validateUsername(userData.username);
      if (!usernameValidation.isValid) {
        throw new Error(usernameValidation.errors[0]);
      }
    }

    // Validate full name if provided
    if (userData.full_name) {
      const fullNameValidation = ValidationUtils.validateFullName(userData.full_name);
      if (!fullNameValidation.isValid) {
        throw new Error(fullNameValidation.errors[0]);
      }
    }

    const updatedUser = await this.userRepository.update(id, userData);

    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    // Remove password from response
    const { password, ...safeUser } = updatedUser;

    return safeUser;
  }

  /**
   * Delete user
   */
  async deleteUser(id: number) {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    const result = await this.userRepository.delete(id);

    if (!result) {
      throw new Error('Failed to delete user');
    }

    return { message: 'User deleted successfully' };
  }

  /**
   * Get users by role
   */
  async getUsersByRole(role: 'student' | 'teacher' | 'admin') {
    const users = await this.userRepository.findByRole(role);

    // Remove passwords from response
    const safeUsers = users.map(user => {
      const { password, ...safeUser } = user;
      return safeUser;
    });

    return safeUsers;
  }

  /**
   * Update user password
   */
  async updatePassword(id: number, newPassword: string) {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Validate password length
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const result = await this.userRepository.updatePassword(id, newPassword);

    if (!result) {
      throw new Error('Failed to update password');
    }

    return { message: 'Password updated successfully' };
  }
}
