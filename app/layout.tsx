import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { InitTheme } from "@/components/InitTheme";
import DarkModeSync from "@/components/DarkModeSync";
import ThemeScript from "@/components/ThemeScript";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Savory Stories - Delicious Recipes & Culinary Adventures",
  description:
    "Discover mouth-watering recipes, cooking tips, and culinary inspiration for home chefs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`font-sans antialiased`}>
        <InitTheme />
        <DarkModeSync />
        <Header />
        {children}
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
