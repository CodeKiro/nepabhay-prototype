"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-blue-50 via-white to-red-50">
        <div className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 md:px-6">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center">
            <div className="mb-4 sm:mb-6">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-300 mb-3 md:mb-4">
                404
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                <span className="text-red-500">Page</span>{" "}
                <span className="text-blue-600">Not Found</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                The page you&apos;re looking for doesn&apos;t exist or has been
                moved.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Link
                href="/"
                className="w-full flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors"
              >
                <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Go Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="w-full flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-md hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Go Back
              </button>
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                Popular Pages:
              </h3>
              <div className="space-y-1">
                <Link
                  href="/lessons"
                  className="block text-xs sm:text-sm text-blue-600 hover:text-blue-800"
                >
                  Learn Newa Language
                </Link>
                <Link
                  href="/articles"
                  className="block text-xs sm:text-sm text-blue-600 hover:text-blue-800"
                >
                  Read Articles
                </Link>
                <Link
                  href="/quiz"
                  className="block text-xs sm:text-sm text-blue-600 hover:text-blue-800"
                >
                  Take Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
