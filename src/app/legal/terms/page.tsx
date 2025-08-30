import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Nepa:Bhay",
  description: "Terms of Service for Nepa:Bhay platform",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
              <span className="text-red-500">Terms</span> of{" "}
              <span className="text-blue-600">Service</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Last updated: January 2025
            </p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-500 pb-2">
                1. Acceptance of Terms
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Welcome to Nepa:Bhay! By accessing or using our platform, you
                agree to be bound by these Terms of Service and all applicable
                laws and regulations. If you do not agree with any of these
                terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-blue-600 pb-2">
                2. Description of Service
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Nepa:Bhay is an educational platform dedicated to preserving and
                teaching the Newa language and Nepalese culture. We provide:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4">
                <li>Interactive language lessons and educational content</li>
                <li>Articles about Newa culture and heritage</li>
                <li>
                  Community-driven content sharing (poems, stories, blogs)
                </li>
                <li>Quizzes and interactive learning tools</li>
                <li>User profiles and social features</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-500 pb-2">
                3. User Accounts and Registration
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                To access certain features of our platform, you must create an
                account. You agree to:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>
                  Provide accurate, current, and complete information during
                  registration
                </li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>
                  Be responsible for all activities that occur under your
                  account
                </li>
                <li>
                  Notify us immediately of any unauthorized use of your account
                </li>
              </ul>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                You must be at least 13 years old to create an account. Users
                under 18 must have parental consent.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-blue-600 pb-2">
                4. User Content and Conduct
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Users may contribute content such as poems, stories, blogs, and
                comments. By posting content, you agree that:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4 mb-3 md:mb-4">
                <li>You own or have the right to use the content you post</li>
                <li>Your content does not violate any third-party rights</li>
                <li>
                  You grant us a non-exclusive license to use, display, and
                  distribute your content
                </li>
              </ul>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Prohibited Content:
              </h3>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4">
                <li>Harassment, hate speech, or discriminatory content</li>
                <li>Sexually explicit or inappropriate material</li>
                <li>Spam, advertising, or promotional content</li>
                <li>False, misleading, or defamatory information</li>
                <li>Content that violates any applicable laws</li>
                <li>Copyrighted material without proper authorization</li>
              </ul>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-500 pb-2">
                5. Privacy and Data Protection
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Your privacy is important to us. Our Privacy Policy explains how
                we collect, use, and protect your information. By using our
                service, you consent to our privacy practices as described in
                our Privacy Policy.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-blue-600 pb-2">
                6. Intellectual Property Rights
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                The Nepa:Bhay platform, including its original content,
                features, and functionality, is owned by Nepa:Bhay and is
                protected by international copyright, trademark, patent, trade
                secret, and other intellectual property laws.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                User-generated content remains the property of the respective
                users, but by posting on our platform, users grant us necessary
                rights to operate and improve our service.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-500 pb-2">
                7. Termination
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                We reserve the right to terminate or suspend your account and
                access to our service at our sole discretion, without notice,
                for conduct that we believe violates these Terms of Service or
                is harmful to other users, us, or third parties.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                You may terminate your account at any time by contacting us or
                using the account deletion feature in your profile settings.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-blue-600 pb-2">
                8. Disclaimers and Limitation of Liability
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Our service is provided &ldquo;as is&rdquo; without warranties
                of any kind. We do not guarantee that our service will be
                uninterrupted, secure, or error-free. To the fullest extent
                permitted by law, we disclaim all warranties and shall not be
                liable for any indirect, incidental, special, or consequential
                damages.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-500 pb-2">
                9. Changes to Terms
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                We reserve the right to modify these terms at any time. We will
                notify users of significant changes via email or through our
                platform. Continued use of our service after changes constitutes
                acceptance of the new terms.
              </p>
            </section>

            <section className="mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-blue-600 pb-2">
                10. Contact Information
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mt-3 md:mt-4">
                <p className="text-sm sm:text-base text-gray-700">
                  <strong>Email:</strong> nepabhay2025@gmail.com
                  <br />
                  <strong>Website:</strong> https://nepabhay.me
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
