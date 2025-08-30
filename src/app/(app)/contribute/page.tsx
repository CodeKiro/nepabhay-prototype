import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Code,
  PenTool,
  Users,
  BookOpen,
  Mail,
  Star,
  Globe,
  Heart,
  Handshake,
  Target,
  Building2,
  Send,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contribute to Nepa:Bhay",
  description:
    "Learn how to contribute to Nepa:Bhay - Help preserve Nepali languages through content creation, development, and community building",
};

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Contribute to <span className="text-red-500">Nepa</span>
            <span className="text-blue-600">:Bhay</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Help us preserve and promote Nepali languages and culture for future
            generations
          </p>
        </div>

        {/* Ways to Contribute */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Content Creation */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <PenTool className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Content Creation
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-700 mb-5 leading-relaxed">
              Share your knowledge of Nepali languages, culture, and traditions
              through articles, lessons, and educational content.
            </p>

            <div className="space-y-3 mb-5">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-gray-900">
                    Write Articles
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Create informative articles about language, culture, and
                    history
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-gray-900">
                    Develop Lessons
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Create structured learning materials and exercises
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-gray-900">
                    Cultural Stories
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Share traditional stories, folklore, and cultural insights
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Development */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Code className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Development
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-700 mb-5 leading-relaxed">
              Help build and improve the platform&apos;s technical features.
              Your code can make a real difference.
            </p>

            <div className="space-y-3 mb-5">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-gray-900">
                    Frontend Development
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    React, Next.js, TypeScript, and UI/UX improvements
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-gray-900">
                    Backend Development
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Node.js, Nest.js, REST API development, and database
                    optimization
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-gray-900">
                    Mobile Development
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    React Native or native app development (future)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Ways to Help */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6">
            Other Ways to Help
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Community Building
              </h3>
              <p className="text-sm md:text-base text-gray-700 mb-3 leading-relaxed">
                Help us build and moderate community spaces, organize events,
                and connect with other enthusiasts
              </p>
            </div>

            <div className="text-center p-4 bg-red-50 rounded-lg hover:shadow-md transition-shadow">
              <BookOpen className="w-10 h-10 text-red-600 mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Translation
              </h3>
              <p className="text-sm md:text-base text-gray-700 mb-3 leading-relaxed">
                Help translate content between different Nepali languages and
                English to make knowledge accessible
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <PenTool className="w-10 h-10 text-gray-700 mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Content Review
              </h3>
              <p className="text-sm md:text-base text-gray-700 mb-3 leading-relaxed">
                Help review and edit content for accuracy, clarity, and cultural
                authenticity
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-red-50 rounded-xl p-6 border border-gray-100 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-sm md:text-base text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
              Join our mission to preserve and promote Nepali languages and
              culture! Whether you&apos;re a beginner taking your first steps or
              an experienced contributor, you&apos;re not just helping us build
              something meaningful - you&apos;re joining a collaborative
              learning environment where every contribution, big or small,
              creates lasting impact while you grow alongside our passionate,
              experienced team.
            </p>
            <div className="max-w-2xl mx-auto">
              <p className="text-xs md:text-sm text-gray-600 font-medium mb-3 uppercase tracking-wider">
                Your Journey With Us
              </p>
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm md:text-base font-semibold">
                <span className="text-blue-600">Learn</span>
                <span className="text-gray-400 hidden sm:inline">→</span>
                <span className="text-red-500">Build</span>
                <span className="text-gray-400 hidden sm:inline">→</span>
                <span className="text-gray-800">Lead</span>
                <span className="text-gray-400 hidden sm:inline">→</span>
                <span className="text-red-600">Contribute</span>
                <span className="text-gray-400 hidden sm:inline">→</span>
                <span className="text-blue-500">Collaborate</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                1
              </div>
              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                Choose your area
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Select the contribution type that matches your skills
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-md border border-red-100 hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                2
              </div>
              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                Contact our team
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Reach out to discuss your contribution plans
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                3
              </div>
              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                Get onboarded
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Complete the setup process and orientation
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                4
              </div>
              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                Start contributing!
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Begin making your impact on the platform
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
              variant="default"
              asChild
            >
              <Link href="/start-contribution">
                <Users className="w-5 h-5 mr-2" />
                Become a Contributor
              </Link>
            </Button>

            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
              variant="outline"
              asChild
            >
              <Link href="/contact">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>

        {/* Partnership Opportunities */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 via-white to-red-50 rounded-xl p-6 border border-gray-100 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center mr-4">
              <Handshake className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Partnership Opportunities
            </h2>
          </div>

          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
            Are you an organization or individual interested in strategic
            collaboration or sponsorship? Partner with us to make a larger
            impact on cultural preservation and community building.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700"
              asChild
            >
              <Link href="/partnership">
                <Building2 className="w-5 h-5 mr-2" />
                Explore Partnership
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              asChild
            >
              <Link href="/partnership/apply">
                <Send className="w-5 h-5 mr-2" />
                Apply Now
              </Link>
            </Button>
          </div>
        </div>

        {/* Current Needs */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 to-red-50 rounded-xl p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-4">
            Current Priorities
          </h2>
          <p className="text-sm md:text-base text-gray-700 text-center mb-6 max-w-2xl mx-auto leading-relaxed">
            These are the areas where we need the most help right now:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border-l-4 border-red-500 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-900">
                  High Priority
                </h4>
              </div>
              <ul className="text-sm md:text-base text-gray-700 space-y-3 leading-relaxed">
                <li className="flex items-start space-x-3">
                  <Code className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Frontend developers with React experience</span>
                </li>
                <li className="flex items-start space-x-3">
                  <PenTool className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Newa language content writers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <BookOpen className="w-4 h-4 text-gray-700 mt-0.5 flex-shrink-0" />
                  <span>Interactive lesson developers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Globe className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Graphic and UI/UX designers</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-gray-700 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-sm md:text-base font-semibold text-gray-900">
                  Always Needed
                </h4>
              </div>
              <ul className="text-sm md:text-base text-gray-700 space-y-3 leading-relaxed">
                <li className="flex items-start space-x-3">
                  <Users className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Cultural content reviewers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Handshake className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Community moderators</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Globe className="w-4 h-4 text-gray-700 mt-0.5 flex-shrink-0" />
                  <span>Translation volunteers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Bug testers and feedback providers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="bg-gradient-to-r from-red-500 to-blue-600 rounded-xl shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Join our mission to preserve and promote Newa language and culture.
            Your contribution, no matter how small, helps build something
            meaningful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start-contribution">
              <Button className="bg-white text-red-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                Start Contributing Now
              </Button>
            </Link>
            <Link href="mailto:contact@nepabhay.com">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-500 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Contact Us First
              </Button>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
