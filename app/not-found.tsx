import Link from "next/link";
import { Button } from "@/client/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold font-mono">404</h1>
      <p className="mt-4 text-lg text-neutral-600">Page introuvable</p>
      <Link href="/" className="mt-8">
        <Button variant="primary">Retour à l&apos;accueil</Button>
      </Link>
    </div>
  );
}
