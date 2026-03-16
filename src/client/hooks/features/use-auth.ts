"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/client/stores/auth.store";
import { logoutAction } from "@/server/actions/auth.actions";
import { ROUTES } from "@/shared/constants/routes";

export function useAuth() {
    const { user, setUser, isLoading, setLoading } = useAuthStore();
    const router = useRouter();

    const fetchMe = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/auth/me");
            const result = await response.json();

            if (result.success) {
                setUser(result.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [setUser, setLoading]);

    const logout = useCallback(async () => {
        await logoutAction();
        setUser(null);
        router.push(ROUTES.auth.login);
        router.refresh();
    }, [setUser, router]);

    useEffect(() => {
        if (!user && isLoading) {
            fetchMe();
        }
    }, [user, isLoading, fetchMe]);

    return {
        user,
        isLoading,
        logout,
        refresh: fetchMe,
    };
}
