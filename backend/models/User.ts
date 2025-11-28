// User related interfaces - matches exact schema design
export interface User {
  user_id: number;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  username: string;
  password: string;
  full_name: string;
}

export interface CreateUserRequest {
  email: string;
  role: 'student' | 'teacher' | 'admin';
  username: string;
  password: string;
  full_name: string;
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  full_name?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}