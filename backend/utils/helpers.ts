import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthUtils {
  private static readonly SALT_ROUNDS = 12;
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
  private static readonly JWT_EXPIRES_IN = '24h';

  /**
   * Hash password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compare password with hash
   */
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate JWT token
   */
  static generateToken(payload: object): string {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    });
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one digit');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export class ValidationUtils {
  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format (Vietnamese)
   */
  static validatePhone(phone: string): boolean {
    const phoneRegex = /^(\+84|84|0)?[3|5|7|8|9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  }

  /**
   * Validate student ID format
   */
  static validateStudentId(studentId: string): boolean {
    const studentIdRegex = /^[A-Z0-9]{6,20}$/;
    return studentIdRegex.test(studentId);
  }

  /**
   * Validate teacher ID format
   */
  static validateTeacherId(teacherId: string): boolean {
    const teacherIdRegex = /^[A-Z0-9]{6,20}$/;
    return teacherIdRegex.test(teacherId);
  }

  /**
   * Validate username
   */
  static validateUsername(username: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (username.length < 3) {
      errors.push('Username must be at least 3 characters long');
    }

    if (username.length > 50) {
      errors.push('Username must be less than 50 characters');
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.push('Username can only contain letters, numbers, and underscores');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate grade (0-10 scale)
   */
  static validateGrade(grade: number): boolean {
    return grade >= 0 && grade <= 10;
  }

  /**
   * Validate date range
   */
  static validateDateRange(startDate: Date, endDate: Date): boolean {
    return startDate <= endDate;
  }

  /**
   * Validate admission date (not future)
   */
  static validateAdmissionDate(admissionDate: Date): boolean {
    return admissionDate <= new Date();
  }

  /**
   * Validate academic year
   */
  static validateAcademicYear(year: number): boolean {
    const currentYear = new Date().getFullYear();
    return year >= 2020 && year <= currentYear + 5;
  }

  /**
   * Sanitize string input
   */
  static sanitizeString(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  /**
   * Validate full name
   */
  static validateFullName(fullName: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (fullName.length < 2) {
      errors.push('Full name must be at least 2 characters long');
    }

    if (fullName.length > 100) {
      errors.push('Full name must be less than 100 characters');
    }

    if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(fullName)) {
      errors.push('Full name can only contain letters and spaces');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export class DateUtils {
  /**
   * Format date to MySQL date format
   */
  static formatDateForDB(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Format datetime to MySQL datetime format
   */
  static formatDateTimeForDB(date: Date): string {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  /**
   * Get current academic year
   */
  static getCurrentAcademicYear(): number {
    const now = new Date();
    const year = now.getFullYear();
    // Academic year typically starts in August/September
    const academicYearStartMonth = 8; // August = 8
    
    if (now.getMonth() + 1 >= academicYearStartMonth) {
      return year;
    } else {
      return year - 1;
    }
  }

  /**
   * Get current semester
   */
  static getCurrentSemester(): string {
    const now = new Date();
    const month = now.getMonth() + 1;
    
    if (month >= 8 && month <= 12) {
      return 'Fall';
    } else if (month >= 1 && month <= 5) {
      return 'Spring';
    } else {
      return 'Summer';
    }
  }

  /**
   * Calculate age from birth date
   */
  static calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Check if date is in the past
   */
  static isInPast(date: Date): boolean {
    return date < new Date();
  }

  /**
   * Check if date is in the future
   */
  static isInFuture(date: Date): boolean {
    return date > new Date();
  }

  /**
   * Add days to date
   */
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Get start and end of academic year
   */
  static getAcademicYearBounds(year: number): { start: Date; end: Date } {
    return {
      start: new Date(year, 7, 1), // August 1st
      end: new Date(year + 1, 6, 31), // July 31st next year
    };
  }
}

export class ErrorUtils {
  /**
   * Create standardized error response
   */
  static createErrorResponse(message: string, statusCode: number = 400) {
    return {
      success: false,
      error: message,
      statusCode
    };
  }

  /**
   * Create standardized success response
   */
  static createSuccessResponse<T>(data: T, message?: string) {
    return {
      success: true,
      data,
      message
    };
  }

  /**
   * Handle database constraint errors
   */
  static handleConstraintError(error: any): string {
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.message.includes('email')) {
        return 'Email đã được sử dụng bởi tài khoản khác';
      }
      if (error.message.includes('username')) {
        return 'Tên đăng nhập đã được sử dụng';
      }
      if (error.message.includes('student_id')) {
        return 'Mã sinh viên đã tồn tại';
      }
      if (error.message.includes('teacher_id')) {
        return 'Mã giảng viên đã tồn tại';
      }
      return 'Dữ liệu đã tồn tại trong hệ thống';
    }
    
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return 'Dữ liệu tham chiếu không tồn tại';
    }
    
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return 'Không thể xóa vì dữ liệu đang được sử dụng';
    }
    
    if (error.code === 'ER_DATA_TOO_LONG') {
      return 'Dữ liệu quá dài cho trường này';
    }
    
    if (error.code === 'ER_BAD_NULL_ERROR') {
      return 'Trường bắt buộc không được để trống';
    }
    
    return 'Lỗi cơ sở dữ liệu không xác định';
  }
}

// Export all utilities
export default {
  AuthUtils,
  ValidationUtils,
  DateUtils,
  ErrorUtils
};