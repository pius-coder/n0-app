import { Suspense } from "react";
import type { Metadata } from "next";
import { UserHomeService } from "@/server/services";
import {
  UserHomeHeader,
  UserHomeView,
  UserHomeSkeleton,
} from "@/client/components/features/user-home";

export const metadata: Metadata = {
  title: "_n0 — Accueil",
  description: "Gérez vos numéros virtuels et services",
};

// TODO: Replace "demo-user" with real session userId
async function UserHomeContent() {
  const result = await UserHomeService.getPageData("demo-user");

  if (!result.ok) {
    return (
      <div className="flex items-center justify-center px-5 py-20 text-center">
        <p className="text-sm text-brand-muted">{result.error.message}</p>
      </div>
    );
  }

  return <UserHomeView initialData={result.data} />;
}

export default function HomePage() {
  return (
    <>
      <UserHomeHeader />
      <Suspense fallback={<UserHomeSkeleton />}>
        <UserHomeContent />
      </Suspense>
    </>
  );
}
