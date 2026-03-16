"use client";

import { GridContainer, GridItem } from "@/client/components/ui/optics/grid";
import { Card } from "@/client/components/ui/optics/card";
import { cn } from "@/client/lib/utils";
import {
  CreditCard,
  Smartphone,
  Coins,
  Lock,
  Zap,
  Globe2
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    id: 1,
    icon: Coins,
    title: "Achat de Crédits n0",
    description: "Chargez votre portefeuille _n0 et utilisez vos crédits pour réserver des numéros à tout moment. Simple et flexible.",
    color: "blue",
    decoration: (
      <div className="mt-8 flex justify-center gap-2">
        <span className="iconify text-4xl text-blue-500/20" data-icon="hugeicons:money-transfer-01"></span>
        <span className="iconify text-4xl text-blue-500/50 animate-bounce" data-icon="hugeicons:coins-01"></span>
        <span className="iconify text-4xl text-blue-500/20" data-icon="hugeicons:wallet-01"></span>
      </div>
    )
  },
  {
    id: 2,
    icon: CreditCard,
    title: "Paiements Locaux",
    description: "Payez en monnaie locale via Orange Money, MTN MoMo, ou utilisez vos cartes de crédit et Crypto (BTC).",
    color: "orange",
    decoration: (
      <div className="mt-8 grid grid-cols-3 gap-2 opacity-40">
        <div className="bg-orange-50 p-2 rounded-xl flex items-center justify-center">
          <span className="iconify text-2xl" data-icon="logos:orange-money"></span>
        </div>
        <div className="bg-orange-50 p-2 rounded-xl flex items-center justify-center">
          <span className="iconify text-2xl" data-icon="logos:bitcoin"></span>
        </div>
        <div className="bg-orange-50 p-2 rounded-xl flex items-center justify-center">
          <span className="iconify text-2xl" data-icon="logos:visa"></span>
        </div>
      </div>
    )
  },
  {
    id: 3,
    icon: Smartphone,
    title: "+800 Services",
    description: "Support complet pour Facebook, WhatsApp, Telegram, et des centaines d'autres plateformes mondiales.",
    color: "indigo",
    decoration: (
      <div className="mt-8 flex flex-wrap gap-2 justify-center opacity-30">
        <span className="iconify text-2xl" data-icon="logos:whatsapp-icon"></span>
        <span className="iconify text-2xl" data-icon="logos:facebook"></span>
        <span className="iconify text-2xl" data-icon="logos:telegram"></span>
        <span className="iconify text-2xl" data-icon="logos:netflix-icon"></span>
      </div>
    )
  },
  {
    id: 4,
    icon: Globe2,
    title: "Portée Mondiale",
    description: "Des numéros réels provenant de plus de 150 pays pour contourner toutes les restrictions géographiques.",
    color: "cyan",
    decoration: (
      <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em]">
        <span className="iconify text-3xl" data-icon="twemoji:flag-france"></span>
        <span className="iconify text-3xl" data-icon="twemoji:flag-united-states"></span>
        <span className="iconify text-3xl" data-icon="twemoji:flag-cote-divoire"></span>
      </div>
    )
  },
  {
    id: 5,
    icon: Lock,
    title: "Confidentialité n0",
    description: "Zéro trace. Utilisez _n0 pour protéger votre identité et éviter de partager votre numéro personnel.",
    color: "teal",
    decoration: (
      <div className="mt-8 flex items-center justify-center">
        <div className="relative size-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-teal-200 blur-2xl opacity-30"></div>
          <Lock className="size-8 text-teal-600 relative z-10" />
        </div>
      </div>
    )
  },
  {
    id: 6,
    icon: Zap,
    title: "Instantanéité Fatale",
    description: "Pas d'attente. Vos numéros sont générés et prêts à recevoir des SMS dès la confirmation d'achat.",
    color: "pink",
    decoration: (
      <div className="mt-8 text-center">
        <span className="text-4xl font-black text-pink-600/10 italic tracking-tighter">0.002s</span>
      </div>
    )
  }
];

export function LandingFeatures() {
  return (
    <section className="flex flex-col items-center">
      <div className="text-center space-y-4 mb-16 max-w-2xl px-4">
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter md:text-7xl">L'écosystème <span className="text-blue-600 font-mono">_n0</span></h2>
        <p className="text-lg text-gray-500 font-bold">
          Une infrastructure de classe mondiale pour vos besoins de vérification.
        </p>
      </div>

      <GridContainer
        cols={12}
        border={false}
        className="grid-cols-4 md:grid-cols-12 gap-8 md:gap-0 px-4 md:px-0"
      >
        {features.map((feature, index) => (
          <GridItem
            key={feature.id}
            span={12}
            className="md:col-span-4 h-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full p-2"
            >
              <Card className="bg-white rounded-[3rem] p-10 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between group hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2 h-full w-full overflow-hidden">
                <div className="space-y-6">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500",
                    feature.color === 'blue' && "bg-blue-50 text-blue-600",
                    feature.color === 'indigo' && "bg-indigo-50 text-indigo-600",
                    feature.color === 'orange' && "bg-orange-50 text-orange-600",
                    feature.color === 'cyan' && "bg-cyan-50 text-cyan-600",
                    feature.color === 'teal' && "bg-teal-50 text-teal-600",
                    feature.color === 'pink' && "bg-pink-50 text-pink-600",
                  )}>
                    <feature.icon className="size-7 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-gray-900">{feature.title}</h3>
                  <p className="text-lg text-gray-500 leading-relaxed font-bold">
                    {feature.description}
                  </p>
                </div>
                {feature.decoration}
              </Card>
            </motion.div>
          </GridItem>
        ))}
      </GridContainer>
    </section>
  );
}
