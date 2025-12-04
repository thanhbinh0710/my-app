import { NextRequest, NextResponse } from 'next/server';
import { StudentCourseController } from '../../../../../../backend/controllers/StudentCourseController';

const studentCourseController = new StudentCourseController();

export async function GET(
  request: NextRequest,
  { params }: { params: { student_id: string } }
) {
  try {
    const student_id = parseInt(params.student_id);
    
    if (isNaN(student_id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    // Get student's active courses directly from controller
    const result = await studentCourseController.getStudentActiveCourses(student_id);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error fetching student active courses:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch active courses' 
      },
      { status: 500 }
    );
  }
}