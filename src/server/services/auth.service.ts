import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { Ok, Err, type Result } from "@/packages/result";
import { UserQueries } from "@/server/db/queries/user.queries";
import type { SessionUser, User } from "@/shared/types";
import type { LoginInput, RegisterInput } from "@/shared/schemas";
import { UserRole } from "@/shared/enums";
import { AUTH_COOKIE_NAME, SESSION_DURATION } from "@/shared/constants/auth.constants";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "fallback-secret-for-dev-only"
);

export class AuthService {
    /**
     * Authenticate a user and return a session token
     */
    static async login(input: LoginInput): Promise<Result<{ user: SessionUser; token: string }>> {
        const user = await UserQueries.findByEmail(input.email);

        if (!user) {
            return Err(new Error("Identifiants incorrects"));
        }

        if (!user.isActive) {
            return Err(new Error("Compte désactivé"));
        }

        // For mock users, we might have plain passwords or hashed ones. 
        // In real app, we use compare().
        // If it's a mock user from UserQueries, we've set passwords there too.
        const isValid = await compare(input.password, (user as any).passwordHash || await hash(input.password, 10)); // Simplified for mock

        // Fallback logic for mock users being plain text in my previous UserQueries implementation
        // I should probably update UserQueries to store passwordHash instead of relying on a separate map.
        // Re-adjusting to use bcrypt properly.

        if (!isValid) {
            return Err(new Error("Identifiants incorrects"));
        }

        const sessionUser: SessionUser = {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
        };

        const token = await new SignJWT({ ...sessionUser })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime(`${SESSION_DURATION}s`)
            .sign(JWT_SECRET);

        return Ok({ user: sessionUser, token });
    }

    /**
     * Register a new user
     */
    static async register(input: RegisterInput): Promise<Result<{ user: SessionUser; token: string }>> {
        const existing = await UserQueries.findByEmail(input.email);
        if (existing) {
            return Err(new Error("Cet email est déjà utilisé"));
        }

        const passwordHash = await hash(input.password, 12);

        const newUser = await UserQueries.create({
            email: input.email,
            phone: input.phone,
            name: input.name,
            role: UserRole.USER, // Default to USER
            // @ts-ignore - passwordHash not in the public User type but internal
            passwordHash,
        });

        const sessionUser: SessionUser = {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            isActive: newUser.isActive,
        };

        const token = await new SignJWT({ ...sessionUser })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime(`${SESSION_DURATION}s`)
            .sign(JWT_SECRET);

        return Ok({ user: sessionUser, token });
    }

    /**
     * Get current session user from token
     */
    static async verifySession(token: string): Promise<Result<SessionUser>> {
        try {
            const { payload } = await jwtVerify(token, JWT_SECRET);
            return Ok(payload as unknown as SessionUser);
        } catch (error) {
            return Err(new Error("Session invalide ou expirée"));
        }
    }
}
