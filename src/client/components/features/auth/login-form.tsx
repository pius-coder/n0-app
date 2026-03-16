"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/server/actions/auth.actions";
import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "@/client/stores/auth.store";
import { Button } from "@/client/components/ui/optics/button";
import { Input } from "@/client/components/ui/optics/input";
import { Label } from "@/client/components/ui/optics/label";
import { Card } from "@/client/components/ui/optics/card";
import { toast } from "sonner";
import { AtSign, Lock, ArrowRight, Loader2 } from "lucide-react";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const setUser = useAuthStore((s) => s.setUser);

    const callbackUrl = searchParams.get("callbackUrl") || ROUTES.dashboard.home;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsPending(true);

        try {
            const result = await loginAction({ email, password });

            if (result.error) {
                toast.error(result.error);
            } else if (result.data) {
                setUser(result.data);
                toast.success("Connexion réussie");
                router.push(callbackUrl);
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
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-blue" />

            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-brand-text mb-2 tracking-tight">Bon retour !</h1>
                <p className="text-sm text-brand-muted">Accédez à votre espace _n0</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                            className="pl-10 bg-brand-bg/50 border-brand-border focus:ring-brand-purple/20 transition-all"
                            variant={undefined}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                        <Label htmlFor="password" title="Mot de passe" className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                            Mot de passe
                        </Label>
                        <Link
                            href={ROUTES.auth.forgot}
                            className="text-[11px] font-medium text-brand-indigo hover:text-brand-purple transition-colors"
                        >
                            Oublié ?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-hint" />
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                            className="pl-10 bg-brand-bg/50 border-brand-border focus:ring-brand-purple/20 transition-all"
                            variant={undefined}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11 bg-brand-text text-white hover:bg-neutral-800 rounded-xl font-bold transition-all active:scale-[0.98] group"
                >
                    {isPending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <>
                            Se connecter
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-brand-muted">
                    Pas encore de compte ?{" "}
                    <Link
                        href={ROUTES.auth.register}
                        className="font-bold text-brand-text hover:text-brand-indigo transition-colors"
                    >
                        Créer un compte
                    </Link>
                </p>
            </div>
        </Card>
    );
}
