import type { ReactNode } from "react";
import { BottomNav } from "@/client/components/layout/bottom-nav";
import { DesktopSidebar } from "@/client/components/layout/sidebar/desktop-sidebar";
import { QueryProvider } from "@/client/providers";

type DashboardLayoutProps = {
    children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <QueryProvider>
            <div className="flex min-h-screen w-full bg-brand-bg">
                {/* 1. Desktop Sidebar */}
                <DesktopSidebar />

                {/* 2. Main content area */}
                <div className="mx-auto flex w-full flex-col lg:pl-64">
                    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 sm:py-6 overflow-y-auto">
                        {children}
                    </main>

                    {/* 3. Mobile Bottom Nav */}
                    <div className="block lg:hidden">
                        <BottomNav />
                    </div>
                </div>
            </div>
        </QueryProvider>
    );
}
