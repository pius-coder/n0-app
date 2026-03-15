import Link from "next/link";
import { APP_CONFIG } from "@/shared/constants";
import { ROUTES } from "@/shared/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href={ROUTES.home} className="text-xl font-bold font-mono">
          {APP_CONFIG.name}
        </Link>
        <nav className="flex items-center gap-6">
          <Link href={ROUTES.pricing} className="text-sm text-neutral-600 hover:text-neutral-900">
            Pricing
          </Link>
          <Link href={ROUTES.auth.login} className="text-sm text-neutral-600 hover:text-neutral-900">
            Connexion
          </Link>
        </nav>
      </div>
    </header>
  );
}
