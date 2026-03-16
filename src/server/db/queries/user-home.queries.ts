// NOTE: Replace `db` with your actual Prisma client import once configured.
// import { db } from "@/server/db";

import type { UserHomeData } from "@/shared/types";
import { ServiceStatus, ServerStatus } from "@/shared/enums";

// ─── Mock data (replace with real DB calls) ───────────────────────────────────

const MOCK_USER_PAGE: UserHomeData = {
  server: {
    id: "srv-001",
    name: "Main Server",
    serverId: "fx_3400s_ac",
    status: ServerStatus.ONLINE,
    avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=main",
  },
  balance: {
    amount: 9321.32,
    currency: "USD",
    changePercent: 4.28,
    changeDirection: "up",
    sparklineData: [36, 34, 38, 30, 22, 26, 18, 10, 14, 8, 2, 6, 4, 2],
    updatedAt: new Date(),
  },
  services: [
    {
      id: "svc-001",
      name: "WhatsApp",
      subtitle: "Numéros virtuels",
      status: ServiceStatus.ACTIVE,
      iconKey: "whatsapp",
      numbersCount: 12,
    },
    {
      id: "svc-002",
      name: "Facebook",
      subtitle: "Numéros virtuels",
      status: ServiceStatus.ACTIVE,
      iconKey: "facebook",
      numbersCount: 8,
    },
    {
      id: "svc-003",
      name: "VK",
      subtitle: "Numéros virtuels",
      status: ServiceStatus.ACTIVE,
      iconKey: "vk",
      numbersCount: 5,
    },
  ],
};

export const UserHomeQueries = {
  /**
   * Fetch the full user-home aggregate for a given userId.
   * TODO: Replace mock with real Prisma query.
   */
  async findPageDataByUser(_userId: string): Promise<UserHomeData> {
    // return await db.user.findUnique({ where: { id: userId }, include: { server, balance, services } });
    return MOCK_USER_PAGE;
  },
};
