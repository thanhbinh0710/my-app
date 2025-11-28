// Lecture related interfaces - matches exact schema design
export interface Lecture {
  lecture_id: number;
  lecture_name: string;
  material: string;
  state: 'draft' | 'published' | 'archived';
  creation_date: string;
  reference: string;
  section_id: number;
  student_id: number | null;
  teacher_id: number;
}

export interface CreateLectureRequest {
  lecture_name: string;
  material: string;
  state?: 'draft' | 'published' | 'archived';
  reference: string;
  section_id: number;
  student_id?: number;
  teacher_id: number;
}

export interface UpdateLectureRequest {
  lecture_name?: string;
  material?: string;
  state?: 'draft' | 'published' | 'archived';
  reference?: string;
  student_id?: number;
}