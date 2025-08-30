import { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  BookOpen,
  Users,
  Code,
  Heart,
  CheckCircle,
  Clock,
  Mail,
  ChevronRight,
  Lightbulb,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center - Nepa:Bhay",
  description:
    "Find answers to common questions about Nepa:Bhay platform, features, and how to get involved in preserving Nepali languages and culture",
};

export default function HelpCenterPage() {
  const faqs = [
    {
      question: "What is Nepa:Bhay?",
      answer:
        "Nepa:Bhay is a community-driven platform dedicated to preserving and promoting Nepali languages and cultural heritage through technology, education, and community engagement.",
    },
    {
      question: "What features are currently available?",
      answer:
        "Currently, you can read articles about Nepali languages and culture. We're actively developing lessons, quizzes, and community forums to enhance your learning experience.",
    },
    {
      question: "When will lessons and quizzes be available?",
      answer:
        "Lessons and quizzes are in development. We're working hard to create high-quality educational content. Follow our social media or contact us to get notified when these features launch.",
    },
    {
      question: "How can I contribute to the platform?",
      answer:
        "You can contribute as a content creator, developer, designer, or community coordinator. Visit our Contribute page to learn about different ways to get involved based on your skills and interests.",
    },
    {
      question: "Is there a community forum?",
      answer:
        "We're currently building a community forum where users can discuss languages, culture, and collaborate on projects. This feature will be available soon as part of our community platform.",
    },
    {
      question: "How do I join the community?",
      answer:
        "While our community platform is under development, you can connect with us through our Contact page, follow us on social media, or start contributing to the project directly.",
    },
    {
      question: "Is the platform free to use?",
      answer:
        "Yes! Nepa:Bhay is completely free to use. Our mission is to make Nepali language and cultural resources accessible to everyone.",
    },
    {
      question: "Can I suggest new features or content?",
      answer:
        "Absolutely! We welcome feedback and suggestions. Contact us through our Contact page or reach out directly to share your ideas for improving the platform.",
    },
  ];

  const currentFeatures = [
    {
      name: "Articles",
      status: "available",
      description: "Read about Nepali languages, culture, and heritage",
      link: "/articles",
    },
    {
      name: "About Us",
      status: "available",
      description: "Learn about our mission and vision",
      link: "/about",
    },
    {
      name: "Team",
      status: "available",
      description: "Meet the people behind Nepa:Bhay",
      link: "/team",
    },
    {
      name: "Contact",
      status: "available",
      description: "Get in touch with our team",
      link: "/contact",
    },
  ];

  const upcomingFeatures = [
    {
      name: "Interactive Lessons",
      description: "Structured learning modules for different languages",
      timeline: "In Development",
    },
    {
      name: "Quizzes & Tests",
      description: "Test your knowledge with interactive quizzes",
      timeline: "In Development",
    },
    {
      name: "Community Forum",
      description: "Discussion spaces for learners and contributors",
      timeline: "Coming Soon",
    },
    {
      name: "User Profiles",
      description: "Track your learning progress and contributions",
      timeline: "Planned",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Help <span className="text-red-500">Center</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions and learn how to make the most of
            Nepa:Bhay
          </p>
        </div>

        {/* Current Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 border border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
            Platform Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Available Now */}
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Available Now
              </h3>
              <div className="space-y-3">
                {currentFeatures.map((feature, index) => (
                  <Link
                    key={index}
                    href={feature.link}
                    className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {feature.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-green-600" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Coming Soon */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Coming Soon
              </h3>
              <div className="space-y-3">
                {upcomingFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {feature.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                        {feature.timeline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 border border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                  <HelpCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Get Involved */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 border border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
            How to Get <span className="text-red-500">Involved</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/contribute"
              className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 border border-blue-200"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Contribute
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Help develop features, create content, or improve the platform
              </p>
            </Link>

            <Link
              href="/join-us"
              className="group p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300 hover:scale-105 border border-red-200"
            >
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 transition-colors">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Join Community
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Be part of our mission to preserve Nepali languages and culture
              </p>
            </Link>

            <Link
              href="/contact"
              className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 hover:scale-105 border border-gray-200"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-900 transition-colors">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Contact Us
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Have questions? Reach out to our team for support
              </p>
            </Link>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-red-50 rounded-xl p-6 border border-gray-100 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">Quick</span> Tips
            </h2>
            <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Make the most of your Nepa:Bhay experience with these helpful tips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Start with Articles
                </h4>
                <p className="text-sm text-gray-600">
                  Begin your journey by exploring our available articles about
                  Nepali languages and culture.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Follow Our Updates
                </h4>
                <p className="text-sm text-gray-600">
                  Stay connected through our social media channels for the
                  latest news and feature releases.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Share Your Ideas
                </h4>
                <p className="text-sm text-gray-600">
                  We value community feedback. Contact us with suggestions for
                  new features or content.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Get Involved Early
                </h4>
                <p className="text-sm text-gray-600">
                  Join our contributor community to help shape the platform&apos;s
                  future development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="text-center mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Still need help?
          </h3>
          <p className="text-gray-600 text-sm md:text-base mb-6">
            Can&apos;t find what you&apos;re looking for? Our team is here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
