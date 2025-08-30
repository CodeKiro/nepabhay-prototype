import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/lib/startup"; // Initialize database
import { ReduxProvider } from "@/lib/store/provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nepa:Bhay - Learn Newa Language",
  description:
    "Learn Newa language through interactive lessons, articles, and community-driven content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ReduxProvider>
          <SessionProvider>{children}</SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
