import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Handshake,
  Building2,
  Target,
  Users,
  Heart,
  Zap,
  Trophy,
  CheckCircle,
  Mail,
} from "lucide-react";

export default function PartnershipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-black">Partnership </span>
            <span className="text-red-500">Opportunities</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join us in preserving and promoting Nepal&apos;s rich linguistic
            heritage. Whether through collaboration or sponsorship, your
            partnership can make a meaningful impact on cultural preservation.
          </p>
        </div>

        {/* Partnership Types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Collaboration Partnerships */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Collaboration
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              Work together on technical development, content creation,
              educational initiatives, and community building projects.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                Technical Development
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                Content Creation
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                Community Programs
              </li>
            </ul>
          </div>

          {/* Sponsorship Opportunities */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-red-100">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Sponsorship
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              Support our mission financially while gaining marketing benefits
              and recognition within the Nepal Bhasa community.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
                Brand Recognition
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
                Marketing Benefits
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
                Community Impact
              </li>
            </ul>
          </div>

          {/* Strategic Alliances */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Strategic Alliances
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              Long-term partnerships with shared goals for cultural
              preservation, educational advancement, and technological
              innovation.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-gray-600 mr-2" />
                Shared Resources
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-gray-600 mr-2" />
                Joint Initiatives
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-gray-600 mr-2" />
                Long-term Growth
              </li>
            </ul>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center mr-4">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Partnership Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <Zap className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900">
                  Community Impact
                </h3>
              </div>
              <p className="text-sm text-gray-700">
                Make a meaningful difference in preserving Nepal&apos;s
                linguistic heritage
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center mb-2">
                <Building2 className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="font-semibold text-gray-900">
                  Brand Visibility
                </h3>
              </div>
              <p className="text-sm text-gray-700">
                Gain recognition within the cultural preservation community
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Network Growth</h3>
              </div>
              <p className="text-sm text-gray-700">
                Connect with like-minded organizations and cultural enthusiasts
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-xl p-6 text-center mb-10">
          <Handshake className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Ready to Partner With Us?
          </h2>
          <p className="text-base text-gray-700 mb-5 max-w-2xl mx-auto">
            Take the next step and join our mission to preserve Nepal&apos;s
            rich linguistic heritage. Fill out our partnership application and
            let&apos;s build something meaningful together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              asChild
            >
              <Link href="/partnership/apply">Apply for Partnership</Link>
            </Button>
            <Button
              size="lg"
              className="border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              variant="outline"
              asChild
            >
              <Link href="/contact">Contact Us First</Link>
            </Button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-red-600" />
            Need More Information?
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            Have questions about partnership opportunities? We&apos;re here to
            help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 text-base font-semibold border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
              asChild
            >
              <Link href="/contact">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
