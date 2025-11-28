// Main model exports - complete models matching exact schema
export type { User, CreateUserRequest, UpdateUserRequest, LoginRequest, AuthResponse } from './User';
export type { Student, CreateStudentRequest, UpdateStudentRequest, StudentWithUser } from './Student';
export type { Teacher, CreateTeacherRequest, UpdateTeacherRequest, TeacherWithUser } from './Teacher';
export type { Faculty, CreateFacultyRequest, UpdateFacultyRequest } from './Faculty';
export type { Course, CreateCourseRequest, UpdateCourseRequest, CourseWithTeacher } from './Course';
export type { Roadmap, CreateRoadmapRequest, UpdateRoadmapRequest } from './Roadmap';
export type { Section, CreateSectionRequest, UpdateSectionRequest } from './Section';
export type { Quiz, Question, DoQuiz, CreateQuizRequest, UpdateQuizRequest, CreateQuestionRequest, UpdateQuestionRequest, CreateDoQuizRequest, UpdateDoQuizRequest } from './Quiz';
export type { Lecture, CreateLectureRequest, UpdateLectureRequest } from './Lecture';
export type { Discussion, CreateDiscussionRequest, UpdateDiscussionRequest } from './Discussion';
export type { Enroll, Contain, Teach, CreateEnrollRequest, UpdateEnrollRequest, CreateContainRequest, UpdateContainRequest, CreateTeachRequest, UpdateTeachRequest } from './Enrollment';

// Common response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}