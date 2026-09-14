import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Yatra_One } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

import Aurora from "@/components/Aurora";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-yatra-one",
});

export const metadata: Metadata = {
  title: "Poseidon",
  description: "AI-powered marine sonar debris detection and geospatial reporting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} ${yatraOne.variable} font-sans bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-50 min-h-screen flex flex-col selection:bg-amber-500/30 transition-colors duration-300 relative`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <Aurora
              colorStops={["#F59E0B", "#F97316", "#D97706"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
          <AuthProvider>
            <Navbar />
            <div className="flex-1 flex flex-col relative z-0">
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
        <Toaster position="bottom-right" toastOptions={{ className: "font-sans" }} />
      </body>
    </html>
  );
}
