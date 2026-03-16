import { create } from "zustand";
import type { SessionUser } from "@/shared/types";

type AuthState = {
    user: SessionUser | null;
    isLoading: boolean;
    setUser: (user: SessionUser | null) => void;
    setLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    setUser: (user) => set({ user }),
    setLoading: (isLoading) => set({ isLoading }),
}));
