import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Users, Heart, Code, PenTool, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Join Our Community - Nepa:Bhay",
  description:
    "Join the Nepa:Bhay community and help preserve Nepali languages and cultural heritage",
};

export default function JoinUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Join Our <span className="text-red-500">Community</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Be part of the movement to preserve and celebrate Nepali languages
            and culture
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-gradient-to-r from-blue-100 to-red-100 rounded-xl p-6 text-center mb-10">
          <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Community Platform Coming Soon!
          </h2>
          <p className="text-base text-gray-700 mb-5 max-w-2xl mx-auto">
            We&rsquo;re working hard to create an amazing community platform
            where language enthusiasts, cultural preservers, and contributors
            can connect, collaborate, and celebrate our heritage together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Notified When Ready
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contribute">Start Contributing Now</Link>
            </Button>
          </div>
        </div>

        {/* What to Expect */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6">
            What to Expect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
              <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Community Forums
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Dedicated spaces for discussions about language learning,
                cultural topics, and community projects
              </p>
            </div>

            <div className="text-center p-4 bg-red-50 rounded-lg hover:shadow-md transition-shadow">
              <Code className="w-10 h-10 text-gray-900 mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Collaboration Tools
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Advanced tools for contributors to work together on content,
                translations, and platform improvements
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <PenTool className="w-10 h-10 text-gray-900 mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Content Creation Hub
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Streamlined workflows for creating articles, lessons, and
                cultural content with review processes
              </p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
              <Globe className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Global Network
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Connect with Nepali language enthusiasts and cultural preservers
                from around the world
              </p>
            </div>
          </div>
        </div>

        {/* Interim Ways to Connect */}
        <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-xl p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-4">
            Connect With Us Now
          </h2>
          <p className="text-base text-gray-700 text-center mb-5 max-w-2xl mx-auto">
            While we&rsquo;re building our community platform, you can still
            connect with us and start contributing:
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/contribute">Start Contributing</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/articles">Explore Articles</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
