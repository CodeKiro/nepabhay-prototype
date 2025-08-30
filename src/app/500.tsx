import Link from "next/link";
import { Server, Home, RefreshCw, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ServerErrorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-red-50 via-white to-blue-50">
        <div className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 md:px-6">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center">
            <div className="mb-4 sm:mb-6">
              <Server className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-red-500 mx-auto mb-3 md:mb-4" />
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-300 mb-2">
                500
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                <span className="text-red-500">Server</span>{" "}
                <span className="text-blue-600">Error</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                We&apos;re experiencing technical difficulties. Our team has
                been notified and is working to fix the issue.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Refresh Page
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
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                What you can do:
              </h3>
              <div className="text-xs sm:text-sm text-gray-600 space-y-2">
                <p>• Wait a few minutes and try again</p>
                <p>• Check if the issue persists</p>
                <p>• Contact us if the problem continues</p>
              </div>

              <div className="mt-3 sm:mt-4">
                <a
                  href="mailto:nepabhay2025@gmail.com"
                  className="inline-flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-800"
                >
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  nepabhay2025@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
