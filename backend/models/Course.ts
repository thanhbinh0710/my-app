// Course related interfaces - matches exact schema design
export interface Course {
  course_id: number;
  course_name: string;
  course_group: string | null;
  creation_date: string;
  course_passing_grade: number;
  course_status: 'active' | 'inactive' | 'archived';
  teacher_id: number;
}

export interface CreateCourseRequest {
  course_name: string;
  course_group?: string;
  course_passing_grade?: number;
  course_status?: 'active' | 'inactive' | 'archived';
  teacher_id: number;
}

export interface UpdateCourseRequest {
  course_name?: string;
  course_group?: string;
  course_passing_grade?: number;
  course_status?: 'active' | 'inactive' | 'archived';
  teacher_id?: number;
}

export interface CourseWithTeacher {
  course_id: number;
  course_name: string;
  course_group: string | null;
  creation_date: string;
  course_passing_grade: number;
  course_status: 'active' | 'inactive' | 'archived';
  teacher_id: number;
  teacher: {
    user_id: number;
    teacher_id: string;
    certificate: string | null;
    faculty_id: number;
  };
}