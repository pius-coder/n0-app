import type { ReactNode } from "react";
import { BottomNav } from "@/client/components/layout/bottom-nav";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-brand-bg">
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
