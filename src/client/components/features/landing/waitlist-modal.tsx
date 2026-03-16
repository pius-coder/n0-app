"use client";

import * as React from "react";
import { cn } from "@/client/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/client/components/ui/optics/button";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-all duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            <div
                className={cn(
                    "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[51] w-full max-w-md px-4 transition-all duration-500",
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                )}
            >
                <div className="bg-white rounded-[3rem] shadow-2xl p-10 flex flex-col items-center text-center relative overflow-hidden border border-gray-100 min-h-[480px] justify-center">

                    {/* Header Branding */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center font-mono">
                            <span className="text-4xl font-black tracking-tighter text-black">_n</span>
                            <span className="text-4xl font-black tracking-tighter text-blue-600">0</span>
                        </div>
                        <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mt-2">Zero Waiting Time</p>
                    </div>

                    {!isSuccess ? (
                        <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">
                            <h3 className="text-3xl font-black tracking-tight text-gray-900 mb-4">Rejoignez <span className="font-mono">n0.app</span></h3>
                            <p className="text-base text-gray-500 font-medium mb-10 leading-relaxed max-w-[300px]">
                                Inscrivez-vous pour être alerté dès que le service est ouvert dans votre pays.
                            </p>

                            <form onSubmit={handleSubmit} className="w-full space-y-4">
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-gray-400 uppercase ml-4 tracking-widest">Email professionnel</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="nom@exemple.com"
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-zinc-100 text-gray-900 placeholder:text-gray-400 font-bold focus:outline-none focus:border-blue-600 transition-all bg-zinc-50"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    size="lg"
                                    className="w-full rounded-2xl py-8 text-lg font-black group"
                                >
                                    {isSubmitting ? (
                                        <div className="size-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Accès Prioritaire <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                            <p className="mt-6 text-xs text-gray-400 font-medium italic">Paiements Mobile Money intégrés au lancement.</p>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center animate-in slide-in-from-bottom duration-500">
                            <div className="size-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="size-10 text-green-600" />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-4">C'est validé !</h3>
                            <p className="text-base text-gray-500 font-medium mb-10 leading-relaxed max-w-[280px]">
                                Nous avons bien reçu votre demande. Un email de confirmation vous a été envoyé.
                            </p>
                            <Button
                                onClick={onClose}
                                variant="raised"
                                className="px-12 rounded-2xl py-6 font-black"
                            >
                                Terminer
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
