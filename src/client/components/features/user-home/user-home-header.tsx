"use client";

import { AppLogo } from "@/client/components/common";
import { LogOut, LayoutGrid } from "lucide-react";
import { logoutAction } from "@/server/actions/auth.actions";
import { useAuth } from "@/client/hooks/features/auth/use-auth";

export function UserHomeHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-brand-bg px-5 pb-3 pt-5 lg:hidden">
      {/* Logo */}
      <AppLogo />

      {/* Actions */}
      <div className="flex items-center gap-3">
        {user && (
          <div className="flex flex-col items-end mr-1">
            <p className="text-[10px] font-bold text-brand-text truncate max-w-[100px]">{user.name || "Moi"}</p>
            <p className="text-[9px] text-brand-text/50 font-medium truncate max-w-[100px]">{user.phone}</p>
          </div>
        )}

        <form action={logoutAction}>
          <button
            aria-label="Logout"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-brand-surface shadow-sm transition-all active:scale-95 active:bg-brand-surface2"
          >
            <LogOut className="h-5 w-5 text-red-500/70" />
          </button>
        </form>
      </div>
    </header>
  );
}
