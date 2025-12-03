"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupForm } from "@/components/features/signup-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const full_name = (data.get("full_name") as string) || "";
    const username = (data.get("username") as string) || "";
    const email = (data.get("email") as string) || "";
    const password = (data.get("password") as string) || "";
    const confirm_password = (data.get("confirm_password") as string) || "";

    // Client-side validation
    if (password !== confirm_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name,
        username,
        email,
        password,
        confirm_password,
      }),
      credentials: "include",
    });
    setLoading(false);
    if (res.ok) {
      router.push("/dashboard");
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body?.error || "Register failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {error && (
          <Alert variant="destructive" className="mb-2">
            <AlertCircleIcon className="ml-2" />
            <AlertTitle> {error}</AlertTitle>
          </Alert>
        )}
        <SignupForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
