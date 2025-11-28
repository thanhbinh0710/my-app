// Discussion related interfaces - matches exact schema design
export interface Discussion {
  discussion_id: number;
  title: string;
  creation_date: string;
  question: string;
  answer: string | null;
  status: 'open' | 'answered' | 'closed';
  section_id: number;
  student_id: number;
  teacher_id: number | null;
}

export interface CreateDiscussionRequest {
  title: string;
  question: string;
  answer?: string;
  status?: 'open' | 'answered' | 'closed';
  section_id: number;
  student_id: number;
  teacher_id?: number;
}

export interface UpdateDiscussionRequest {
  title?: string;
  question?: string;
  answer?: string;
  status?: 'open' | 'answered' | 'closed';
  teacher_id?: number;
}