"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { useAuth } from "@/client/hooks/features/auth/use-auth";
import { ShieldCheck, Smartphone, Landmark, LayoutGrid, User } from "lucide-react";

type NavItemConfig = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

export function BottomNav() {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();

  const navItems: NavItemConfig[] = [
    {
      id: "home",
      label: "Accueil",
      href: ROUTES.dashboard.home,
      icon: <LayoutGrid className="size-5" />
    },
    {
      id: "recharges",
      label: "Recharges",
      href: ROUTES.pricing,
      icon: <Landmark className="size-5" />
    },
    {
      id: "numbers",
      label: "Numéros",
      href: ROUTES.dashboard.numbers,
      icon: <Smartphone className="size-5" />
    },
    ...(isAdmin ? [{
      id: "admin",
      label: "Admin",
      href: ROUTES.ADMIN,
      icon: <ShieldCheck className="size-5" />
    }] : []),
    {
      id: "profile",
      label: "Profil",
      href: ROUTES.dashboard.settings,
      icon: <User className="size-5" />
    }
  ];

  return (
    <nav
      className="sticky bottom-0 z-20 flex justify-around border-t border-brand-border bg-brand-bg/90 pb-safe pt-2 backdrop-blur-xl"
      aria-label="Navigation principale"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={[
              "flex flex-col items-center gap-1 rounded-xl px-2 py-2 transition-all active:scale-95 min-w-[64px]",
              isActive ? "text-primary" : "text-brand-text/50 hover:text-brand-text",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon}
            <span
              className={[
                "text-[9px] font-bold tracking-tight uppercase",
                isActive ? "text-primary" : "",
              ].join(" ")}
            >
              {item.label}
            </span>
            {isActive && (
              <span className="h-1 w-1 rounded-full bg-primary mt-0.5" aria-hidden />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
