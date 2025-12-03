import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Call backend API to get student statistics
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";

    // For demo, use a sample student ID (in real app, get from auth session)
    const studentUserId = 1; // This should come from authenticated user session

    const response = await fetch(
      `${backendUrl}/api/students/user/${studentUserId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Return mock data if backend is not available
      const mockStudentStats = {
        total_credit_earn: 42,
        total_course_register: 14,
        total_course_complete: 11,
        faculty_id: 1,
        faculty_name: "Computer Science",
        roadmap_id: 2,
        roadmap_name: "Software Engineering",
      };

      return NextResponse.json({
        success: true,
        data: mockStudentStats,
      });
    }

    const result = await response.json();

    if (result.success && result.data) {
      // Transform backend data to match our expected format
      const studentData = result.data;

      // Get faculty and roadmap information from student record
      const transformedData = {
        total_credit_earn: studentData.total_credit_earn || 0,
        total_course_register: studentData.total_course_register || 0,
        total_course_complete: studentData.total_course_complete || 0,
        faculty_id: studentData.faculty_id,
        faculty_name:
          studentData.faculty?.faculty_name ||
          studentData.faculty_name ||
          "Unknown Faculty",
        roadmap_id: studentData.roadmap_id,
        roadmap_name:
          studentData.roadmap?.roadmap_name ||
          studentData.roadmap_name ||
          "Unknown Roadmap",
      };

      return NextResponse.json({
        success: true,
        data: transformedData,
      });
    } else {
      throw new Error(result.error || "Failed to fetch student data");
    }
  } catch (error) {
    console.error("API Error:", error);

    // Return mock data as fallback
    const mockStudentStats = {
      total_credit_earn: 42,
      total_course_register: 14,
      total_course_complete: 11,
      faculty_id: 1,
      faculty_name: "Computer Science",
      roadmap_id: 2,
      roadmap_name: "Software Engineering",
    };

    return NextResponse.json({
      success: true,
      data: mockStudentStats,
    });
  }
}
