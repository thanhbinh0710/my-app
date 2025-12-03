"use client";

import { LoginForm } from "@/components/features/login-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    setLoading(false);

    if (res.ok) {
      // redirect back or to dashboard
      const url = new URL(window.location.href);
      const redirectTo = url.searchParams.get("redirectTo") || "/dashboard";
      router.push(redirectTo);
    } else {
      const data = await res.json();
      setError(data?.error || "Login failed");
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {error && (
          <Alert variant="destructive" className="mb-2">
            <AlertCircleIcon className="ml-2" />
            <AlertTitle> {error}</AlertTitle>
          </Alert>
        )}
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
