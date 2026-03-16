"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerAction } from "@/server/actions/auth.actions";
import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "@/client/stores/auth.store";
import { Button } from "@/client/components/ui/optics/button";
import { Input } from "@/client/components/ui/optics/input";
import { Label } from "@/client/components/ui/optics/label";
import { Card } from "@/client/components/ui/optics/card";
import { toast } from "sonner";
import { User, AtSign, Phone, Lock, ArrowRight, Loader2 } from "lucide-react";

export function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [isPending, setIsPending] = useState(false);

    const router = useRouter();
    const setUser = useAuthStore((s) => s.setUser);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        setIsPending(true);

        try {
            const result = await registerAction(formData);

            if (result.error) {
                toast.error(result.error);
            } else if (result.data) {
                setUser(result.data);
                toast.success("Compte créé avec succès");
                router.push(ROUTES.dashboard.home);
                router.refresh();
            }
        } catch (error) {
            toast.error("Une erreur est survenue");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Card className="w-full max-w-md p-8 border-brand-border bg-brand-surface/50 backdrop-blur-xl shadow-card overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-green via-brand-cyan to-brand-blue" />

            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-brand-text mb-2 tracking-tight">Bienvenue sur _n0</h1>
                <p className="text-sm text-brand-muted">Rejoignez la révolution de l'identité virtuelle</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-brand-muted ml-1">
                            Nom
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-hint" />
                            <Input
                                id="name"
                                placeholder="Jean"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="pl-10 bg-brand-bg/50 border-brand-border"
                                variant={undefined}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-brand-muted ml-1">
                            Téléphone
                        </Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-hint" />
                            <Input
                                id="phone"
                                placeholder="+225..."
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="pl-10 bg-brand-bg/50 border-brand-border"
                                variant={undefined}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-brand-muted ml-1">
                        Email
                    </Label>
                    <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-hint" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="pl-10 bg-brand-bg/50 border-brand-border"
                            variant={undefined}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" title="Mot de passe" className="text-xs font-semibold uppercase tracking-wider text-brand-muted ml-1">
                        Mot de passe
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-hint" />
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="pl-10 bg-brand-bg/50 border-brand-border"
                            variant={undefined}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" title="Confirmer le mot de passe" className="text-xs font-semibold uppercase tracking-wider text-brand-muted ml-1">
                        Confirmer
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-hint" />
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="pl-10 bg-brand-bg/50 border-brand-border"
                            variant={undefined}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11 bg-brand-text text-white hover:bg-neutral-800 rounded-xl font-bold transition-all active:scale-[0.98] group mt-2"
                >
                    {isPending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <>
                            Créer mon compte
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>
            </form>

            <div className="mt-8 text-center border-t border-brand-border pt-6">
                <p className="text-sm text-brand-muted">
                    Déjà un compte ?{" "}
                    <Link
                        href={ROUTES.auth.login}
                        className="font-bold text-brand-text hover:text-brand-indigo transition-colors"
                    >
                        Se connecter
                    </Link>
                </p>
            </div>
        </Card>
    );
}
