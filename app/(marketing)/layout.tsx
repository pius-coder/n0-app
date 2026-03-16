import { Header } from "@/client/components/layout";
import { Footer } from "@/client/components/layout";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4">{children}</main>
    </>
  );
}
