// Faculty related interfaces - matches exact schema design
export interface Faculty {
  faculty_id: number;
  faculty_name: string;
  office_location: string | null;
  phone_number: string | null;
  email: string | null;
  number_of_teacher_in_faculty: number;
}

export interface CreateFacultyRequest {
  faculty_name: string;
  office_location?: string;
  phone_number?: string;
  email?: string;
}

export interface UpdateFacultyRequest {
  faculty_name?: string;
  office_location?: string;
  phone_number?: string;
  email?: string;
}