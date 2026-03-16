"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/client/lib/utils";
import { AppLogo } from "@/client/components/common/app-logo";
import { ROUTES } from "@/shared/constants/routes";

type SidebarItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
    {
        label: "Accueil",
        href: ROUTES.dashboard.home,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
    {
        label: "Numéros",
        href: ROUTES.dashboard.numbers,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 5 5l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        ),
    },
    {
        label: "Tarifs & Recharges",
        href: ROUTES.pricing,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
        ),
    },
    {
        label: "Paramètres",
        href: ROUTES.dashboard.settings,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
];

export function DesktopSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 bg-brand-bg border-r border-brand-border h-screen">
            <div className="p-6">
                <AppLogo size="md" />
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {SIDEBAR_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-sans text-sm font-medium",
                                isActive
                                    ? "bg-brand-surface2 text-brand-text shadow-sm"
                                    : "text-brand-text/50 hover:bg-brand-surface2/50 hover:text-brand-text"
                            )}
                        >
                            <span className={cn(isActive ? "text-brand-text" : "text-brand-text/40")}>
                                {item.icon}
                            </span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <div className="rounded-2xl bg-brand-surface p-4 border border-brand-border/40">
                    <p className="text-xs font-medium text-brand-text/40 mb-3">Besoin d'aide ?</p>
                    <button className="w-full py-2 bg-brand-surface2 text-brand-text text-[13px] font-bold rounded-xl transition-all active:scale-95">
                        Support Client
                    </button>
                </div>
            </div>
        </aside>
    );
}
