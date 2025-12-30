import React from "react";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care Platform",
  description: "Plataforma para cuidadores e contratantes",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <AppHeader />
          {children}
          <AppFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
