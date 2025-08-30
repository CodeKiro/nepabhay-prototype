import { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  MessageCircle,
  Users,
  Heart,
  Code,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Nepa:Bhay",
  description:
    "Get in touch with the Nepa:Bhay team for collaboration, contributions, and inquiries about preserving Nepali languages and culture",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Contact <span className="text-red-500">Us</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            We&rsquo;d love to hear from you. Reach out for collaboration,
            contributions, or any inquiries about our mission.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Primary Contact */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                Primary Contact
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                For contributions, collaborations, and general inquiries
              </p>
              <Link
                href="mailto:nepabhay2025@gmail.com"
                className="text-red-600 hover:text-red-700 font-medium text-base md:text-lg transition-colors"
              >
                nepabhay2025@gmail.com
              </Link>
            </div>
          </div>

          {/* Quick Inquiry */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                Quick Inquiry
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                For urgent questions and immediate assistance
              </p>
              <div className="space-y-2">
                <Link
                  href="mailto:mysticmilan369@gmail.com"
                  className="block text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base transition-colors"
                >
                  mysticmilan369@gmail.com
                </Link>
                <div className="flex items-center justify-center space-x-4 mt-3">
                  <Link
                    href="https://wa.me/9779741696042"
                    className="flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
                  >
                    WhatsApp
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link
                    href="viber://chat?number=+9779741696042"
                    className="flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                  >
                    Viber
                  </Link>
                </div>
                <p className="text-gray-600 text-sm mt-2">+977-9741696042</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              Connect With Us
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              Follow us on social media for updates and community engagement
            </p>
            <div className="flex justify-center space-x-6">
              <Link
                href="https://facebook.com/nepabhay"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2"
                aria-label="Facebook"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href="https://x.com/nepabhay"
                className="text-gray-600 hover:text-blue-400 transition-colors duration-200 p-2"
                aria-label="Twitter"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="https://www.tiktok.com/@nepabhay"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2"
                aria-label="TikTok"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/nepabhay"
                className="text-gray-600 hover:text-pink-600 transition-colors duration-200 p-2"
                aria-label="Instagram"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Explore More */}
        <div className="text-center mb-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-8">
            Explore More
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/about"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-blue-200 hover:border-blue-300"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
                <Info className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                About Us
              </h4>
              <p className="text-sm text-gray-600">Our mission & story</p>
            </Link>

            <Link
              href="/team"
              className="group bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-red-200 hover:border-red-300"
            >
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 transition-colors">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                Our Team
              </h4>
              <p className="text-sm text-gray-600">Meet the people</p>
            </Link>

            <Link
              href="/contribute"
              className="group bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-gray-300"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-900 transition-colors">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                Contribute
              </h4>
              <p className="text-sm text-gray-600">Make an impact</p>
            </Link>

            <Link
              href="/join-us"
              className="group bg-gradient-to-br from-blue-50 to-red-50 hover:from-blue-100 hover:to-red-100 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-blue-200 hover:border-red-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-600 group-hover:to-red-600 transition-all">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                Join Us
              </h4>
              <p className="text-sm text-gray-600">Be part of it</p>
            </Link>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm md:text-base">
            We typically respond within 24-48 hours. Thank you for your interest
            in preserving Nepali languages and culture!
          </p>
        </div>
      </div>
    </div>
  );
}
