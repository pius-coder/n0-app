import { db } from "@/server/db/client";
import type { User, SessionUser } from "@/shared/types";

export const UserQueries = {
    async findByPhone(phone: string): Promise<User | null> {
        return db.user.findUnique({
            where: { phone },
        }) as Promise<User | null>;
    },

    async findById(id: string): Promise<User | null> {
        return db.user.findUnique({
            where: { id },
        }) as Promise<User | null>;
    },

    async create(data: {
        phone: string;
        passwordHash: string;
        email?: string;
        name?: string;
    }): Promise<User> {
        return db.user.create({
            data: {
                phone: data.phone,
                passwordHash: data.passwordHash,
                email: data.email || null,
                name: data.name || null,
                credits: 0,
                role: "USER",
                isActive: true,
            },
        }) as Promise<User>;
    },

    // Mapper to strip sensitive data
    toSessionUser(user: User): SessionUser {
        return {
            id: user.id,
            phone: user.phone,
            role: user.role,
            credits: user.credits,
            name: user.name,
        };
    },
};
