import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Century Portal - Administrative Dashboard",
  description: "A comprehensive administrative portal for managing members, lanes, and workers with advanced analytics and real-time monitoring capabilities.",
  keywords: ["admin portal", "dashboard", "management", "analytics", "century portal"],
  authors: [{ name: "Century Portal Team" }],
  robots: "noindex, nofollow",
};

// ✅ Next.js 15 — viewport must be a separate export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
