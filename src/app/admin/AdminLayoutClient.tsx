"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { paths } from "@/config/paths";
import { Sidebar } from "@/components/admin/Sidebar";
import {
  Home,
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Settings,
} from "lucide-react";
import { signOut } from "@/lib/auth/signout";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

// Admin navigation items
const adminNavigation = [
  { name: "Dashboard", href: paths.admin.dashboard, icon: LayoutDashboard },
  { name: "Posts", href: paths.admin.posts, icon: FileText },
  { name: "Users", href: paths.admin.users, icon: Users },
  { name: "Comments", href: paths.admin.comments, icon: MessageSquare },
  { name: "Feedback", href: paths.admin.feedback, icon: MessageSquare },
  { name: "Settings", href: paths.admin.settings, icon: Settings },
];

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Click outside to close mobile menu
  const mobileMenuRef = useClickOutside<HTMLDivElement>(() => {
    setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
  }, [router]);

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push(paths.auth.signin);
      return;
    }

    if (session.user?.role !== "admin") {
      router.push(paths.home);
      return;
    }
  }, [session, status, router]);

  // Show loading while checking auth
  if (status === "loading") {
    return <Loading />;
  }

  // Don't render admin content if not authorized
  if (!session || session.user?.role !== "admin") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">
            You don&apos;t have permission to access this area.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Admin Navbar - Enhanced with mobile responsiveness */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-secondary/10"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Logo - properly centered with mobile responsiveness */}
            <div className="flex-1 flex justify-center md:flex-none md:justify-start">
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
                    className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
                  />
                  {/* Nepal flag inspired accent */}
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
                {/* Admin badge */}
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Admin
                </span>
              </Link>
            </div>

            {/* Right side - User profile dropdown */}
            <div className="flex items-center space-x-4">
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`flex items-center space-x-2 text-black hover:font-semibold ${
                        !isScrolled ? "border-0" : ""
                      }`}
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden md:inline">
                        {session.user?.name}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white border border-black shadow-xl"
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href={paths.profile}
                        className="flex items-center space-x-2 text-black hover:font-semibold relative group"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-red-500 transition-all duration-200 group-hover:w-full"></span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={paths.home}
                        className="flex items-center space-x-2 text-black hover:font-semibold relative group"
                      >
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-red-500 transition-all duration-200 group-hover:w-full"></span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: paths.home })}
                      className="flex items-center space-x-2 text-black hover:font-semibold relative group"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-red-500 transition-all duration-200 group-hover:w-full"></span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </div>
          </div>
        </div>

        {/* Mobile Admin Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-40">
            {/* Enhanced backdrop with blur and opacity */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Enhanced Menu Container */}
            <div
              ref={mobileMenuRef}
              className="absolute left-4 right-4 top-4 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[calc(100vh-120px)] overflow-hidden transform transition-all duration-300 scale-100"
            >
              {/* Menu header with admin badge */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Admin Panel
                  </h3>
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                    Admin
                  </span>
                </div>
              </div>

              <div className="p-4">
                {/* Admin Navigation Items */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                    Admin Navigation
                  </h4>
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:font-semibold hover:bg-blue-50 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="space-y-2 border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                    Quick Actions
                  </h4>

                  <Link
                    href={paths.profile}
                    className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:font-semibold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium">Profile</span>
                  </Link>

                  <Link
                    href={paths.home}
                    className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:font-semibold hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100">
                      <Home className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium">Back to Site</span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut({ callbackUrl: paths.home });
                    }}
                    className="flex items-center space-x-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-100">
                      <LogOut className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main admin layout with sidebar */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-white md:ml-0">
          <div className="p-3 sm:p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
