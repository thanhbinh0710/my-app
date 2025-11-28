import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json().catch(() => ({}));

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Demo: create user (persist to DB in real app)
  // TODO: hash password, store user, handle duplicate emails

  const token = "demo-token"; // TODO: generate real JWT for user

  const res = NextResponse.json({ ok: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
