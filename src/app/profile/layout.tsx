"use client";

import Link from "next/link";
import Image from "next/image";
import { paths } from "@/config/paths";
import { useState, useEffect } from "react";
import { Suspense } from "react";

import Loading from "@/components/ui/Loading";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Minimal Navbar - matches main navbar design exactly */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-secondary/10"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo - exact same as main navbar with proper mobile layout */}
            <div className="flex-1 flex justify-start">
              <Link
                href={paths.home}
                className="flex items-center space-x-2 group"
              >
                <div className="relative">
                  <Image
                    src="/logo/lightLogo.svg"
                    alt="Nepa:Bhay Logo"
                    width={120}
                    height={40}
                    className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
                  />
                  {/* Nepal flag inspired accent */}
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
              </Link>
            </div>

            {/* Minimal navigation - just back to home */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Link
                  href={paths.home}
                  className="flex items-center space-x-1 relative font-medium transition-all duration-200 hover:scale-105 text-black hover:text-secondary group"
                >
                  <span>Back to Home</span>
                  {/* Nepal-inspired hover accent */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
              <Loading size="md" showBrand={false} />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
      {/* No footer for profile pages */}
    </div>
  );
}
