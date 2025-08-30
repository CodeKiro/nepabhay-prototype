import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  Code,
  Server,
  Cloud,
  Settings,
  Palette,
  Users,
  PenTool,
  MapPin,
  Heart,
  Target,
  Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Team - Nepa:Bhay",
  description:
    "Meet the passionate team behind Nepa:Bhay working to preserve Nepali languages and cultural heritage",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Meet Our <span className="text-red-500">Team</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Passionate individuals dedicated to preserving and celebrating
            Nepali languages and cultural heritage through technology and
            community
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Shristi Bajracharya */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500">
            <div className="relative overflow-hidden">
              <div className="aspect-square w-full bg-gradient-to-br from-red-100 to-blue-100 p-6">
                <div className="w-full h-full rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                  <Image
                    src="/team/BajraShristi.png"
                    alt="Shristi Bajracharya - Full Stack Developer"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mr-3">
                  Shristi Bajracharya
                </h3>
                <span className="text-gray-600 text-base">(BajraShristi)</span>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Basantapur, Kathmandu</span>
              </div>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                Full stack developer experienced in creating visually appealing
                frontends and backend integration. Contributing to content
                creation, project management, community coordination, and
                overall project planning.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Palette className="w-4 h-4 mr-2 text-red-600" />
                    Core Responsibilities
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <Code className="w-3 h-3 mr-2 text-gray-600" />
                      Frontend Development
                    </div>
                    <div className="flex items-center">
                      <PenTool className="w-3 h-3 mr-2 text-gray-600" />
                      Content Creation
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-2 text-gray-600" />
                      Community Coordination
                    </div>
                    <div className="flex items-center">
                      <Settings className="w-3 h-3 mr-2 text-gray-600" />
                      Project Management
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-600" />
                    Interests & Hobbies
                  </h4>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      Drawing Pictures
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      Dancing
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      Exploring New Things
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Milan Bishowkarma */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500">
            <div className="relative overflow-hidden">
              <div className="aspect-square w-full bg-gradient-to-br from-blue-100 to-red-100 p-6">
                <div className="w-full h-full rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                  <Image
                    src="/team/MysticMilan.png"
                    alt="Milan Bishowkarma - Backend Developer & Architect"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mr-3">
                  Milan Bishowkarma
                </h3>
                <span className="text-gray-600 text-base">(MysticMilan)</span>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Gumdi, Dhading</span>
              </div>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                Backend developer and architect responsible for system
                architecture, backend development, cloud infrastructure,
                deployment, and project research. Passionate about problem
                solving, innovative design, and community building.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Code className="w-4 h-4 mr-2 text-blue-600" />
                    Core Responsibilities
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <Server className="w-3 h-3 mr-2 text-gray-600" />
                      Backend Development
                    </div>
                    <div className="flex items-center">
                      <Settings className="w-3 h-3 mr-2 text-gray-600" />
                      System Architecture
                    </div>
                    <div className="flex items-center">
                      <Cloud className="w-3 h-3 mr-2 text-gray-600" />
                      Cloud & Deployment
                    </div>
                    <div className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-gray-600" />
                      Project Research
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-600" />
                    Interests & Hobbies
                  </h4>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      Playing Flute
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      Writing Poems
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      Singing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Values */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6">
            Our Shared <span className="text-red-500">Values</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-xl hover:shadow-md transition-shadow">
              <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Cultural Preservation
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Dedicated to preserving and celebrating Nepali languages and
                cultural heritage for future generations
              </p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-xl hover:shadow-md transition-shadow">
              <Lightbulb className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Using modern technology and creative solutions to make language
                learning accessible and engaging
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-gray-700 mx-auto mb-3" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Community First
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Building a strong, inclusive community where everyone can
                contribute and learn together
              </p>
            </div>
          </div>
        </div>

        {/* Join Our Mission */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-red-50 rounded-xl p-6 border border-gray-100 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Join Our <span className="text-red-500">Mission</span>
            </h2>
            <p className="text-sm md:text-base text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
              We&rsquo;re always looking for passionate individuals who share
              our vision of preserving Nepali languages and culture through
              technology and community building. Whether you&rsquo;re a
              developer, content creator, designer, or community enthusiast,
              there&rsquo;s a place for you in our mission.
            </p>
            <div className="max-w-2xl mx-auto mb-6">
              <p className="text-base md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 md:mb-4 leading-relaxed px-2">
                &ldquo;Together we preserve, together we grow&rdquo;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Code className="w-4 h-4" />
              </div>
              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                Developers
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Frontend, Backend, Mobile
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-md border border-red-100 hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <PenTool className="w-4 h-4" />
              </div>
              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                Content Creators
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Writers, Translators, Educators
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Palette className="w-4 h-4" />
              </div>
              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                Designers
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                UI/UX, Graphic, Multimedia
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                Community
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Coordinators, Moderators
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
              <Link href="/contribute">
                <Target className="w-5 h-5 mr-2" />
                Start Contributing
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
              variant="outline"
              asChild
            >
              <Link href="/join-us">
                <Users className="w-5 h-5 mr-2" />
                Join Our Community
              </Link>
            </Button>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm md:text-base mb-4">
            Have questions or want to collaborate? We&rsquo;d love to hear from
            you!
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Learn More About Our Mission</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
