import { cookies } from "next/headers";
import { AuthService } from "@/server/services/auth.service";
import { success, error } from "@/server/helpers/api-response.helper";
import { UnauthorizedError } from "@/server/errors";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth.constants";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

        if (!token) {
            throw new UnauthorizedError("Session expirée");
        }

        const result = await AuthService.verifySession(token);

        if (!result.ok) {
            // Clear invalid cookie
            const res = error(new UnauthorizedError(result.error.message));
            res.cookies.delete(AUTH_COOKIE_NAME);
            return res;
        }

        return success(result.data);
    } catch (err) {
        return error(err);
    }
}
