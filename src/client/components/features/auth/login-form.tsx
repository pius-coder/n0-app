"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/server/actions";
import { Button } from "@/client/components/ui/optics/button";
import { Input } from "@/client/components/ui/optics/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/client/components/ui/optics/card";
import { toast } from "sonner";
import { ROUTES } from "@/shared/constants";

export function LoginForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(loginAction, null);

    useEffect(() => {
        if (state?.success) {
            toast.success("Connexion réussie");
            router.push(ROUTES.DASHBOARD);
            router.refresh();
        }
    }, [state, router]);

    return (
        <Card className="w-full max-w-md mx-auto border-neutral-200/50 shadow-xl bg-white/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
                    Connexion
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-neutral-700 ml-1">Téléphone</label>
                        <Input
                            name="phone"
                            placeholder="+221..."
                            variant="secondary"
                            autoComplete="tel"
                            className="bg-white/80"
                            disabled={isPending}
                        />
                        {state?.error?.phone && (
                            <p className="text-xs text-destructive font-medium mt-1 ml-1">
                                {state.error.phone[0]}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-neutral-700 ml-1">Mot de passe</label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            variant="secondary"
                            autoComplete="current-password"
                            className="bg-white/80"
                            disabled={isPending}
                        />
                        {state?.error?.password && (
                            <p className="text-xs text-destructive font-medium mt-1 ml-1">
                                {state.error.password[0]}
                            </p>
                        )}
                    </div>

                    {state?.serverError && (
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                            <p className="text-sm text-center text-destructive font-medium">
                                {state.serverError}
                            </p>
                        </div>
                    )}

                    <Button
                        className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.02]"
                        disabled={isPending}
                        type="submit"
                    >
                        {isPending ? "Identificaton..." : "Se connecter"}
                    </Button>

                    <p className="text-center text-sm text-neutral-500">
                        Pas encore de compte ?{" "}
                        <a href={ROUTES.REGISTER} className="text-neutral-900 font-semibold hover:underline">
                            S'inscrire
                        </a>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
