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
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8 px-5 pb-6">
      {/* 1. Main Content Area */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        <BalanceCard
          balance={initialData.balance}
          className="lg:bg-brand-surface lg:rounded-3xl lg:shadow-sm"
        />

        <ServerCard
          server={initialData.server}
          onRecharge={handleRecharge}
          onViewNumbers={handleViewNumbers}
        />
      </div>

      {/* 2. Sidebar Area */}
      <div className="lg:col-span-4">
        <ServicesSection
          services={initialData.services}
          onServicePress={handleServicePress}
        />
      </div>
    </div>
  );
}
