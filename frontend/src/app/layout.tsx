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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
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
