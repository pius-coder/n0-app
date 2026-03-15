import {
  HeroSms,
  UseCasePersonal,
  UseCaseBusiness,
  ResellerTiers,
  WhyUsComparison
} from "@/client/components/features/landing";

/**
 * Landing page assembler
 * Keep it STUPID - imports only.
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-700">
      <HeroSms />
      <UseCasePersonal />
      <UseCaseBusiness />
      <ResellerTiers />
      <WhyUsComparison />
    </main>
  );
}
