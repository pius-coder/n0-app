"use client";

import { useRouter } from "next/navigation";
import type { UserHomeData } from "@/shared/types";
import { ROUTES } from "@/shared/constants/routes";
import { ServerCard } from "./server-card";
import { BalanceCard } from "./balance-card";
import { ServicesSection } from "./services-section";

type UserHomeViewProps = {
  initialData: UserHomeData;
};

export function UserHomeView({ initialData }: UserHomeViewProps) {
  const router = useRouter();

  function handleRecharge() {
    router.push(ROUTES.pricing);
  }

  function handleViewNumbers() {
    router.push(ROUTES.dashboard.numbers);
  }

  function handleServicePress(id: string) {
    router.push(`${ROUTES.dashboard.numbers}?service=${id}`);
  }

  return (
    <div className="flex flex-col gap-4 px-5 pb-6">
      <BalanceCard balance={initialData.balance} />

      <ServerCard
        server={initialData.server}
        onRecharge={handleRecharge}
        onViewNumbers={handleViewNumbers}
      />
      <ServicesSection
        services={initialData.services}
        onServicePress={handleServicePress}
      />
    </div>
  );
}
