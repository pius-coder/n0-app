import { Card, CardHeader, CardTitle, CardContent } from "@/client/components/ui";

export const metadata = { title: "Inscription" };

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscription</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: <RegisterForm /> */}
        <p className="text-sm text-neutral-500">Register form coming soon...</p>
      </CardContent>
    </Card>
  );
}
