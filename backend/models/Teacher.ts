// Teacher related interfaces - matches exact schema design
export interface Teacher {
  user_id: number;
  teacher_id: string;
  certificate: string | null;
  faculty_id: number;
}

export interface CreateTeacherRequest {
  user_id: number;
  teacher_id: string;
  certificate?: string;
  faculty_id: number;
}

export interface UpdateTeacherRequest {
  teacher_id?: string;
  certificate?: string;
  faculty_id?: number;
}

export interface TeacherWithUser {
  user_id: number;
  teacher_id: string;
  certificate: string | null;
  faculty_id: number;
  user: {
    id: number;
    email: string;
    username: string;
    full_name: string;
    role: string;
  };
}