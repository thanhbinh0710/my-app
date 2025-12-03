import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  user_id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Global cache để tránh multiple API calls
let authCache: {
  promise: Promise<any> | null;
  lastCheck: number;
  data: AuthState | null;
} = {
  promise: null,
  lastCheck: 0,
  data: null,
};

const CACHE_DURATION = 5000; // 5 giây cache

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: authCache.data?.user || null,
    loading: authCache.data ? false : true,
    error: null,
  });

  const router = useRouter();

  // Kiểm tra authentication khi component mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const now = Date.now();

    // Sử dụng cache nếu còn hiệu lực
    if (authCache.data && now - authCache.lastCheck < CACHE_DURATION) {
      setAuthState(authCache.data);
      return;
    }

    // Trả về promise hiện tại nếu đang trong quá trình request
    if (authCache.promise) {
      const result = await authCache.promise;
      setAuthState(result);
      return;
    }

    // Tạo promise mới
    authCache.promise = (async () => {
      try {
        setAuthState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await fetch("/api/auth/verify", {
          credentials: "include",
        });

        let newState: AuthState;

        if (response.ok) {
          const data = await response.json();
          newState = {
            user: data.user,
            loading: false,
            error: null,
          };
        } else {
          newState = {
            user: null,
            loading: false,
            error: null,
          };
        }

        // Cập nhật cache
        authCache.data = newState;
        authCache.lastCheck = Date.now();

        return newState;
      } catch (error) {
        const errorState = {
          user: null,
          loading: false,
          error: "Authentication check failed",
        };
        authCache.data = errorState;
        authCache.lastCheck = Date.now();
        return errorState;
      } finally {
        authCache.promise = null;
      }
    })();

    const result = await authCache.promise;
    setAuthState(result);
  };

  const logout = async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const newState = {
          user: null,
          loading: false,
          error: null,
        };

        // Xóa cache
        authCache.data = newState;
        authCache.lastCheck = Date.now();

        setAuthState(newState);
        router.push("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: "Logout failed",
      }));
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Xóa cache để force refresh
        authCache.data = null;
        authCache.lastCheck = 0;

        await checkAuth(); // Refresh user data
        return { success: true };
      } else {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: data.error || "Login failed",
        }));
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (error) {
      const errorMessage = "Login failed";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!authState.user,
  };
}
