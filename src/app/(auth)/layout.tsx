import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "💰 Budget Tracker",
  description: "Kelola keuangan Anda dengan mudah dan efektif",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <main className="flex h-screen w-full items-center justify-center bg-linear-to-r/decreasing from-indigo-500 to-teal-400 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
