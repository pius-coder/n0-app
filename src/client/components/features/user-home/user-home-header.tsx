import { AppLogo } from "@/client/components/common";
import { MenuIcon } from "@/client/components/ui/icons";

export function UserHomeHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-brand-bg px-5 pb-3 pt-5 lg:hidden">
      {/* Logo */}
      <AppLogo />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-brand-surface shadow-sm transition-all active:scale-95 active:bg-brand-surface2"
        >
          <MenuIcon className="h-5 w-5 text-brand-text" />
        </button>
      </div>
    </header>
  );
}
