"use client";

import { AppLogo } from "@/client/components/common";

export function LandingFooter() {
    return (
        <footer className="w-full border-t border-border bg-background pt-24 pb-12 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2 space-y-8">
                    <AppLogo size="xl" />
                    <p className="text-muted-foreground font-medium max-w-sm text-xl leading-relaxed">
                        La plateforme n°1 pour sécuriser vos comptes avec des numéros virtuels en Afrique et dans le monde.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="size-12 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-border">
                            <span className="iconify text-2xl" data-icon="hugeicons:twitter"></span>
                        </a>
                        <a href="#" className="size-12 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-all border border-border">
                            <span className="iconify text-2xl" data-icon="hugeicons:whatsapp"></span>
                        </a>
                        <a href="#" className="size-12 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-border">
                            <span className="iconify text-2xl" data-icon="hugeicons:telegram"></span>
                        </a>
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-[0.2em]">Produit</h4>
                    <ul className="space-y-4">
                        <li><a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">Services supportés</a></li>
                        <li><a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">Tarifs crédits</a></li>
                        <li><a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">Disponibilité pays</a></li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-[0.2em]">Entreprise</h4>
                    <ul className="space-y-4">
                        <li><a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">À propos</a></li>
                        <li><a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">Aide & FAQ</a></li>
                        <li><a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">Mentions légales</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-16 mt-16 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-sm text-muted-foreground font-medium tracking-tight">
                    © {new Date().getFullYear()} <span className="text-foreground font-display font-bold">_n<span className="font-normal text-brand-muted">0</span></span> Ltd. Tous droits réservés. <span className="text-primary font-mono">n0.app</span>
                </div>
                <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    <span className="iconify text-3xl" data-icon="logos:orange-money"></span>
                    <span className="iconify text-3xl" data-icon="logos:mtn-momo"></span>
                    <span className="iconify text-3xl" data-icon="logos:bitcoin"></span>
                    <span className="iconify text-3xl" data-icon="logos:visa"></span>
                    <span className="iconify text-3xl" data-icon="logos:mastercard"></span>
                </div>
            </div>
        </footer>
    );
}
