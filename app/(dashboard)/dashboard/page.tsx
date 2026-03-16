import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { UserHomeService } from "@/server/services";
import { getIdentity } from "@/server/helpers";
import { ROUTES } from "@/shared/constants";
import {
  UserHomeHeader,
  UserHomeView,
  UserHomeSkeleton,
} from "@/client/components/features/user-home";

export const metadata: Metadata = {
  title: "_n0 — Accueil",
  description: "Gérez vos numéros virtuels et services",
};

async function UserHomeContent() {
  const identity = await getIdentity();

  if (!identity) {
    redirect(ROUTES.LOGIN);
  }

  const result = await UserHomeService.getPageData(identity.userId);

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
