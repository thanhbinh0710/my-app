import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Courses API called - fetching from backend");

    // Proxy request to backend
    const response = await fetch("http://127.0.0.1:3001/api/courses", {
      method: "GET",
    });

    console.log("Backend courses response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Backend error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch courses from backend" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Courses data received:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Courses API proxy error:", error);
    console.log("Falling back to mock data");

    // Fallback to mock data when backend is not available - courses that student hasn't enrolled in
    return NextResponse.json({
      success: true,
      data: {
        courses: [
          {
            course_id: "CO2013",
            course_name: "Cấu trúc dữ liệu và Giải thuật",
            course_credit: 4,
            course_status: "active",
            teacher_name: "Teacher Name",
          },
          {
            course_id: "MI1013",
            course_name: "Toán rời rạc",
            course_credit: 4,
            course_status: "active",
            teacher_name: "Teacher Name",
          },
          {
            course_id: "CO4017",
            course_name: "Phát triển Ứng dụng Web",
            course_credit: 4,
            course_status: "active",
            teacher_name: "Teacher Name",
          },
          {
            course_id: "CO3014",
            course_name: "Hệ điều hành",
            course_credit: 4,
            course_status: "active",
            teacher_name: "Teacher Name",
          },
          {
            course_id: "CO3015",
            course_name: "Mạng máy tính",
            course_credit: 4,
            course_status: "active",
            teacher_name: "Teacher Name",
          },
        ],
      },
    });
  }
}
