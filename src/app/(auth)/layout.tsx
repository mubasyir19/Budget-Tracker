import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "💰 Budget Tracker",
  description: "Kelola keuangan Anda dengan mudah dan efektif",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      {children}
      <Toaster position="bottom-right" richColors />
    </main>
  );
}
