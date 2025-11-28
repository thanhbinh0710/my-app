import { UserRepository } from '../repositories/UserRepository';
import { CreateUserRequest } from '../models/User';
import { AuthUtils, ValidationUtils } from '../utils/helpers';

interface RegisterRequest {
  fullname: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface LoginRequest {
  email: string;
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
    const { fullname, email, password, confirm_password } = data;

    // Validate required fields
    if (!fullname || !email || !password || !confirm_password) {
      throw new Error('All fields are required: fullname, email, password, confirm_password');
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

    // Generate username from email (part before @)
    let username = email.split('@')[0];

    // Check if username already exists
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      // If username exists, add random suffix
      const randomSuffix = Math.floor(Math.random() * 10000);
      username = `${username}${randomSuffix}`;
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
   * Login user
   */
  async login(data: LoginRequest) {
    const { email, password } = data;

    // Validate required fields
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Validate email format
    if (!ValidationUtils.validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await AuthUtils.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
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
