const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET && process.env.NODE_ENV === "production") {
    throw new Error("FATAL: JWT_SECRET environment variable is not set.");
}

export const AUTH_CONFIG = {
    TOKEN_NAME: "auth-token",
    JWT_SECRET: JWT_SECRET || "dev-only-secret-do-not-use-in-prod",
    COOKIE_TTL: 60 * 60, // 1 hour for better security (P0)
    SALT_ROUNDS: 10,
};
