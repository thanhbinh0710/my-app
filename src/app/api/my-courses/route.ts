import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // First verify the token and get user info
    const verifyResponse = await fetch(
      `http://localhost:3001/api/auth/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (!verifyResponse.ok) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userData = await verifyResponse.json();

    if (!userData.success || userData.data.role !== "student") {
      return NextResponse.json(
        { error: "Access denied - Students only" },
        { status: 403 }
      );
    }

    // Get student info to find student_id
    const studentResponse = await fetch(
      `http://localhost:3001/api/students?user_id=${userData.data.user_id}`,
      {
        method: "GET",
      }
    );

    if (!studentResponse.ok) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const studentData = await studentResponse.json();

    if (
      !studentData.success ||
      !studentData.data ||
      studentData.data.length === 0
    ) {
      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 }
      );
    }

    const student = studentData.data[0];

    // Get student's active courses
    const coursesResponse = await fetch(
      `http://localhost:3001/api/student-courses/${student.student_id}/active`,
      {
        method: "GET",
      }
    );

    if (!coursesResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch courses" },
        { status: 500 }
      );
    }

    const coursesData = await coursesResponse.json();

    return NextResponse.json(coursesData);
  } catch (error) {
    console.error("My courses API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
