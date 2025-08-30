"use client";

import Link from "next/link";
import Image from "next/image";
import { paths } from "@/config/paths";
import { Home, Info, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: paths.home, icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Help Center", href: "/help", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Auth Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/10"
            : "bg-white shadow-sm border-b border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Mobile hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:font-semibold focus:outline-none transition-all duration-200"
            >
              {isOpen ? (
                <svg
                  className="h-5 w-5"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Logo - Properly centered with no cutoff */}
            <div className="flex-1 flex justify-center md:flex-none md:justify-start md:order-first">
              <Link
                href={paths.home}
                className="flex items-center space-x-2 group"
              >
                <div className="relative flex-shrink-0 min-w-[100px] sm:min-w-[120px] flex justify-center md:justify-start">
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

            {/* Invisible spacer to balance hamburger button on mobile */}
            <div className="md:hidden w-10 h-10"></div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 relative transition-all duration-200 text-black hover:font-semibold group"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    {/* Red underline on hover */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </div>
              ))}
            </div>
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

            {/* Enhanced Menu Container with drop shadow */}
            <div
              ref={mobileMenuRef}
              className="absolute left-4 right-4 top-4 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[calc(100vh-120px)] overflow-hidden transform transition-all duration-300 scale-100"
            >
              {/* Menu header with subtle gradient */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  Navigation
                </h3>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
                {/* Navigation Items */}
                <div className="p-4">
                  <div className="space-y-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 relative group ${
                            isActive
                              ? "text-gray-900 font-semibold bg-blue-50 border border-blue-100"
                              : "text-gray-700 hover:font-semibold hover:bg-gray-50"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                              isActive
                                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                                : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                            }`}
                          >
                            <item.icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute right-3 w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          {/* Hover effect underline */}
                          <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>
    </div>
  );
}
