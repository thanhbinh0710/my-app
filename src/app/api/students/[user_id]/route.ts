import { NextRequest, NextResponse } from 'next/server';
import { StudentController } from '../../../../../backend/controllers/StudentController';
import { createConnection } from '../../../../../backend/utils/database';

const studentController = new StudentController();

export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    // Initialize database connection
    await createConnection();
    
    const user_id = parseInt(params.user_id);
    
    if (isNaN(user_id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const result = await studentController.getStudentById(user_id);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}