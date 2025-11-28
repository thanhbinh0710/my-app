// Section related interfaces - matches exact schema design
export interface Section {
  section_id: number;
  section_name: string;
  course_id: number;
  teacher_id: number;
}

export interface CreateSectionRequest {
  section_name: string;
  course_id: number;
  teacher_id: number;
}

export interface UpdateSectionRequest {
  section_name?: string;
  course_id?: number;
  teacher_id?: number;
}