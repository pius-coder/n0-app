export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* TODO: <Sidebar /> */}
      <aside className="w-64 border-r border-neutral-200 bg-neutral-50 p-4">
        <p className="font-mono font-bold text-lg mb-8">_n0</p>
        <nav className="space-y-2 text-sm">
          <a href="/numbers" className="block rounded px-3 py-2 hover:bg-neutral-200">Numéros</a>
          <a href="/orders" className="block rounded px-3 py-2 hover:bg-neutral-200">Commandes</a>
          <a href="/settings" className="block rounded px-3 py-2 hover:bg-neutral-200">Paramètres</a>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
