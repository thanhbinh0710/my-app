// Enrollment related interfaces - matches exact schema design (enroll table)
export interface Enroll {
  course_id: string;
  student_id: number;
  start_date: string;
  complete_date: string | null;
  grade: number | null;
  progress: 'enrolled' | 'in_progress' | 'completed' | 'dropped' | 'failed';
}

export interface CreateEnrollRequest {
  course_id: string;
  student_id: number;
  start_date?: string;
  grade?: number;
  progress?: 'enrolled' | 'in_progress' | 'completed' | 'dropped' | 'failed';
}

export interface UpdateEnrollRequest {
  complete_date?: string;
  grade?: number;
  progress?: 'enrolled' | 'in_progress' | 'completed' | 'dropped' | 'failed';
}

// Contain table (course-roadmap relationship)
export interface Contain {
  course_id: string;
  roadmap_id: number;
  order: number;
}

export interface CreateContainRequest {
  course_id: string;
  roadmap_id: number;
  order: number;
}

export interface UpdateContainRequest {
  order?: number;
}

// Teach table (teacher-roadmap relationship)
export interface Teach {
  teacher_id: number;
  roadmap_id: number;
  schedule: string | null;
}

export interface CreateTeachRequest {
  teacher_id: number;
  roadmap_id: number;
  schedule?: string;
}

export interface UpdateTeachRequest {
  schedule?: string;
}