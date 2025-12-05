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
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "256x256", type: "image/png" },
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
