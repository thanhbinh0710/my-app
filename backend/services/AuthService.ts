import { UserRepository } from '../repositories/UserRepository';
import { CreateUserRequest } from '../models/User';
import { AuthUtils, ValidationUtils } from '../utils/helpers';

interface RegisterRequest {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface LoginRequest {
  identifier: string; // username or email
  password: string;
}

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Register a new user
   */
  async register(data: RegisterRequest) {
    const { fullname, username, email, password, confirm_password } = data;

    // Validate required fields
    if (!fullname || !username || !email || !password || !confirm_password) {
      throw new Error('All fields are required: fullname, username, email, password, confirm_password');
    }

    // Validate email format
    if (!ValidationUtils.validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Check if email already exists
    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error('Email already exists');
    }

    // Check if username already exists
    const existingUsername = await this.userRepository.findByUsername(username);
    if (existingUsername) {
      throw new Error('Username already exists');
    }

    // Validate username (at least 3 characters, alphanumeric and underscore only)
    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new Error('Username can only contain letters, numbers, and underscores');
    }

    // Validate password length (at least 8 characters)
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Check if passwords match
    if (password !== confirm_password) {
      throw new Error('Passwords do not match');
    }

    // Validate full name
    const fullNameValidation = ValidationUtils.validateFullName(fullname);
    if (!fullNameValidation.isValid) {
      throw new Error(fullNameValidation.errors[0]);
    }

    // Create user
    const userData: CreateUserRequest = {
      email,
      role: 'student', // Default role for registration
      username,
      password,
      full_name: fullname
    };

    const user = await this.userRepository.create(userData);

    // Generate JWT token
    const token = AuthUtils.generateToken({
      id: user.user_id,
      email: user.email,
      role: user.role,
      username: user.username
    });

    // Remove password from response
    const { password: _, ...safeUser } = user;

    return {
      user: safeUser,
      token
    };
  }

  /**
   * Login user with username or email
   */
  async login(data: LoginRequest) {
    const { identifier, password } = data;

    // Validate required fields
    if (!identifier || !password) {
      throw new Error('Username/Email and password are required');
    }

    // Try to find user by email or username
    let user;
    if (ValidationUtils.validateEmail(identifier)) {
      // If identifier is email format, search by email
      user = await this.userRepository.findByEmail(identifier);
    } else {
      // Otherwise, search by username
      user = await this.userRepository.findByUsername(identifier);
    }

    if (!user) {
      throw new Error('Invalid username/email or password');
    }

    // Verify password
    const isPasswordValid = await AuthUtils.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username/email or password');
    }

    // Generate JWT token
    const token = AuthUtils.generateToken({
      id: user.user_id,
      email: user.email,
      role: user.role,
      username: user.username
    });

    // Remove password from response
    const { password: _, ...safeUser } = user;

    return {
      user: safeUser,
      token
    };
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token: string) {
    const decoded = AuthUtils.verifyToken(token);

    // Get user from database
    const user = await this.userRepository.findById(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }

    // Remove password from response
    const { password: _, ...safeUser } = user;

    return safeUser;
  }
}
