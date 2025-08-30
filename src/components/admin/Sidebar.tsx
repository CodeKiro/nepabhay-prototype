"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Shield,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { signOut } from "@/lib/auth/signout";
import { paths } from "@/config/paths";

const navigation = [
  { name: "Dashboard", href: paths.admin.dashboard, icon: LayoutDashboard },
  { name: "Posts", href: paths.admin.posts, icon: FileText },
  { name: "Users", href: paths.admin.users, icon: Users },
  { name: "Comments", href: paths.admin.comments, icon: MessageSquare },
  { name: "Feedback", href: paths.admin.feedback, icon: MessageSquare },
  { name: "Settings", href: paths.admin.settings, icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] flex flex-col bg-white transition-all duration-300 shadow-lg",
        "hidden md:flex", // Hide on mobile, show on medium screens and up
        isMinimized ? "w-16" : "w-64"
      )}
    >
      {/* Header with minimize button - with shadow separator */}
      <div className="flex items-center justify-between px-4 py-4 shadow-sm border-b border-gray-50 bg-white relative">
        {!isMinimized && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-800">
              Admin
            </span>
          </div>
        )}

        {isMinimized && (
          <div className="flex items-center justify-center w-full">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <Shield className="h-5 w-5 text-white" />
            </div>
          </div>
        )}

        {!isMinimized && (
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ChevronsLeft className="h-6 w-6 text-gray-700 font-bold" />
          </button>
        )}
      </div>

      {/* Floating expand button when minimized */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute -right-4 top-6 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <ChevronsRight className="h-5 w-5 text-gray-600 font-bold" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                "hover:shadow-lg hover:shadow-blue-500/10",
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              )}
              title={isMinimized ? item.name : undefined}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isMinimized ? "mx-auto" : "mr-3",
                  isActive && "text-white",
                  !isActive && "group-hover:scale-110"
                )}
              />
              {!isMinimized && (
                <span className="transition-opacity duration-200">
                  {item.name}
                </span>
              )}

              {/* Active indicator for minimized state */}
              {isMinimized && isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-l-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 space-y-1">
        <Link
          href={paths.home}
          className={cn(
            "flex items-center px-3 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-md",
            isMinimized && "justify-center"
          )}
          title={isMinimized ? "Back to Site" : undefined}
        >
          {!isMinimized ? "← Back to Site" : <span className="text-lg">←</span>}
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: paths.home })}
          className={cn(
            "flex items-center w-full px-3 py-2.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-md",
            isMinimized && "justify-center"
          )}
          title={isMinimized ? "Sign Out" : undefined}
        >
          <LogOut className={cn("h-4 w-4", !isMinimized && "mr-2")} />
          {!isMinimized && "Sign Out"}
        </button>
      </div>
    </div>
  );
}
