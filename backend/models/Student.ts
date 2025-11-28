// Student related interfaces - matches exact schema design  
export interface Student {
  user_id: number;
  student_id: string;
  admission_date: string;
  total_credit_earn: number;
  total_course_register: number;
  total_course_complete: number;
  faculty_id: number | null;
  roadmap_id: number | null;
}

export interface CreateStudentRequest {
  user_id: number;
  student_id: string;
  admission_date: string;
  faculty_id?: number;
  roadmap_id?: number;
}

export interface UpdateStudentRequest {
  student_id?: string;
  admission_date?: string;
  total_credit_earn?: number;
  total_course_register?: number;
  total_course_complete?: number;
  faculty_id?: number;
  roadmap_id?: number;
}

export interface StudentWithUser {
  user_id: number;
  student_id: string;
  admission_date: string;
  total_credit_earn: number;
  total_course_register: number;
  total_course_complete: number;
  faculty_id: number | null;
  roadmap_id: number | null;
  user: {
    id: number;
    email: string;
    username: string;
    full_name: string;
    role: string;
  };
}