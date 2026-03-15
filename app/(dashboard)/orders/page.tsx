import { EmptyState } from "@/client/components/common";

export const metadata = { title: "Commandes" };

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mes commandes</h1>
      <EmptyState
        title="Aucune commande"
        description="Vos commandes apparaîtront ici."
      />
    </div>
  );
}
