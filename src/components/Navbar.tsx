"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth/signout";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  User,
  LogOut,
  Settings,
  Home,
  BookOpen,
  FileText,
  Brain,
  ArrowLeft,
  Info,
} from "lucide-react";
import { paths } from "@/config/paths";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

export function Navbar() {
  const { data: session, status } = useSession();
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

  const isProfilePage = pathname?.startsWith("/profile");

  const navItems = [
    { name: "Home", href: paths.home, icon: Home },
    { name: "Articles", href: paths.articles, icon: FileText },
    { name: "Lessons", href: paths.lessons, icon: BookOpen },
    { name: "Quiz", href: paths.quiz, icon: Brain },
    { name: "About", href: paths.about, icon: Info },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/10"
          : "bg-white shadow-sm border-b border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Mobile hamburger button - Left side OR Back to Home on Profile */}
          {isProfilePage ? (
            <Link
              href={paths.home}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          )}

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
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 relative font-medium transition-all duration-200 hover:scale-105 text-black hover:text-secondary group"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {/* Nepal-inspired hover accent */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </div>

          {/* Invisible spacer to balance hamburger button on mobile */}
          <div className="md:hidden w-10 h-10"></div>

          {/* User Menu - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden lg:inline text-sm">
                      {session.user?.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border border-gray-200 shadow-lg"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href={paths.profile}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {session.user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href={paths.admin.dashboard}
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: paths.home })}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="default" asChild>
                  <Link href={paths.auth.signin}>Sign In</Link>
                </Button>
                <Button size="default" asChild>
                  <Link href={paths.auth.signup}>Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && !isProfilePage && (
          <div className="md:hidden fixed inset-0 top-14 sm:top-16 z-40">
            {/* Enhanced backdrop with blur and opacity */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
            ></div>

            {/* Enhanced Menu Container with drop shadow and better spacing */}
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

                  {/* User Section */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    {status === "loading" ? (
                      <div className="flex items-center space-x-3 p-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
                          <div className="h-2 bg-gray-200 rounded animate-pulse w-2/3"></div>
                        </div>
                      </div>
                    ) : session ? (
                      <div className="space-y-2">
                        {/* User Profile */}
                        <div className="flex items-center space-x-3 p-3 mb-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500 shadow-lg shadow-blue-500/25">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900">
                              {session.user?.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              Welcome back!
                            </div>
                          </div>
                        </div>

                        {/* Profile Settings */}
                        <Link
                          href={paths.profile}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100">
                            <Settings className="h-5 w-5 text-gray-500" />
                          </div>
                          <span className="text-sm font-medium">
                            Profile Settings
                          </span>
                        </Link>

                        {session.user?.role === "admin" && (
                          <Link
                            href={paths.admin.dashboard}
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-all duration-200"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100">
                              <Settings className="h-5 w-5 text-gray-500" />
                            </div>
                            <span className="text-sm font-medium">
                              Admin Dashboard
                            </span>
                          </Link>
                        )}

                        {/* Sign Out Button */}
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            signOut({ callbackUrl: paths.home });
                          }}
                          className="flex items-center justify-center space-x-2 w-full p-3 mt-4 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Sign In Button */}
                        <Link
                          href={paths.auth.signin}
                          className="flex items-center justify-center p-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 text-sm font-semibold transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Link>
                        {/* Sign Up Button */}
                        <Link
                          href={paths.auth.signup}
                          className="flex items-center justify-center p-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                          onClick={() => setIsOpen(false)}
                        >
                          Get Started Free
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
