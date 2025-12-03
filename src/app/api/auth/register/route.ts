import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { full_name, username, email, password, confirm_password } = await req
      .json()
      .catch(() => ({}));

    if (!full_name || !username || !email || !password || !confirm_password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Call backend API
    const backendResponse = await fetch(
      `http://localhost:3001/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: full_name, // Backend expects fullname not full_name
          username,
          email,
          password,
          confirm_password,
        }),
      }
    );

    const data = await backendResponse.json();

    if (!data.success) {
      return NextResponse.json({ error: data.error }, { status: 400 });
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
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
