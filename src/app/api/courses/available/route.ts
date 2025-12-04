import { NextRequest, NextResponse } from "next/server";
import { CourseController } from "../../../../../backend/controllers/CourseController";
import { createConnection } from "../../../../../backend/utils/database";

const courseController = new CourseController();

export async function GET() {
  try {
    // Initialize database connection
    await createConnection();
    // Get all courses that are active/available for enrollment
    const result = await courseController.getCourses(100, 0); // Get up to 100 courses

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    // Filter to only show active courses
    const courses = result.data || [];
    const availableCourses = courses.filter(
      (course: any) =>
        course.course_status === "active" || !course.course_status
    );

    return NextResponse.json({
      success: true,
      data: availableCourses,
      message: "Available courses fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching available courses:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch available courses",
      },
      { status: 500 }
    );
  }
}
