import { NextRequest, NextResponse } from 'next/server';
import { StudentCourseController } from '../../../../../backend/controllers/StudentCourseController';
import { createConnection } from '../../../../../backend/utils/database';

const studentCourseController = new StudentCourseController();

export async function GET(
  request: NextRequest,
  { params }: { params: { student_id: string } }
) {
  try {
    // Initialize database connection
    await createConnection();
    
    const student_id = parseInt(params.student_id);
    
    if (isNaN(student_id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    // Get student's enrolled courses directly from controller
    const result = await studentCourseController.getStudentCourses(student_id);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error fetching student enrollments:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch enrollments' 
      },
      { status: 500 }
    );
  }
}