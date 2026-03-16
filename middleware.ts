import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { AUTH_CONFIG } from "@/shared/constants/auth.constants";

const secret = new TextEncoder().encode(AUTH_CONFIG.JWT_SECRET);

// Patterns to exclude from middleware protection
const EXCLUDED_PATTERNS = [
    /^\/login$/,
    /^\/register$/,
    /^\/$/,
    /^\/api\/auth/,
    /^\/_next/,
    /^\/static/,
    /\.(.*)$/, // Files with extensions
];

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Allow public routes and assets
    const isPublic = EXCLUDED_PATTERNS.some((pattern) => pattern.test(pathname));
    if (isPublic) {
        return NextResponse.next();
    }

    // 2. Check for token
    const token = request.cookies.get(AUTH_CONFIG.TOKEN_NAME)?.value;

    if (!token) {
        if (pathname.startsWith("/api/")) {
            return NextResponse.json(
                { success: false, error: { code: "UNAUTHORIZED", message: "Non autorisé" } },
                { status: 401 }
            );
        }
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 3. Verify token and inject headers
    try {
        const { payload } = await jwtVerify(token, secret);
        const headers = new Headers(request.headers);

        // Inject identity headers (Minimal/Stable data only)
        headers.set("x-user-id", (payload.sub as string) || "");
        headers.set("x-user-role", (payload.role as string) || "");

        // RBAC: Check admin routes
        if (pathname.startsWith("/admin") && payload.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        return NextResponse.next({
            request: { headers },
        });
    } catch (e) {
        // Token invalid or expired
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete(AUTH_CONFIG.TOKEN_NAME);
        return response;
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (auth endpoints)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
    ],
};
