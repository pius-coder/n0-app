"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/client/lib/utils";
import { AppLogo } from "@/client/components/common/app-logo";
import { ROUTES } from "@/shared/constants/routes";
import { useAuth } from "@/client/hooks/features/auth/use-auth";
import { logoutAction } from "@/server/actions/auth.actions";
import { LogOut, ShieldCheck, HelpCircle } from "lucide-react";

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
    const { user, isAdmin } = useAuth();

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

                {isAdmin && (
                    <Link
                        href={ROUTES.ADMIN}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-sans text-sm font-medium",
                            pathname.startsWith(ROUTES.ADMIN)
                                ? "bg-amber-500/10 text-amber-600 shadow-sm"
                                : "text-brand-text/50 hover:bg-amber-500/5 hover:text-amber-600"
                        )}
                    >
                        <ShieldCheck className="size-5" />
                        Administration
                    </Link>
                )}
            </nav>

            <div className="p-4 space-y-4">
                {/* User Profile Summary */}
                {user && (
                    <div className="px-4 py-3 rounded-2xl bg-brand-surface border border-brand-border/40 flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold ring-2 ring-primary/5">
                            {user.name?.[0] || user.phone?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-bold text-brand-text truncate">{user.name || "Utilisateur"}</p>
                            <p className="text-[10px] text-brand-text/40 font-medium truncate">{user.phone}</p>
                        </div>
                    </div>
                )}

                <div className="rounded-2xl bg-brand-surface p-4 border border-brand-border/40">
                    <p className="text-xs font-medium text-brand-text/40 mb-3 flex items-center gap-2">
                        <HelpCircle className="size-3" /> Besoin d'aide ?
                    </p>
                    <button className="w-full py-2.5 bg-brand-surface2 text-brand-text text-[13px] font-bold rounded-xl transition-all active:scale-95 border border-brand-border/20 shadow-sm">
                        Support Client
                    </button>

                    <form action={logoutAction} className="mt-3">
                        <button className="w-full py-2 text-red-500/70 hover:text-red-500 text-[12px] font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                            <LogOut className="size-4" />
                            Déconnexion
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    );
}
