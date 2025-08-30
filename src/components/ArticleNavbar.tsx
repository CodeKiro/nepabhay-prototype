"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "@/lib/auth/signout";
import { Home, Info, User, LogOut, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { paths } from "@/config/paths";

interface ArticleNavbarProps {
  onSearch?: (query: string) => void;
}

export default function ArticleNavbar(props: ArticleNavbarProps) {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Props available for future search implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onSearch } = props;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Mobile hamburger button - Left side */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
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

          {/* Logo - Left side */}
          <div className="flex-1 flex justify-center md:flex-none md:justify-start md:order-first">
            <Link href="/articles" className="flex items-center group">
              <div className="relative flex-shrink-0 min-w-[100px] sm:min-w-[120px] flex justify-center md:justify-start">
                <Image
                  src="/logo/lightLogo.svg"
                  alt="Nepabhay"
                  width={120}
                  height={40}
                  className="h-6 sm:h-8 w-auto transition-transform duration-200 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right Side Actions - Home, About, Help Center, User Menu */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            {/* Home Link */}
            <div className="relative">
              <Link
                href={paths.home}
                className="flex items-center space-x-1 relative font-medium transition-all duration-200 hover:scale-105 text-black hover:text-secondary group"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
                {/* Nepal-inspired hover accent */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </div>

            {/* About Link */}
            <div className="relative">
              <Link
                href={paths.about}
                className="flex items-center space-x-1 relative font-medium transition-all duration-200 hover:scale-105 text-black hover:text-secondary group"
              >
                <Info className="h-4 w-4" />
                <span>About</span>
                {/* Nepal-inspired hover accent */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Help Center Link */}
            <div className="relative">
              <Link
                href={paths.helpCenter}
                className="flex items-center space-x-1 relative font-medium transition-all duration-200 hover:scale-105 text-black hover:text-secondary group"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Help Center</span>
                {/* Nepal-inspired hover accent */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </div>

            {/* User Menu */}
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
                <Button variant="outline" size="sm" asChild>
                  <Link href={paths.auth.signin}>Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={paths.auth.signup}>Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-14 sm:top-16 z-40">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* Menu Container */}
            <div className="absolute left-4 right-4 top-4 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[calc(100vh-120px)] overflow-hidden transform transition-all duration-300 scale-100">
              {/* Menu header */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  Articles Navigation
                </h3>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
                <div className="p-4">
                  {/* Navigation Items */}
                  <div className="space-y-2 mb-4">
                    <Link
                      href={paths.home}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100">
                        <Home className="h-5 w-5 text-gray-500" />
                      </div>
                      <span className="text-sm font-medium">Home</span>
                    </Link>

                    <Link
                      href={paths.about}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100">
                        <Info className="h-5 w-5 text-gray-500" />
                      </div>
                      <span className="text-sm font-medium">About</span>
                    </Link>

                    <Link
                      href={paths.helpCenter}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100">
                        <HelpCircle className="h-5 w-5 text-gray-500" />
                      </div>
                      <span className="text-sm font-medium">Help Center</span>
                    </Link>
                  </div>

                  {/* User Section */}
                  <div className="pt-4 border-t border-gray-100">
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
                        <div className="flex items-center space-x-3 p-3 mb-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500 shadow-lg shadow-red-500/25">
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
                          onClick={() => setIsMenuOpen(false)}
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
                            onClick={() => setIsMenuOpen(false)}
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
                            setIsMenuOpen(false);
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
                          className="flex items-center justify-center p-3 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700 text-sm font-semibold transition-all duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        {/* Sign Up Button */}
                        <Link
                          href={paths.auth.signup}
                          className="flex items-center justify-center p-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                          onClick={() => setIsMenuOpen(false)}
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
