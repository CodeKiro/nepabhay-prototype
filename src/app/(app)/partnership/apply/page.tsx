"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Target,
  Mail,
  Globe,
  Send,
  RefreshCw,
  CheckCircle,
  Info,
} from "lucide-react";

export default function PartnershipApplicationPage() {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPersonName: "",
    email: "",
    phone: "",
    website: "",
    partnershipType: "",
    organizationType: "",
    partnershipAreas: [] as string[],
    partnershipDuration: "",
    partnershipGoals: "",
    resourcesContribution: "",
    expectedBenefits: "",
    previousExperience: "",
    additionalInfo: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      partnershipAreas: prev.partnershipAreas.includes(area)
        ? prev.partnershipAreas.filter((item) => item !== area)
        : [...prev.partnershipAreas, area],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call
    console.log("Partnership Form Data:", formData);
    alert("Thank you for your interest! We'll get back to you soon.");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset the form?")) {
      setFormData({
        organizationName: "",
        contactPersonName: "",
        email: "",
        phone: "",
        website: "",
        partnershipType: "",
        organizationType: "",
        partnershipAreas: [],
        partnershipDuration: "",
        partnershipGoals: "",
        resourcesContribution: "",
        expectedBenefits: "",
        previousExperience: "",
        additionalInfo: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-black">Partnership </span>
            <span className="text-red-500">Application</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to partner with us? Fill out this application and we&apos;ll
            get back to you within 48-72 hours to discuss how we can work
            together.
          </p>
        </div>

        {/* Quick Access to Partnership Info */}
        <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-xl p-4 text-center mb-8 border border-blue-100">
          <p className="text-sm text-gray-600 mb-3">
            Need to review partnership types and benefits?
          </p>
          <Link href="/partnership">
            <Button
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <Info className="w-4 h-4 mr-2" />
              View Partnership Details
            </Button>
          </Link>
        </div>

        {/* Partnership Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="organizationName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Organization/Individual Name *
                    </label>
                    <input
                      type="text"
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter organization or individual name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactPersonName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      id="contactPersonName"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter contact person name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="website"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Website/LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter website URL or LinkedIn profile"
                    />
                  </div>
                </div>
              </div>

              {/* Partnership Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Partnership Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="partnershipType"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Partnership Type *
                    </label>
                    <select
                      id="partnershipType"
                      name="partnershipType"
                      value={formData.partnershipType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select partnership type</option>
                      <option value="collaboration">
                        Collaboration Partnership
                      </option>
                      <option value="sponsorship">
                        Sponsorship Partnership
                      </option>
                      <option value="both">
                        Both Collaboration & Sponsorship
                      </option>
                      <option value="strategic">Strategic Alliance</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="organizationType"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Organization Type *
                    </label>
                    <select
                      id="organizationType"
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select organization type</option>
                      <option value="nonprofit">Non-profit Organization</option>
                      <option value="educational">
                        Educational Institution
                      </option>
                      <option value="corporate">Corporate/Business</option>
                      <option value="government">Government Agency</option>
                      <option value="cultural">Cultural Organization</option>
                      <option value="individual">Individual</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Partnership Areas (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        "Technical Development",
                        "Content Creation & Translation",
                        "Educational Material Development",
                        "Community Building & Management",
                        "Marketing & Outreach",
                        "Financial Sponsorship",
                        "Resource Sharing",
                        "Strategic Planning",
                      ].map((area) => (
                        <label
                          key={area}
                          className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.partnershipAreas.includes(area)}
                            onChange={() => handleCheckboxChange(area)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="partnershipDuration"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Partnership Duration
                    </label>
                    <select
                      id="partnershipDuration"
                      name="partnershipDuration"
                      value={formData.partnershipDuration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select duration</option>
                      <option value="short-term">
                        Short-term (3-6 months)
                      </option>
                      <option value="medium-term">
                        Medium-term (6-12 months)
                      </option>
                      <option value="long-term">Long-term (1+ years)</option>
                      <option value="ongoing">Ongoing/Open-ended</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Detailed Information
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="partnershipGoals"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Partnership Goals and Objectives *
                    </label>
                    <textarea
                      id="partnershipGoals"
                      name="partnershipGoals"
                      value={formData.partnershipGoals}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Describe what you hope to achieve through this partnership..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="resourcesContribution"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Resources and Contributions *
                    </label>
                    <textarea
                      id="resourcesContribution"
                      name="resourcesContribution"
                      value={formData.resourcesContribution}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="What resources, skills, or contributions can you provide?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="expectedBenefits"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Expected Benefits and Outcomes *
                    </label>
                    <textarea
                      id="expectedBenefits"
                      name="expectedBenefits"
                      value={formData.expectedBenefits}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="What do you expect to gain from this partnership?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="previousExperience"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Previous Partnership Experience
                    </label>
                    <textarea
                      id="previousExperience"
                      name="previousExperience"
                      value={formData.previousExperience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us about any relevant partnership or collaboration experience..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Any additional information you'd like to share..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    <span>Submit Partnership Application</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    onClick={handleReset}
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Reset Form
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
            What Happens Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <p>We review your partnership application within 48-72 hours</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <p>Our team contacts you to discuss partnership details</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <p>We develop a customized partnership plan together</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
