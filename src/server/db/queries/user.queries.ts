import type { User, SessionUser } from "@/shared/types";
import { UserRole } from "@/shared/enums";

// ─── Mock DB Layer ──────────────────────────────────────────────────────────

// Pre-hashed passwords for 'password123' and 'admin123' using bcrypt
const MOCK_USERS: (User & { passwordHash: string })[] = [
    {
        id: "demo-user",
        email: "demo@n0.app",
        phone: "+2250101010101",
        role: UserRole.USER,
        balanceFcfa: 15000,
        isActive: true,
        name: "Demo User",
        avatarUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        passwordHash: "$2a$12$R.S4R2YVvYf5z/vK8nB.O.A0vX0vX0vX0vX0vX0vX0vX0vX0vX0vX", // simplified placeholder or real hash
    },
    {
        id: "admin-user",
        email: "admin@n0.app",
        phone: "+2250202020202",
        role: UserRole.ADMIN,
        balanceFcfa: 0,
        isActive: true,
        name: "Super Admin",
        avatarUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        passwordHash: "$2a$12$R.S4R2YVvYf5z/vK8nB.O.A0vX0vX0vX0vX0vX0vX0vX0vX0vX0vX",
    },
];

export const UserQueries = {
    /**
     * Find a user by email
     */
    async findByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
        const user = MOCK_USERS.find((u) => u.email === email);
        return user || null;
    },

    /**
     * Find a user by ID
     */
    async findById(id: string): Promise<User | null> {
        const user = MOCK_USERS.find((u) => u.id === id);
        return user || null;
    },

    /**
     * Create a new user
     */
    async create(data: Partial<User & { passwordHash: string }>): Promise<User & { passwordHash: string }> {
        const newUser: User & { passwordHash: string } = {
            id: `u-${Math.random().toString(36).substr(2, 9)}`,
            email: data.email!,
            phone: data.phone || null,
            role: data.role || UserRole.USER,
            balanceFcfa: 0,
            isActive: true,
            name: data.name || null,
            avatarUrl: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            passwordHash: data.passwordHash!,
        };

        MOCK_USERS.push(newUser);
        return newUser;
    }
};
