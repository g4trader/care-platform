import React from "react";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";

export const metadata = {
  title: "Care Platform",
  description: "Plataforma para cuidadores e contratantes"
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
