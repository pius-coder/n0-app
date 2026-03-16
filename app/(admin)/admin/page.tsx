import { Card, CardHeader, CardTitle, CardContent } from "@/client/components/ui/optics/card";
import { Users, Smartphone, CreditCard, TrendingUp } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Vue d'ensemble</h1>
                <p className="text-neutral-500 font-medium">Bienvenue dans votre centre de contrôle, Admin.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Utilisateurs Totaux", value: "1,284", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Numéros Actifs", value: "432", icon: Smartphone, color: "text-green-500", bg: "bg-green-500/10" },
                    { label: "Chiffre d'Affaires", value: "854,000 FCFA", icon: CreditCard, color: "text-amber-500", bg: "bg-amber-500/10" },
                    { label: "Taux de Conversion", value: "12.5%", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
                ].map((stat, i) => (
                    <Card key={i} className="bg-neutral-900/40 border-neutral-800 shadow-2xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                                {stat.label}
                            </CardTitle>
                            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                                <stat.icon className="size-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tighter">{stat.value}</div>
                            <p className="text-[10px] text-green-500 font-bold mt-1 flex items-center gap-1">
                                <TrendingUp className="size-3" /> +14% depuis hier
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Placeholder for real data charts/tables */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <Card className="lg:col-span-4 bg-neutral-900/40 border-neutral-800 h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-2">
                        <div className="size-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="size-6 text-neutral-500" />
                        </div>
                        <p className="text-sm font-bold text-neutral-400">Graphique de croissance</p>
                        <p className="text-xs text-neutral-600">En attente de connexion au flux de données réel.</p>
                    </div>
                </Card>
                <Card className="lg:col-span-3 bg-neutral-900/40 border-neutral-800 h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-2">
                        <div className="size-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                            <Users className="size-6 text-neutral-500" />
                        </div>
                        <p className="text-sm font-bold text-neutral-400">Derniers utilisateurs</p>
                        <p className="text-xs text-neutral-600">Aucune activité récente à afficher.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
