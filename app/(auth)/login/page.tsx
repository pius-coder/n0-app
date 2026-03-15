import { Card, CardHeader, CardTitle, CardContent } from "@/client/components/ui";

export const metadata = { title: "Connexion" };

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: <LoginForm /> */}
        <p className="text-sm text-neutral-500">Login form coming soon...</p>
      </CardContent>
    </Card>
  );
}
