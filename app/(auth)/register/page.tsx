import { RegisterForm } from "@/client/components/features/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "_n0 — Inscription",
  description: "Rejoignez _n0 dès aujourd'hui",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
