import { headers } from "next/headers";
import type { UserRole } from "@/shared/enums";

export type Identity = {
    userId: string;
    role: UserRole;
};

/**
 * Extracts user identity injected by the proxy/middleware from request headers.
 * Use this only in Server Components or Server Actions that are protected.
 */
export async function getIdentity(): Promise<Identity | null> {
    const headerList = await headers();
    const userId = headerList.get("x-user-id");
    const role = headerList.get("x-user-role") as UserRole | null;

    if (!userId || !role) {
        return null;
    }

    return { userId, role };
}
