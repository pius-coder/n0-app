"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthService } from "@/server/services";
import { loginSchema, registerServerSchema } from "@/shared/schemas";
import { AUTH_CONFIG } from "@/shared/constants";

export async function loginAction(_prevState: any, formData: FormData) {
    const raw = Object.fromEntries(formData);
    const parsed = loginSchema.safeParse(raw);

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const result = await AuthService.login(parsed.data);
    if (!result.ok) {
        return { serverError: result.error.message };
    }

    (await cookies()).set(AUTH_CONFIG.TOKEN_NAME, result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: AUTH_CONFIG.COOKIE_TTL,
        sameSite: "lax",
    });

    return { success: true };
}

export async function registerAction(_prevState: any, formData: FormData) {
    const raw = Object.fromEntries(formData);
    const parsed = registerServerSchema.safeParse(raw);

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const result = await AuthService.register(parsed.data);
    if (!result.ok) {
        return { serverError: result.error.message };
    }

    (await cookies()).set(AUTH_CONFIG.TOKEN_NAME, result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: AUTH_CONFIG.COOKIE_TTL,
        sameSite: "lax",
    });

    return { success: true };
}

export async function logoutAction() {
    (await cookies()).delete(AUTH_CONFIG.TOKEN_NAME);
    redirect("/login");
}
