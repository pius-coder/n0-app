import { LoginForm } from "@/client/components/features/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "_n0 — Connexion",
  description: "Accédez à votre compte _n0",
};

export default function LoginPage() {
  return <LoginForm />;
}
