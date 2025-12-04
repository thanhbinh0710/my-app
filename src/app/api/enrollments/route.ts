import { NextRequest, NextResponse } from 'next/server';
import { EnrollmentController } from '../../../../backend/controllers/EnrollmentController';
import { createConnection } from '../../../../backend/utils/database';

const enrollmentController = new EnrollmentController();

export async function POST(request: NextRequest) {
  try {
    // Initialize database connection
    await createConnection();
    
    const body = await request.json();
    const { course_id, student_id } = body;

    if (!course_id || !student_id) {
      return NextResponse.json(
        { success: false, error: 'Course ID and Student ID are required' },
        { status: 400 }
      );
    }

    const result = await enrollmentController.createEnrollment({
      course_id,
      student_id,
      start_date: new Date().toISOString().split('T')[0], // Current date
      progress: 'enrolled'
    });
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create enrollment' 
      },
      { status: 500 }
    );
  }
}