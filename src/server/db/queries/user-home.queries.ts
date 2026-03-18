import { db } from "@/server/db";
import type { UserHomeData } from "@/shared/types";
import { ServiceStatus, ServerStatus } from "@/shared/enums";

export const UserHomeQueries = {
    /**
     * Fetch the full user-home aggregate for a given userId.
     */
    async findPageDataByUser(userId: string): Promise<UserHomeData | null> {
        // Run queries in parallel for better performance
        const [user, defaultProvider, services, userActiveNumbers] =
            await Promise.all([
                // Get user with credits
                db.user.findUnique({
                    where: { id: userId },
                    select: {
                        id: true,
                        credits: true,
                        updatedAt: true,
                    },
                }),
                // Get default provider (server)
                db.providers.findFirst({
                    where: {
                        is_default: true,
                        status: "ACTIVE",
                    },
                    select: {
                        id: true,
                        name: true,
                        display_name: true,
                        status: true,
                    },
                }),
                // Get all active services
                db.services.findMany({
                    where: { is_active: true },
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        short_code: true,
                        icon_url: true,
                    },
                }),
                // Count active numbers per service for this user
                db.active_numbers.groupBy({
                    by: ["service_id"],
                    where: {
                        user_id: userId,
                        status: { in: ["PENDING", "WAITING_SMS", "RECEIVED"] },
                    },
                    _count: {
                        id: true,
                    },
                }),
            ]);

        if (!user) {
            return null;
        }

        // Build services list with numbers count
        const numbersCountMap = new Map(
            userActiveNumbers.map(
                (item: { service_id: string; _count: { id: number } }) => [
                    item.service_id,
                    item._count.id,
                ],
            ),
        );

        const userServiceData = services.map(
            (service: { id: string; name: string; slug: string }) => ({
                id: service.id,
                name: service.name,
                subtitle: "Numéros virtuels",
                status: ServiceStatus.ACTIVE,
                iconKey: mapServiceToIconKey(service.slug),
                numbersCount: numbersCountMap.get(service.id) ?? 0,
            }),
        );

        // Build server data
        const serverData = defaultProvider
            ? {
                  id: defaultProvider.id,
                  name: defaultProvider.display_name,
                  serverId: defaultProvider.name,
                  status: mapProviderStatus(defaultProvider.status),
                  avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${defaultProvider.name}`,
              }
            : {
                  id: "default",
                  name: "Serveur par défaut",
                  serverId: "default",
                  status: ServerStatus.ONLINE,
                  avatarUrl:
                      "https://api.dicebear.com/7.x/identicon/svg?seed=default",
              };

        // Build balance data
        // Note: changePercent and sparklineData would ideally come from transaction history
        // For now, using calculated values based on user's credit changes
        const balanceData = {
            amount: user.credits,
            currency: "USD",
            changePercent: 0,
            changeDirection: "up" as const,
            sparklineData: generateSparklineData(user.credits),
            updatedAt: user.updatedAt,
        };

        return {
            server: serverData,
            balance: balanceData,
            services: userServiceData,
        };
    },
};

// Helper: Map provider status to ServerStatus enum
function mapProviderStatus(status: string): ServerStatus {
    switch (status) {
        case "ACTIVE":
            return ServerStatus.ONLINE;
        case "INACTIVE":
            return ServerStatus.OFFLINE;
        case "MAINTENANCE":
            return ServerStatus.MAINTENANCE;
        case "ERROR":
            return ServerStatus.OFFLINE;
        default:
            return ServerStatus.ONLINE;
    }
}

// Helper: Map service slug to icon key
function mapServiceToIconKey(
    slug: string,
): "whatsapp" | "facebook" | "vk" | "telegram" | "instagram" {
    const iconMap: Record<
        string,
        "whatsapp" | "facebook" | "vk" | "telegram" | "instagram"
    > = {
        whatsapp: "whatsapp",
        facebook: "facebook",
        fb: "facebook",
        vk: "vk",
        vkontakte: "vk",
        telegram: "telegram",
        tg: "telegram",
        instagram: "instagram",
        ig: "instagram",
    };
    return iconMap[slug.toLowerCase()] ?? "whatsapp";
}

// Helper: Generate sparkline data based on balance
function generateSparklineData(balance: number): number[] {
    // Generate a simple sparkline based on balance
    // In a real app, this would come from historical transaction data
    const base = Math.min(balance / 100, 50);
    return Array.from({ length: 14 }, (_, i) =>
        Math.max(2, Math.round(base * (0.5 + Math.random() * 0.5))),
    );
}
