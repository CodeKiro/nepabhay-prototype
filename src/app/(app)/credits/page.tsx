import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Palette, Heart, ExternalLink, Handshake } from "lucide-react";

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-red-500">Credits </span>
            <span className="text-gray-900"> & </span>
            <span className="text-blue-600"> Acknowledgments</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Honoring those who made this possible
          </p>
        </div>
        {/* Design & Visual Resources */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Design & Visual Resources
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Stickers & Graphics
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Ananda K. Maharjan and his Team and Friends</strong>
                <br />
                Sticker designs and graphic inspirations that bring life to our
                platform.
                <br />
                <Link
                  href="https://www.anandakm.com.np/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                >
                  https://www.anandakm.com.np/
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </p>
            </div>

            {/* 
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Images & Photography
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Photo sources, photographers, stock images, etc.]
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Fonts & Typography
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Font families, typography resources, etc.]
              </p>
            </div>
            */}
          </div>
        </div>

        {/* Special Thanks */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-4">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Special Thanks
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Logo Design & Early Feedback
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Sakshyam Sapkota</strong>
                <br />
                Logo design and valuable early feedback that helped shape our
                vision.
                <br />
                <Link
                  href="https://www.linkedin.com/in/sakshyam-sapkota-950522235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                >
                  LinkedIn Profile
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </p>
            </div>

            {/* 
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Mentors & Advisors
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Mentors, advisors, guidance providers, etc.]
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Friends & Family
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Personal supporters, encouragement, etc.]
              </p>
            </div>
            */}
          </div>
        </div>

        {/* Technical Acknowledgements - Commented for future use */}
        {/* 
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-4">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Technical Resources
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Frameworks & Libraries</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Next.js, React, Tailwind CSS, libraries, etc.]
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Development Tools</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - IDEs, deployment platforms, testing tools, etc.]
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Hosting & Infrastructure</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Cloud providers, CDNs, databases, etc.]
              </p>
            </div>
          </div>
        </div>
        */}

        {/* Content Contributors - Commented for future use */}
        {/* 
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-4">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Content Contributors
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">Language Experts</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Linguists, cultural advisors, native speakers, etc.]
              </p>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">Writers & Researchers</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Article writers, researchers, editors, etc.]
              </p>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">Translation Volunteers</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Translators, proofreaders, localization helpers, etc.]
              </p>
            </div>
          </div>
        </div>
        */}

        {/* Community Support - Commented for future use */}
        {/* 
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Community Support
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Beta Testers & Early Users</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Early users, feedback providers, bug reporters, etc.]
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Community Moderators</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Forum moderators, community managers, etc.]
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Sponsors & Supporters</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Financial supporters, institutional backers, etc.]
              </p>
            </div>
          </div>
        </div>
        */}

        {/* Legal & Licensing - Commented for future use */}
        {/* 
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-4">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Legal & Licensing
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2">Open Source Licenses</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - MIT, Apache, GPL licenses, etc.]
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2">Creative Commons</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - CC licenses, attribution requirements, etc.]
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                [Content to be provided - Usage terms, disclaimers, etc.]
              </p>
            </div>
          </div>
        </div>
        */}

        {/* Content Disclaimer */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-4">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Content & Resource Disclaimer
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Content Sources
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                All content, designs, graphics, learning materials, and other
                resources used on this platform are sourced from freely
                available online resources or created by our community
                contributors.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Content Removal Requests
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                If you believe any content, graphics, designs, or materials on
                our platform belong to you or require proper attribution, please
                contact our team immediately. We are committed to respecting
                intellectual property rights and will promptly address any
                concerns or removal requests.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Attribution Commitment
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We strive to properly credit all contributors and sources. If
                you notice any missing attributions or have concerns about
                content usage, please reach out to us.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-4">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Want to Be Part of Our Story?
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-gray-700 text-sm leading-relaxed">
                If you&apos;ve contributed to Nepabhay and don&apos;t see your
                name here, or if you know someone whose contribution is missing,
                please contact our team and we will acknowledge their efforts
                properly.
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-gray-700 text-sm leading-relaxed">
                Whether you&apos;d like to contribute yourself or help us
                recognize others, we&apos;d love to hear from you!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
              variant="default"
              asChild
            >
              <Link href="/contact">
                <ExternalLink className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </Button>

            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white bg-transparent"
              variant="outline"
              asChild
            >
              <Link href="/contribute">
                <Handshake className="w-5 h-5 mr-2" />
                Contribute
              </Link>
            </Button>
          </div>
        </div>

        {/* Thank You Section */}
        <div className="text-center py-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Thank You ❤️
          </h2>

          <p className="text-gray-600 max-w-lg mx-auto">
            To everyone who has contributed, supported, and believed in our
            mission to preserve Nepali heritage.
          </p>
        </div>
      </div>
    </div>
  );
}
