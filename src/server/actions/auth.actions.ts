"use server";

import { cookies } from "next/headers";
import { AuthService } from "@/server/services/auth.service";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/shared/schemas";
import { AUTH_COOKIE_NAME, SESSION_DURATION } from "@/shared/constants/auth.constants";

/**
 * Handle user login
 */
export async function loginAction(input: LoginInput) {
    const result = loginSchema.safeParse(input);
    if (!result.success) {
        return { error: "Données invalides" };
    }

    const authResult = await AuthService.login(result.data);

    if (!authResult.ok) {
        return { error: authResult.error.message };
    }

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, authResult.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_DURATION,
    });

    return { data: authResult.data.user };
}

/**
 * Handle user registration
 */
export async function registerAction(input: RegisterInput) {
    const result = registerSchema.safeParse(input);
    if (!result.success) {
        return { error: "Données invalides" };
    }

    const authResult = await AuthService.register(result.data);

    if (!authResult.ok) {
        return { error: authResult.error.message };
    }

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, authResult.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_DURATION,
    });

    return { data: authResult.data.user };
}

/**
 * Handle user logout
 */
export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    return { success: true };
}
