import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json().catch(() => ({}));

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Call backend API
    const backendResponse = await fetch(
      `http://localhost:3001/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email, // Backend expects identifier (email or username)
          password,
        }),
      }
    );

    const data = await backendResponse.json();

    if (!data.success) {
      return NextResponse.json({ error: data.error }, { status: 401 });
    }

    // Set JWT token in cookie
    const res = NextResponse.json({ ok: true, user: data.data.user });
    res.cookies.set("token", data.data.token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
