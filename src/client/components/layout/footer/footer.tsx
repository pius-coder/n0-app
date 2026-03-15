import { APP_CONFIG } from "@/shared/constants";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} {APP_CONFIG.name}. Tous droits réservés.
      </div>
    </footer>
  );
}
