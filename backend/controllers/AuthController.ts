import { AuthService } from '../services';

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

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Register a new user
   */
  async register(data: RegisterRequest) {
    try {
      const result = await this.authService.register(data);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  }

  /**
   * Login user
   */
  async login(data: LoginRequest) {
    try {
      const result = await this.authService.login(data);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
    }
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token: string) {
    try {
      const user = await this.authService.verifyToken(token);
      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        error: 'Invalid or expired token'
      };
    }
  }
}
