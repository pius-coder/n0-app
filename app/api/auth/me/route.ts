import { NextRequest } from "next/server";
import { UserQueries } from "@/server/db/queries/user.queries";
import { AuthService } from "@/server/services";
import { success, error } from "@/server/helpers";
import { AUTH_CONFIG } from "@/shared/constants";

export async function GET(req: NextRequest) {
    const token = req.cookies.get(AUTH_CONFIG.TOKEN_NAME)?.value;

    if (!token) {
        return error({ message: "Non authentifié", statusCode: 401 });
    }

    const result = await AuthService.verifyToken(token);
    if (!result.ok) {
        return error({ message: "Session expirée", statusCode: 401 });
    }

    const user = await UserQueries.findById(result.data.sub);
    if (!user || !user.isActive) {
        return error({ message: "Utilisateur introuvable ou inactif", statusCode: 401 });
    }

    return success(UserQueries.toSessionUser(user));
}
