import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Trash2, Mail, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Deletion Request - Nepa:Bhay",
  description: "How to request deletion of your personal data from Nepa:Bhay",
};

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Legal Hub */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/legal/privacy"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Legal Hub
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full mb-4 sm:mb-6">
            <Trash2 className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Data Deletion Request
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Request the deletion of your personal data from Nepa:Bhay platform
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-100">
          {/* Your Rights Section */}
          <section className="mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-600 pb-2">
              Your Data Deletion Rights
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
              You have the right to request deletion of your personal data under
              various privacy laws. We are committed to honoring your data
              deletion requests promptly and completely.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded">
              <div className="flex">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm sm:text-base text-blue-800">
                  <strong>Important:</strong> Data deletion is permanent and
                  cannot be undone. Please ensure you want to permanently delete
                  your account and all associated data.
                </p>
              </div>
            </div>
          </section>

          {/* What Gets Deleted */}
          <section className="mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-600 pb-2">
              What Data Will Be Deleted
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  Account Information
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Profile details and settings</li>
                  <li>• Email address and username</li>
                  <li>• Account preferences</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  Activity Data
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Posts and comments</li>
                  <li>• Learning progress</li>
                  <li>• Interaction history</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Request */}
          <section className="mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-600 pb-2">
              How to Request Data Deletion
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {/* Option 1: In-App */}
              <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3">
                  Option 1: Through Your Account
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3">
                  The easiest way is to delete your account directly from your
                  profile settings:
                </p>
                <ol className="text-sm sm:text-base text-gray-700 space-y-2 ml-4">
                  <li>1. Log into your Nepa:Bhay account</li>
                  <li>2. Go to Profile Settings</li>
                  <li>3. Navigate to the &quot;Danger Zone&quot; section</li>
                  <li>
                    4. Click &quot;Delete Account&quot; and follow the prompts
                  </li>
                </ol>
                <div className="mt-4">
                  <Link
                    href="/profile"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Go to Profile Settings
                  </Link>
                </div>
              </div>

              {/* Option 2: Email */}
              <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3">
                  Option 2: Email Request
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3">
                  If you cannot access your account, send an email to our
                  support team:
                </p>
                <div className="bg-gray-50 p-3 sm:p-4 rounded border-l-4 border-red-500">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-red-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Email:</p>
                      <a
                        href="mailto:nepabhay2025@gmail.com?subject=Data Deletion Request"
                        className="text-blue-600 hover:text-blue-800 break-all"
                      >
                        nepabhay2025@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 font-medium">
                      Include in your email:
                    </p>
                    <ul className="text-xs sm:text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Your registered email address</li>
                      <li>• Your username (if known)</li>
                      <li>• Subject: &quot;Data Deletion Request&quot;</li>
                      <li>
                        • Confirmation that you want to permanently delete all
                        data
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-600 pb-2">
              Processing Timeline
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
              <h3 className="font-medium text-yellow-800 mb-2">
                Processing Time
              </h3>
              <p className="text-sm sm:text-base text-yellow-700">
                We will process your data deletion request within{" "}
                <strong>30 days</strong> of receiving it. You will receive an
                email confirmation once the deletion is complete.
              </p>
            </div>
          </section>

          {/* Important Notes */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 border-b-2 border-red-600 pb-2">
              Important Notes
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-red-800">
                  <strong>Permanent Action:</strong> Data deletion cannot be
                  undone. Make sure you have backed up any important content.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-gray-700">
                  <strong>Legal Retention:</strong> Some data may be retained
                  for legal compliance purposes as outlined in our Privacy
                  Policy.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-blue-800">
                  <strong>Account Reactivation:</strong> Once deleted, you
                  cannot reactivate your account. You would need to create a new
                  account.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm text-blue-600">
            <Link
              href="/legal/privacy"
              className="hover:text-blue-800 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="hover:text-blue-800 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal"
              className="hover:text-blue-800 transition-colors"
            >
              Legal Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
