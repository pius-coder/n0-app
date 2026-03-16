"use client";

import { Card } from "@/client/components/ui/optics/card";
import { Badge } from "@/client/components/ui/optics/badge";
import { Search, CreditCard, MessageSquare } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Sélectionnez un Service",
        description: "Choisissez parmi plus de 800 plateformes (WhatsApp, Facebook, Telegram...) et le pays du numéro désiré.",
        icon: Search,
        color: "primary"
    },
    {
        number: "02",
        title: "Achetez avec vos Crédits",
        description: (
            <>Utilisez vos crédits <span className="font-mono text-foreground">n0</span> pour réserver le numéro instantanément. Rechargez via Mobile Money ou Crypto.</>
        ),
        icon: CreditCard,
        color: "secondary"
    },
    {
        number: "03",
        title: "Recevez votre code OTP",
        description: "Copiez le numéro, demandez le code sur le service choisi, et recevez-le sur notre interface en 1 seconde.",
        icon: MessageSquare,
        color: "muted"
    }
];

export function LandingHowItWorks() {
    return (
        <section className="py-24 space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
                <Badge variant="outline" className="px-4 py-1 text-primary font-semibold border-primary/20 bg-primary/10">
                    Processus 100% Automatisé
                </Badge>
                <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tighter">
                    Comment ça <span className="text-primary">marche ?</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                    En trois étapes simples, obtenez un numéro opérationnel pour toutes vos vérifications SMS.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
                {steps.map((step, index) => (
                    <div key={index} className="relative group">
                        {index < steps.length - 1 && (
                            <div className="hidden md:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-0">
                                <div className="w-12 h-[2px] border-dashed border-t-2 border-border/50"></div>
                            </div>
                        )}
                        <Card className="bg-card rounded-[3rem] p-10 shadow-sm border border-border relative z-10 hover:shadow-md transition-all duration-500 h-full flex flex-col items-center text-center">
                            <div className="absolute top-6 right-8 text-4xl font-bold text-foreground/5 group-hover:text-foreground/10 transition-colors">
                                {step.number}
                            </div>

                            <div className={`size-16 rounded-2xl flex items-center justify-center mb-8 transform group-hover:-translate-y-2 transition-transform duration-500
                                ${step.color === 'primary' ? 'bg-primary/10 text-primary' :
                                    step.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                                        'bg-muted text-muted-foreground'}`}>
                                <step.icon className="size-8" />
                            </div>

                            <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                            <p className="text-muted-foreground font-medium leading-relaxed">
                                {step.description}
                            </p>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
}
