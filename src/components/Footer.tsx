import Link from "next/link";
import Image from "next/image";
import { paths } from "@/config/paths";

export function Footer() {
  const footerLinks = [
    {
      title: "Learn",
      links: [
        { name: "Home", href: paths.home },
        { name: "Lessons", href: paths.lessons },
        { name: "Articles", href: paths.articles },
        { name: "Quiz", href: paths.quiz },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "About", href: paths.about },
        { name: "Team", href: paths.team },
        { name: "Join Us", href: paths.joinUs },
        { name: "Contribute", href: paths.contribute },
        { name: "Partnership", href: paths.partnership },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: paths.contact },
        { name: "Help Center", href: paths.helpCenter },
        { name: "Feedback", href: paths.feedback },
        { name: "Credits", href: paths.credits },
        { name: "Privacy Policy", href: paths.legal.privacy },
        { name: "Terms of Service", href: paths.legal.terms },
      ],
    },
  ];

  return (
    <footer className="bg-black relative text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/35 via-transparent to-red-500/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={paths.home}
              className="flex items-center space-x-2 mb-4"
            >
              <Image
                src="/logo/fullWhiteLogo.svg"
                alt="Nepa:Bhay Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Learn Newa language and explore Nepal&apos;s rich linguistic
              heritage through interactive lessons, articles, and
              community-driven content.
            </p>
            <p className="text-white/70 text-xs mt-4">
              Built with <span className="text-red-400">❤️</span> by Milan
              Bishowkarma & Shristi Bajracharya
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="min-w-0">
              <h3
                className="text-base sm:text-lg font-bold mb-3 sm:mb-4"
                style={{ color: "#ef3b2d" }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xs sm:text-sm block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white text-xs sm:text-sm text-center sm:text-left">
            © 2025 <span className="text-red-400">Nepa</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">Bhay</span>. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <Link
              href="https://www.facebook.com/nepabhay/"
              className="text-white hover:text-blue-400 transition-colors duration-200 p-1"
              aria-label="Facebook"
            >
              <svg
                className="h-5 w-5 sm:h-5 sm:w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link
              href="https://x.com/nepabhay"
              className="text-white hover:text-blue-400 transition-colors duration-200 p-1"
              aria-label="Twitter"
            >
              <svg
                className="h-5 w-5 sm:h-5 sm:w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
            <Link
              href="https://www.tiktok.com/@nepabhay"
              className="text-white hover:text-blue-400 transition-colors duration-200 p-1"
              aria-label="TikTok"
            >
              <svg
                className="h-5 w-5 sm:h-5 sm:w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/nepabhay"
              className="text-white hover:text-blue-400 transition-colors duration-200 p-1"
              aria-label="Instagram"
            >
              <svg
                className="h-5 w-5 sm:h-5 sm:w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
