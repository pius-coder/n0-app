import { LoginForm } from "@/client/components/features/auth";

export const metadata = {
  title: "Connexion - _n0",
  description: "Connectez-vous à votre compte _n0 pour gérer vos numéros.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
