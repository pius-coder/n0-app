"use client";

import { useEffect, useCallback } from "react";
import { useAuthStore } from "@/client/stores/auth.store";
import type { SessionUser, ApiResponse } from "@/shared/types";

export function useAuth() {
    const { user, setUser, isLoading, setLoading } = useAuthStore();

    const fetchUser = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/me");
            const data = (await res.json()) as ApiResponse<SessionUser>;

            if (data.success) {
                setUser(data.data);
            } else {
                setUser(null);
            }
        } catch (e) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [setUser, setLoading]);

    useEffect(() => {
        if (!user) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [user, fetchUser, setLoading]);

    return {
        user,
        isLoading,
        refresh: fetchUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === "ADMIN",
    };
}
