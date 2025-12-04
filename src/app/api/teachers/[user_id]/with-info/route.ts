import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const user_id = params.user_id;

    // Call backend API
    const backendResponse = await fetch(
      `http://localhost:3001/api/teachers/${user_id}/with-info`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.error || "Failed to fetch teacher info" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Teacher info API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
