"use client";

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionPanel,
} from "@/client/components/ui/optics/accordion";

const faqs = [
    {
        question: "Comment puis-je acheter des crédits ?",
        answer: "Vous pouvez acheter des crédits directement depuis votre tableau de bord en utilisant Orange Money, MTN MoMo, une carte bancaire ou des cryptomonnaies (BTC, USDT). Les crédits sont ajoutés instantanément à votre compte après confirmation du paiement."
    },
    {
        question: "Que se passe-t-il si je ne reçois pas mon code OTP ?",
        answer: "Si vous ne recevez pas votre code SMS dans le temps imparti (généralement 15-20 minutes selon le service), la transaction est automatiquement annulée et vos crédits vous sont intégralement remboursés. Vous ne payez que pour les codes que vous recevez réellement."
    },
    {
        question: "Puis-je utiliser le même numéro plusieurs fois ?",
        answer: "Les numéros fournis sont destinés à une utilisation unique pour la vérification OTP. Une fois la session terminée, le numéro n'est plus accessible. Pour les services nécessitant une vérification récurrente, nous conseillons d'utiliser nos options de location longue durée."
    },
    {
        question: "Quels pays sont disponibles ?",
        answer: "Nous proposons des numéros de plus de 150 pays, incluant la France, les États-Unis, le Canada, ainsi que de nombreux pays africains comme la Côte d'Ivoire, le Sénégal, le Cameroun et le Mali."
    },
    {
        question: "Est-ce anonyme ?",
        answer: "Oui, l'utilisation de _n0 permet de protéger votre identité. Le service que vous enregistrez ne verra que le numéro virtuel, gardant votre numéro personnel privé et à l'abri du spam."
    }
];

export function LandingFAQ() {
    return (
        <section className="py-24 max-w-4xl mx-auto px-4 space-y-12">
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tighter">
                    Questions <span className="text-primary">Fréquentes</span>
                </h2>
                <p className="text-lg text-muted-foreground font-medium">
                    Tout ce que vous devez savoir sur n0.app et nos services OTP.
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-border">
                        <AccordionTrigger className="text-xl font-bold py-6 text-foreground">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionPanel className="text-muted-foreground text-lg leading-relaxed pb-6">
                            {faq.answer}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}

