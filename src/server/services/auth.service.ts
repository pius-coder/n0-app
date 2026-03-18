import { Ok, Err, type Result } from "@/packages/result";
import { UserQueries } from "@/server/db/queries/user.queries";
import { AUTH_CONFIG } from "@/shared/constants";
import type { SessionUser, AuthPayload } from "@/shared/types";
import type { LoginInput, RegisterServerInput } from "@/shared/schemas";
import { createModuleLogger } from "@/packages/logger";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const logger = createModuleLogger("auth");

const secret = new TextEncoder().encode(AUTH_CONFIG.JWT_SECRET);

export const AuthService = {
    /**
     * Generates a secure JWT with a minimal payload.
     */
    async generateToken(user: { id: string; role: string }): Promise<string> {
        const payload: AuthPayload = {
            sub: user.id,
            role: user.role as any,
        };

        return new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1h") // P0: Short TTL
            .sign(secret);
    },

    /**
     * Authenticates a user by phone and password.
     */
    async login(input: LoginInput): Promise<Result<{ token: string; user: SessionUser }>> {
        const user = await UserQueries.findByPhone(input.phone);

        if (!user || !user.isActive) {
            return Err(new Error("Accès refusé. Numéro inconnu ou compte désactivé."));
        }

        const isValid = await bcrypt.compare(input.password, user.passwordHash);
        if (!isValid) {
            return Err(new Error("Mot de passe incorrect."));
        }

        const token = await this.generateToken(user);
        const sessionUser = UserQueries.toSessionUser(user);

        return Ok({ token, user: sessionUser });
    },

    /**
     * Registers a new user with phone priority.
     */
    async register(
        input: RegisterServerInput
    ): Promise<Result<{ token: string; user: SessionUser }>> {
        const existing = await UserQueries.findByPhone(input.phone);
        if (existing) {
            return Err(new Error("Ce numéro de téléphone est déjà utilisé."));
        }

        const passwordHash = await bcrypt.hash(input.password, AUTH_CONFIG.SALT_ROUNDS);

        try {
            const user = await UserQueries.create({
                phone: input.phone,
                passwordHash,
                email: input.email || undefined,
                name: input.name || undefined,
            });

            const token = await this.generateToken(user);
            const sessionUser = UserQueries.toSessionUser(user);

            return Ok({ token, user: sessionUser });
        } catch (e) {
            logger.error("Registration error", e);
            return Err(new Error("Une erreur est survenue lors de l'inscription."));
        }
    },

    /**
     * Verifies the JWT and returns the payload.
     */
    async verifyToken(token: string): Promise<Result<AuthPayload>> {
        try {
            const { payload } = await jwtVerify(token, secret);
            return Ok(payload as unknown as AuthPayload);
        } catch (e) {
            return Err(e as Error);
        }
    },
};
