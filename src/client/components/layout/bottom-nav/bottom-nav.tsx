"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import type { NavId } from "@/shared/types/entities/user-home.types";

type NavItemConfig = {
  id: NavId;
  label: string;
  href: string;
  icon: React.ReactElement;
};

const NAV_ITEMS: NavItemConfig[] = [
  {
    id: "home",
    label: "Accueil",
    href: ROUTES.dashboard.home,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "recharges",
    label: "Recharges",
    href: ROUTES.pricing,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    id: "numbers",
    label: "Numéros",
    href: ROUTES.dashboard.numbers,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 5 5l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profil",
    href: ROUTES.dashboard.settings,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky bottom-0 z-20 flex justify-around border-t border-brand-border bg-brand-bg/90 pb-safe pt-2 backdrop-blur-xl"
      aria-label="Navigation principale"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={[
              "flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all active:scale-95",
              isActive ? "text-brand-text" : "text-brand-hint hover:text-brand-muted",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon}
            <span
              className={[
                "text-[10px] font-medium tracking-wide",
                isActive ? "font-bold" : "",
              ].join(" ")}
            >
              {item.label}
            </span>
            {isActive && (
              <span className="h-1 w-1 rounded-full bg-brand-text" aria-hidden />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
