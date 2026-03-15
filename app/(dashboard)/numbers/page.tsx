import { NumberGrid } from "@/client/components/features/numbers";
import { NumberService } from "@/server/services";

export const metadata = { title: "Numéros" };

export default async function NumbersPage() {
  const result = await NumberService.search({ page: 1, pageSize: 20 });

  const numbers = result.ok ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Numéros disponibles</h1>
      </div>
      <NumberGrid numbers={numbers} />
    </div>
  );
}
