import { getIdentity } from "@/server/helpers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/constants";
import { AppLogo } from "@/client/components/common";
import { ShieldAlert, Users, CreditCard, Smartphone, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const identity = await getIdentity();

    // Redundant safety check but good for type narrowing
    if (!identity || identity.role !== "ADMIN") {
        redirect(ROUTES.DASHBOARD);
    }

    return (
        <div className="flex min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500/30">
            {/* Admin Sidebar */}
            <aside className="w-64 border-r border-neutral-800/50 bg-neutral-900/50 backdrop-blur-xl hidden lg:flex flex-col fixed h-screen">
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <AppLogo />
                        <span className="text-[10px] font-black bg-amber-500 text-black px-1.5 py-0.5 rounded uppercase tracking-tighter">Admin</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-800 text-white font-bold text-sm transition-all border border-neutral-700/50 shadow-lg shadow-black/20">
                        <LayoutDashboard className="size-4" />
                        Tableau de Bord
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/50 font-medium text-sm transition-all text-left">
                        <Users className="size-4" />
                        Utilisateurs
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/50 font-medium text-sm transition-all text-left">
                        <Smartphone className="size-4" />
                        Inventaire SMS
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/50 font-medium text-sm transition-all text-left">
                        <CreditCard className="size-4" />
                        Transactions
                    </button>
                </nav>

                <div className="p-4 mt-auto">
                    <Link href={ROUTES.DASHBOARD} className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-500 hover:bg-amber-500/5 font-bold text-sm transition-all">
                        <ShieldAlert className="size-4" />
                        Quitter l'Admin
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
