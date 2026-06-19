import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: 'MMTPL — Turnkey Industrial Contractor | Refractory, Steel & EPC Projects',
  description: 'Man Machine Technocrats Pvt. Ltd. (MMTPL) — India\'s leading turnkey industrial contractor since 2004. ₹348 Cr+ in contracts, 2,500+ workforce, projects across steel, cement, power and mining sectors. Headquarters in Mumbai.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
