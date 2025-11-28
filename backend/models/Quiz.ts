// Quiz related interfaces - matches exact schema design
export interface Quiz {
  quiz_id: number;
  quiz_name: string;
  attemps: number;
  state: 'draft' | 'active' | 'closed' | 'archived';
  duration: number;
  grade: number;
  creation_date: string;
  section_id: number;
  teacher_id: number;
}

export interface CreateQuizRequest {
  quiz_name: string;
  attemps?: number;
  state?: 'draft' | 'active' | 'closed' | 'archived';
  duration: number;
  grade?: number;
  section_id: number;
  teacher_id: number;
}

export interface UpdateQuizRequest {
  quiz_name?: string;
  attemps?: number;
  state?: 'draft' | 'active' | 'closed' | 'archived';
  duration?: number;
  grade?: number;
}

// Question related interfaces
export interface Question {
  question_id: number;
  content: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  answer: string;
  false_options: string | null;
  quiz_id: number;
  teacher_id: number;
}

export interface CreateQuestionRequest {
  content: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  answer: string;
  false_options?: string;
  quiz_id: number;
  teacher_id: number;
}

export interface UpdateQuestionRequest {
  content?: string;
  type?: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  answer?: string;
  false_options?: string;
}

// Do Quiz related interfaces
export interface DoQuiz {
  quiz_id: number;
  student_id: number;
  section_id: number;
  grade: number | null;
  progress: 'not_started' | 'in_progress' | 'submitted' | 'graded';
}

export interface CreateDoQuizRequest {
  quiz_id: number;
  student_id: number;
  section_id: number;
  grade?: number;
  progress?: 'not_started' | 'in_progress' | 'submitted' | 'graded';
}

export interface UpdateDoQuizRequest {
  grade?: number;
  progress?: 'not_started' | 'in_progress' | 'submitted' | 'graded';
}