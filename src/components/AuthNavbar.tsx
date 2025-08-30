"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { paths } from "@/config/paths";
import { Home, ArrowLeft, Menu, X } from "lucide-react";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

export function AuthNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Click outside to close mobile menu
  const mobileMenuRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickLinks = [
    { name: "Home", href: paths.home, icon: Home },
    { name: "About", href: "/about", icon: Home },
    { name: "Help", href: "/help", icon: Home },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/10"
          : "bg-white shadow-sm border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-all duration-200"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo - Desktop left, Mobile center with proper flex layout */}
          <div className="flex-1 flex justify-center md:flex-none md:justify-start md:order-first">
            <Link
              href={paths.home}
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <Image
                  src="/logo/lightLogo.svg"
                  alt="Nepa:Bhay Logo"
                  width={120}
                  height={40}
                  className="h-6 sm:h-8 w-auto transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <Link href={paths.home} className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
            </Button>
          </div>

          {/* Mobile back button - right side */}
          <div className="md:hidden w-10 flex justify-end">
            <Link
              href={paths.home}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-14 sm:top-16 z-40">
            {/* Enhanced backdrop with blur and opacity */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
            ></div>

            {/* Enhanced Menu Container */}
            <div
              ref={mobileMenuRef}
              className="absolute left-4 right-4 top-4 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[calc(100vh-120px)] overflow-hidden transform transition-all duration-300 scale-100"
            >
              {/* Menu header */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  Quick Access
                </h3>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  {quickLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:font-semibold hover:bg-blue-50 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-blue-100">
                        <item.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
