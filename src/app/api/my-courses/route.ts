import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    console.log("My-courses API called");
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    // For development testing - use default student if no token
    let userData;
    if (!token) {
      console.log("No token provided, will try to find any student");

      // Try to get any student from the database
      try {
        const anyStudentResponse = await fetch(
          `http://127.0.0.1:3001/api/students`,
          {
            method: "GET",
          }
        );

        if (anyStudentResponse.ok) {
          const anyStudentData = await anyStudentResponse.json();
          console.log("All students response:", anyStudentData);

          if (
            anyStudentData.success &&
            anyStudentData.data &&
            anyStudentData.data.length > 0
          ) {
            const firstStudent = anyStudentData.data[0];
            console.log("Using first student:", firstStudent);

            userData = {
              success: true,
              data: {
                user_id: firstStudent.user_id || 1,
                role: "student",
              },
            };
          } else {
            throw new Error("No students found in database");
          }
        } else {
          throw new Error("Cannot fetch students");
        }
      } catch (error) {
        console.log("Failed to get any student, using fallback:", error);
        userData = {
          success: true,
          data: {
            user_id: 1,
            role: "student",
          },
        };
      }
    } else {
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

      userData = await verifyResponse.json();
    }
    console.log("User data:", userData);

    if (!userData.success || userData.data.role !== "student") {
      console.log("Access denied - not student or invalid user");
      return NextResponse.json(
        { error: "Access denied - Students only" },
        { status: 403 }
      );
    }

    // Get student info to find student_id
    console.log("Fetching student with user_id:", userData.data.user_id);
    const studentResponse = await fetch(
      `http://127.0.0.1:3001/api/students?user_id=${userData.data.user_id}`,
      {
        method: "GET",
      }
    );

    console.log("Student response status:", studentResponse.status);
    if (!studentResponse.ok) {
      console.log("Student not found, status:", studentResponse.status);
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const studentData = await studentResponse.json();
    console.log("Student data:", studentData);

    if (
      !studentData.success ||
      !studentData.data ||
      studentData.data.length === 0
    ) {
      console.log("No student found for user_id:", userData.data.user_id);
      console.log("Student response:", studentData);

      // Try to use student_id directly if no mapping found
      const directStudent = {
        student_id: 1, // Use student_id = 1 directly
        full_name: "Test Student",
      };

      console.log("Using direct student:", directStudent);

      // Try to fetch courses with direct student_id
      try {
        const coursesResponse = await fetch(
          `http://127.0.0.1:3001/api/student-courses/1/active`,
          {
            method: "GET",
          }
        );

        console.log("Direct courses response status:", coursesResponse.status);
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          console.log("Direct courses data received:", coursesData);
          return NextResponse.json(coursesData);
        }
      } catch (directError) {
        console.log("Direct fetch failed:", directError);
      }

      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 }
      );
    }

    const student = studentData.data[0];
    console.log("Student found:", student);

    // Get student's active courses
    console.log("Fetching courses for student_id:", student.student_id);

    try {
      const coursesResponse = await fetch(
        `http://127.0.0.1:3001/api/student-courses/${student.student_id}/active`,
        {
          method: "GET",
        }
      );

      console.log("Courses response status:", coursesResponse.status);
      if (!coursesResponse.ok) {
        console.log("Failed to fetch courses, status:", coursesResponse.status);
        const errorText = await coursesResponse.text();
        console.log("Error response:", errorText);
        return NextResponse.json(
          { error: "Failed to fetch courses" },
          { status: 500 }
        );
      }

      const coursesData = await coursesResponse.json();
      console.log("Courses data received:", coursesData);
      return NextResponse.json(coursesData);
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      console.log("Falling back to mock enrolled courses data");

      // Fallback to mock data when backend is not available
      return NextResponse.json({
        success: true,
        data: {
          student_id: student.student_id,
          student_name: student.full_name || "Test Student",
          active_courses: 1,
          courses: [
            {
              id: "CO1014",
              name: "Kỹ thuật Lập trình",
              code: "CO1014",
              instructor: "Teacher Name",
              credits: 4,
              progress: 65,
              grade: null,
              start_date: "2024-09-01",
              totalLessons: 60,
              completedLessons: 39,
              nextLesson: "Advanced Topics",
            },
          ],
        },
      });
    }
  } catch (error) {
    console.error("My courses API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
