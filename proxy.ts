import { type NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/server/services/auth.service";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth.constants";
import { ROUTES } from "@/shared/constants/routes";
import { UserRole } from "@/shared/enums";

// ─── Route Classification ─────────────────────────

const PUBLIC_PAGES = new Set([
    ROUTES.home,
    ROUTES.auth.login,
    ROUTES.auth.register,
    ROUTES.auth.forgot,
]);

const PUBLIC_API_PREFIXES = ["/api/auth", "/api/webhooks"];

const ADMIN_PREFIX = "/admin";
const ADMIN_API_PREFIX = "/api/admin";

function isPublicRoute(pathname: string): boolean {
    if (PUBLIC_PAGES.has(pathname)) return true;
    return PUBLIC_API_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isAdminRoute(pathname: string): boolean {
    return pathname.startsWith(ADMIN_PREFIX) || pathname.startsWith(ADMIN_API_PREFIX);
}

function isApiRoute(pathname: string): boolean {
    return pathname.startsWith("/api/");
}

// ─── Responses ─────────────────────────────────────

function unauthorizedResponse(request: NextRequest, isApi: boolean): NextResponse {
    if (isApi) {
        return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Non autorisé" } }, { status: 401 });
    }
    const loginUrl = new URL(ROUTES.auth.login, request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
}

function forbiddenResponse(request: NextRequest, isApi: boolean): NextResponse {
    if (isApi) {
        return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Accès refusé" } }, { status: 403 });
    }
    return NextResponse.redirect(new URL(ROUTES.dashboard.home, request.url));
}

function authenticatedResponse(request: NextRequest, userId: string, role: string): NextResponse {
    const headers = new Headers(request.headers);
    headers.set("x-user-id", userId);
    headers.set("x-user-role", role);
    return NextResponse.next({ request: { headers } });
}

// ─── Main Proxy Logic ──────────────────────────────

export default async function proxy(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl;

    // 1. Static and public assets
    if (
        pathname.includes(".") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api/webhooks")
    ) {
        return NextResponse.next();
    }

    // 2. Public pages
    if (isPublicRoute(pathname)) {
        return NextResponse.next();
    }

    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const isApi = isApiRoute(pathname);

    // 3. Check for token
    if (!token) {
        return unauthorizedResponse(request, isApi);
    }

    // 4. Verify session
    const result = await AuthService.verifySession(token);

    if (!result.ok) {
        const response = unauthorizedResponse(request, isApi);
        response.cookies.delete(AUTH_COOKIE_NAME);
        return response;
    }

    const session = result.data;

    // 5. Admin protection
    if (isAdminRoute(pathname) && session.role !== UserRole.ADMIN) {
        return forbiddenResponse(request, isApi);
    }

    // 6. Return response with identity headers
    return authenticatedResponse(request, session.id, session.role);
}
