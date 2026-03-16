"use client";

import { Button } from "@/client/components/ui/optics/button";

interface LandingCTAProps {
    onJoinWaitlist: () => void;
}

export function LandingCTA({ onJoinWaitlist }: LandingCTAProps) {
    return (
        <section className="text-center py-12 space-y-8 bg-muted/50 rounded-[3rem] px-6 border border-border">
            <div className="space-y-4">
                <div className="inline-flex text-[10px] uppercase text-xs font-bold text-primary tracking-widest bg-primary/10 border-primary/20 border rounded-full py-1.5 px-6 items-center mx-auto mb-4">
                    Prêt pour n-zero ?
                </div>
                <h2 className="text-4xl font-bold text-foreground tracking-tighter md:text-7xl text-balance max-w-4xl mx-auto">
                    Simplifiez vos vérifications avec <span className="text-primary font-mono">_n0.</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-xl mx-auto font-medium">
                    Dites adieu aux attentes interminables. <span className="font-mono text-foreground">n0.app</span> vous livre vos codes OTP instantanément.
                </p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <Button
                    onClick={onJoinWaitlist}
                    size="lg"
                    className="rounded-full px-16 py-8 text-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-primary-foreground bg-primary"
                >
                    Créer un compte [Gratuit]
                </Button>
                <p className="text-sm text-muted-foreground font-semibold">Recharge Mobile Money supportée</p>
            </div>
        </section>
    );
}
