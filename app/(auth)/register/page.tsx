import { RegisterForm } from "@/client/components/features/auth";

export const metadata = {
  title: "Inscription - _n0",
  description: "Créez un compte _n0 pour acheter des numéros virtuels.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <RegisterForm />
    </div>
  );
}
