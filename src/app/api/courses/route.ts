import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("Courses API called - fetching from backend");

    // Get query params from request
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const backendUrl = queryString 
      ? `http://127.0.0.1:3001/api/courses?${queryString}`
      : "http://127.0.0.1:3001/api/courses";

    console.log("Fetching from backend URL:", backendUrl);

    // Proxy request to backend
    const response = await fetch(backendUrl, {
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

export async function POST(request: NextRequest) {
  try {
    console.log("Courses POST API called - creating new course");

    // Get request body
    const body = await request.json();
    console.log("Request body:", body);

    // Proxy request to backend
    const response = await fetch("http://127.0.0.1:3001/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("Backend create course response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Backend error:", errorText);
      return NextResponse.json(
        { error: "Failed to create course in backend" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Course created:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Courses POST API proxy error:", error);
    return NextResponse.json(
      { error: "Failed to create course", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
