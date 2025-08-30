import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Nepa:Bhay",
  description:
    "Privacy Policy for Nepa:Bhay - Learn about how we collect, use, and protect your data",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
              <span className="text-red-500">Privacy</span>{" "}
              <span className="text-blue-600">Policy</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Last updated: January 2025
            </p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-500 pb-2">
                Introduction
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Welcome to Nepa:Bhay (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
                &ldquo;us&rdquo;). We are committed to protecting your privacy
                and ensuring you have a positive experience on our platform.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our platform.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                By using Nepa:Bhay, you consent to the collection and use of
                your information as described in this policy.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-blue-600 pb-2">
                1. Information We Collect
              </h2>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Personal Information:
              </h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  username, password (encrypted)
                </li>
                <li>
                  <strong>Profile Information:</strong> Bio, profile picture,
                  preferences, and settings
                </li>
                <li>
                  <strong>Contact Information:</strong> Email address for
                  communication and account recovery
                </li>
              </ul>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Content Data:
              </h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>
                  <strong>User-Generated Content:</strong> Posts, poems,
                  stories, blogs, comments, and other content you create
                </li>
                <li>
                  <strong>Learning Progress:</strong> Quiz scores, lesson
                  completion status, educational achievements
                </li>
                <li>
                  <strong>Interactions:</strong> Likes, shares, comments, and
                  other engagement activities
                </li>
              </ul>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Automatically Collected Information:
              </h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>
                  <strong>Usage Data:</strong> Pages visited, time spent,
                  features used, click patterns
                </li>
                <li>
                  <strong>Device Information:</strong> Browser type, operating
                  system, device type, IP address
                </li>
                <li>
                  <strong>Log Data:</strong> Access times, error logs,
                  performance metrics
                </li>
              </ul>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                OAuth Provider Data:
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2 md:mb-3">
                When you sign in using third-party services (Google, Facebook,
                TikTok), we may receive:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4">
                <li>
                  Basic profile information (name, email, profile picture)
                </li>
                <li>Public profile data as permitted by the OAuth provider</li>
                <li>Unique identifier from the OAuth provider</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-500 pb-2">
                2. How We Use Your Information
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                We use the collected information for various purposes:
              </p>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Service Provision:
              </h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>Create and manage your account</li>
                <li>Provide access to platform features and content</li>
                <li>Track learning progress and achievements</li>
                <li>Enable content creation and sharing</li>
              </ul>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Communication:
              </h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>Send account verification and security notifications</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>
                  Send updates about new features or changes to our service
                </li>
              </ul>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Platform Improvement:
              </h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4">
                <li>Analyze usage patterns to improve user experience</li>
                <li>Develop new features and enhance existing ones</li>
                <li>Monitor and prevent fraudulent or malicious activities</li>
                <li>Ensure platform security and data integrity</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-blue-600 pb-2">
                3. Information Sharing and Disclosure
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except as
                described below:
              </p>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Public Content:
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Content you post publicly (poems, stories, blogs, comments) is
                visible to other users of the platform.
              </p>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Service Providers:
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2 md:mb-3">
                We may share information with trusted third-party service
                providers who assist us in:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>Hosting and maintaining our platform</li>
                <li>Sending emails and notifications</li>
                <li>Analytics and performance monitoring</li>
                <li>Payment processing (if applicable)</li>
              </ul>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Legal Requirements:
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                We may disclose your information if required by law, regulation,
                legal process, or government request.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-500 pb-2">
                4. Data Security
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                We implement appropriate security measures to protect your
                personal information:
              </p>

              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>
                  <strong>Encryption:</strong> Passwords are encrypted and
                  sensitive data is protected in transit
                </li>
                <li>
                  <strong>Access Controls:</strong> Limited access to personal
                  data on a need-to-know basis
                </li>
                <li>
                  <strong>Regular Updates:</strong> Security systems are
                  regularly updated and monitored
                </li>
                <li>
                  <strong>Secure Hosting:</strong> Data is stored on secure,
                  professionally managed servers
                </li>
              </ul>

              <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-yellow-800">
                  <strong>Important:</strong> While we strive to protect your
                  information, no method of transmission over the internet is
                  100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-blue-600 pb-2">
                5. Your Rights and Choices
              </h2>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Account Management:
              </h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>
                  <strong>Access:</strong> View and update your account
                  information at any time
                </li>
                <li>
                  <strong>Correction:</strong> Correct inaccurate or incomplete
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your account
                  and personal data
                </li>
                <li>
                  <strong>Export:</strong> Request a copy of your personal data
                </li>
              </ul>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Communication Preferences:
              </h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>
                  Opt out of promotional emails (account security emails cannot
                  be disabled)
                </li>
                <li>Adjust notification settings in your profile</li>
                <li>Control privacy settings for your content</li>
              </ul>

              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-800">
                  To exercise these rights, visit your profile settings or
                  contact us at{" "}
                  <a
                    href="mailto:nepabhay2025@gmail.com"
                    className="text-blue-600 hover:text-blue-800 break-all"
                  >
                    nepabhay2025@gmail.com
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-500 pb-2">
                6. Third-Party Services
              </h2>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                OAuth Providers:
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2 md:mb-3">
                When you use OAuth login options, your interaction with these
                services is governed by their respective privacy policies:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>
                  <strong>Google:</strong>{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Facebook/Meta:</strong>{" "}
                  <a
                    href="https://www.facebook.com/privacy/policy/"
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Meta Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>TikTok:</strong>{" "}
                  <a
                    href="https://www.tiktok.com/legal/privacy-policy"
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TikTok Privacy Policy
                  </a>
                </li>
              </ul>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                External Links:
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our platform may contain links to external websites. We are not
                responsible for the privacy practices of these sites and
                encourage you to read their privacy policies.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-blue-600 pb-2">
                7. Children&apos;s Privacy
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Our platform is designed for general audiences and we do not
                knowingly collect personal information from children under 13
                years of age. If we discover that we have collected information
                from a child under 13, we will promptly delete such information.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                If you are a parent or guardian and believe your child has
                provided personal information to us, please contact us
                immediately.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-500 pb-2">
                8. Data Retention
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                We retain your personal information only as long as necessary
                to:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our platform and services</li>
              </ul>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                When you delete your account, we will remove your personal
                information within 30 days, except where retention is required
                by law.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-blue-600 pb-2">
                9. International Data Transfers
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Your information may be transferred to and processed in
                countries other than your own. We ensure that such transfers
                comply with applicable data protection laws and that your
                information receives adequate protection.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-500 pb-2">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                We may update this Privacy Policy from time to time. When we
                make changes, we will:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>
                  Update the &ldquo;Last updated&rdquo; date at the top of this
                  policy
                </li>
                <li>Notify you via email if changes are significant</li>
                <li>Post a notice on our platform</li>
              </ul>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Your continued use of our platform after changes are posted
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-blue-600 pb-2">
                11. Contact Us
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>

              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <p className="text-sm sm:text-base text-gray-700">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:nepabhay2025@gmail.com"
                    className="text-blue-600 hover:text-blue-800 break-all"
                  >
                    nepabhay2025@gmail.com
                  </a>
                  <br />
                  <strong>Response Time:</strong> Within 48 hours
                  <br />
                  <strong>Data Deletion:</strong>{" "}
                  <Link
                    href="/legal/data-deletion"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Data Deletion Instructions
                  </Link>
                  <br />
                  <strong>Terms of Service:</strong>{" "}
                  <Link
                    href="/legal/terms"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Read our Terms
                  </Link>
                </p>
              </div>
            </section>

            <div className="text-center mt-6 md:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-500">
                This privacy policy is effective as of January 2025 and applies
                to all users of Nepa:Bhay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
