import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  Heart,
  Users,
  Globe,
  BookOpen,
  Target,
  Eye,
  Handshake,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Nepa:Bhay",
  description:
    "Learn about Nepa:Bhay - A community-driven platform for preserving and learning Nepali languages and cultural heritage",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/stickers/allnepali.png"
              alt="Nepa:Bhay Community"
              width={400}
              height={400}
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            About <span className="text-red-500">Nepa</span>
            <span className="text-blue-600">:Bhay</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            A community-driven platform preserving and celebrating the rich
            linguistic heritage of Nepal
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Mission Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Our Mission
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              To create a comprehensive digital repository for learning and
              preserving Nepali languages, starting with Newa language, while
              building a vibrant community of language enthusiasts and cultural
              heritage preservers.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Our Vision
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              To become the leading online platform for all local Nepali
              languages, creating an interconnected community that celebrates,
              learns, and preserves the diverse linguistic and cultural heritage
              of Nepal for future generations.
            </p>
          </div>
        </div>

        {/* What is Nepa:Bhay Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              What is <span className="text-red-500">Nepa</span>
              <span className="text-blue-600">:Bhay</span>?
            </h2>
          </div>

          <div className="prose max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                  <Globe className="w-5 h-5 text-blue-600 mr-2" />
                  The Name
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <strong>&ldquo;Nepa:Bhay&rdquo;</strong> means &ldquo;Nepali
                  Bhasa&rdquo; (Nepali Language), representing not just one
                  language but the entire spectrum of local Nepali languages.
                  Our platform celebrates the linguistic diversity that makes
                  Nepal culturally rich and unique.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 text-red-500 mr-2" />
                  The Platform
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  We started as a{" "}
                  <strong>Newa language learning platform</strong> but our
                  vision extends far beyond. We&rsquo;re building a
                  comprehensive repository for all local Nepali languages,
                  preserving their essence for future generations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Features */}
        <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-xl p-6 mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
            Learning Made Engaging
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Articles */}
            <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Articles
                </h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
                  Available Now
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-700 text-center leading-relaxed">
                Rich, informative articles about Newa language, culture, and
                heritage written by community contributors.
              </p>
            </div>

            {/* Interactive Lessons */}
            <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Interactive Lessons
                </h3>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-2">
                  Coming Soon
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-700 text-center leading-relaxed">
                Structured, step-by-step lessons with interactive exercises to
                make learning engaging and effective.
              </p>
            </div>

            {/* Quizzes */}
            <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Quizzes
                </h3>
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mt-2">
                  Coming Soon
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-700 text-center leading-relaxed">
                Test your knowledge with fun, interactive quizzes designed to
                reinforce your learning journey.
              </p>
            </div>
          </div>
        </div>

        {/* Community Driven Approach */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Community-Driven Approach
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Our platform thrives on the collective passion and contributions
              of our community members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Contributors
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Writers, educators, and language experts who create and curate
                educational content
              </p>
            </div>

            <div className="text-center p-4 bg-red-50 rounded-lg hover:shadow-md transition-shadow">
              <Heart className="w-10 h-10 text-red-600 mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Culture Enthusiasts
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Passionate individuals dedicated to preserving and sharing
                cultural heritage
              </p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
              <Handshake className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Developers
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Technical contributors who help build and improve the
                platform&rsquo;s features
              </p>
            </div>
          </div>
        </div>

        {/* Cultural Heritage */}
        <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-xl p-6 mb-10">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Celebrating Our Heritage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                Newa Culture & Heritage
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                Our platform serves as a digital window into the rich Newa
                culture, showcasing traditional art, festivals, customs, and the
                beautiful intricacies of the Newa language.
              </p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Through authentic content and community stories, we preserve and
                share the essence of Newa heritage with the world.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                Broader Nepali Heritage
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                Nepal&rsquo;s linguistic diversity is a treasure trove of
                cultural richness. Our future expansion will encompass various
                local languages, each carrying unique traditions and wisdom.
              </p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Together, we&rsquo;re building a comprehensive cultural
                repository that celebrates the entire spectrum of Nepali
                heritage.
              </p>
            </div>
          </div>
        </div>

        {/* Join Our Community */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-red-50 rounded-xl p-6 border border-gray-100 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-sm md:text-base text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
              Be part of something meaningful! Whether you&apos;re a language
              enthusiast, cultural preservationist, content creator, or
              developer, you&apos;re not just joining a platform - you&apos;re
              becoming part of a passionate community dedicated to preserving
              and celebrating Nepali heritage where every voice matters and
              contributes to our shared mission.
            </p>

            {/* Creative Visual Element */}
            <div className="max-w-lg md:max-w-2xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-blue-100 via-white to-red-100 rounded-xl md:rounded-2xl p-4 md:p-8 border border-blue-200 shadow-md">
                <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 relative shadow-lg">
                      <Heart className="w-5 h-5 md:w-8 md:h-8 text-white" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 md:w-5 md:h-5 bg-red-600 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-gray-700">
                      Passion
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 relative shadow-lg">
                      <Users className="w-5 h-5 md:w-8 md:h-8 text-white" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 md:w-5 md:h-5 bg-blue-700 rounded-full animate-bounce"></div>
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-gray-700">
                      Community
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 relative shadow-lg">
                      <Target className="w-5 h-5 md:w-8 md:h-8 text-white" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 md:w-5 md:h-5 bg-gray-600 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-gray-700">
                      Impact
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-base md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 md:mb-4 leading-relaxed px-2">
                    &ldquo;Language is the bridge between past and future&rdquo;
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="flex -space-x-1 md:-space-x-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded-full border-2 md:border-3 border-white shadow-md"></div>
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-red-500 rounded-full border-2 md:border-3 border-white shadow-md"></div>
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-800 rounded-full border-2 md:border-3 border-white shadow-md"></div>
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-600 rounded-full border-2 md:border-3 border-white flex items-center justify-center shadow-md">
                        <span className="text-xs md:text-sm text-white font-bold">
                          +
                        </span>
                      </div>
                    </div>
                    <span className="text-xs md:text-sm text-gray-600 font-medium text-center">
                      Join thousands preserving our heritage
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
              variant="default"
              asChild
            >
              <Link href="/join-us">
                <Users className="w-5 h-5 mr-2" />
                Join Our Community
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
              variant="outline"
              asChild
            >
              <Link href="/contribute">
                <Handshake className="w-5 h-5 mr-2" />
                Start Contributing
              </Link>
            </Button>
          </div>
        </div>

        {/* Our Growing Community */}
        <div className="mt-10 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Our Growing Community
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join a vibrant community of language enthusiasts, cultural
              preservationists, and passionate learners working together to keep
              our heritage alive.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white rounded-xl p-4 md:p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-blue-100">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                1+
              </div>
              <div className="text-sm md:text-base text-gray-700 font-semibold">
                Language
              </div>
              <div className="text-xs md:text-sm text-gray-500">& Growing</div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-red-100">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
                ∞
              </div>
              <div className="text-sm md:text-base text-gray-700 font-semibold">
                Possibilities
              </div>
              <div className="text-xs md:text-sm text-gray-500">
                For Learning
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                100%
              </div>
              <div className="text-sm md:text-base text-gray-700 font-semibold">
                Community
              </div>
              <div className="text-xs md:text-sm text-gray-500">Driven</div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-blue-100">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-2">
                24/7
              </div>
              <div className="text-sm md:text-base text-gray-700 font-semibold">
                Available
              </div>
              <div className="text-xs md:text-sm text-gray-500">Learning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
