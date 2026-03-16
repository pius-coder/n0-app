export const AUTH_COOKIE_NAME = "n0-auth-token";

export const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

export const AUTH_MESSAGES = {
    UNAUTHORIZED: "Vous devez être connecté pour accéder à cette page",
    FORBIDDEN: "Vous n'avez pas les permissions nécessaires",
    INVALID_CREDENTIALS: "Email ou mot de passe incorrect",
    ACCOUNT_INACTIVE: "Votre compte est désactivé",
    EMAIL_EXISTS: "Cet email est déjà utilisé",
};
