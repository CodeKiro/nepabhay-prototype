"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-red-50 via-white to-blue-50">
        <div className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 md:px-6">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center">
            <div className="mb-4 sm:mb-6">
              <AlertTriangle className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-red-500 mx-auto mb-3 md:mb-4" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                <span className="text-red-500">Something</span>{" "}
                <span className="text-blue-600">Went Wrong</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                We encountered an unexpected error. Please try again.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={reset}
                className="w-full flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Try Again
              </button>

              <Link
                href="/"
                className="w-full flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-md hover:bg-gray-200 transition-colors"
              >
                <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Go Home
              </Link>
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-500">
                If this problem persists, please contact support at{" "}
                <a
                  href="mailto:nepabhay2025@gmail.com"
                  className="text-blue-600 hover:text-blue-800 break-all"
                >
                  nepabhay2025@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
