import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: { teacher_id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const teacher_id = params.teacher_id;

    console.log(`Fetching courses for teacher ID: ${teacher_id}`);

    // Call backend API
    const backendResponse = await fetch(
      `http://localhost:3001/api/courses/teacher/${teacher_id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    console.log("Backend response status:", backendResponse.status);

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      console.log("Backend error:", data);
      return NextResponse.json(
        { error: data.error || "Failed to fetch teacher courses" },
        { status: backendResponse.status }
      );
    }

    console.log("Teacher courses data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Teacher courses API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
