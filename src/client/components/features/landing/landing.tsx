"use client";

import * as React from "react";
// import { LandingBackground } from "./landing-background";
import { LandingNavbar } from "./landing-navbar";
import { LandingHero } from "./landing-hero";
import { LandingLogos } from "./landing-logos";
import { LandingHowItWorks } from "./landing-how-it-works";
import { LandingStats } from "./landing-stats";
import { LandingPricing } from "./landing-pricing-tiers";
import { LandingFAQ } from "./landing-faq";
import { LandingCTA } from "./landing-cta";
import { LandingFooter } from "./landing-footer";
import { WaitlistModal } from "./waitlist-modal";
import { PromoBanner } from "./promo-banner";

export function Landing() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="antialiased min-h-screen flex flex-col items-center selection:bg-primary/20 selection:text-primary text-foreground bg-background/30 font-sans overflow-x-hidden">
            <PromoBanner />
            {/* <LandingBackground /> */}
            <LandingNavbar onJoinWaitlist={openModal} />

            <main className="w-full max-w-7xl pt-8 pb-16 px-4 md:px-6 space-y-24 md:space-y-48 mx-auto">
                <LandingHero onJoinWaitlist={openModal} />

                <div className="-mx-4 md:-mx-6">
                    <LandingLogos />
                </div>

                <LandingHowItWorks />

                <div className="px-2 md:px-0">
                    <LandingStats />
                </div>

                <LandingPricing />

                <LandingFAQ />

                <LandingCTA onJoinWaitlist={openModal} />
            </main>

            <LandingFooter />

            <WaitlistModal
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
}
