import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { course_id: string } }
) {
  try {
    const { course_id } = params;
    console.log("GET /api/courses/:course_id - fetching course:", course_id);

    const response = await fetch(`http://127.0.0.1:3001/api/courses/${course_id}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Backend error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch course from backend" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET course API proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch course", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { course_id: string } }
) {
  try {
    const { course_id } = params;
    const body = await request.json();
    
    console.log("PUT /api/courses/:course_id - updating course:", course_id);
    console.log("Request body:", body);

    const response = await fetch(`http://127.0.0.1:3001/api/courses/${course_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("Backend update course response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Backend error:", errorText);
      return NextResponse.json(
        { error: "Failed to update course in backend" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Course updated:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("PUT course API proxy error:", error);
    return NextResponse.json(
      { error: "Failed to update course", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { course_id: string } }
) {
  try {
    const { course_id } = params;
    console.log("DELETE /api/courses/:course_id - deleting course:", course_id);

    const response = await fetch(`http://127.0.0.1:3001/api/courses/${course_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Backend error:", errorText);
      return NextResponse.json(
        { error: "Failed to delete course from backend" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("DELETE course API proxy error:", error);
    return NextResponse.json(
      { error: "Failed to delete course", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
