"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  User,
  Code,
  PenTool,
  Palette,
  Users,
  Heart,
  Star,
  MessageCircle,
  Send,
} from "lucide-react";

export default function StartContributionPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    contributionArea: "",
    motivation: "",
    skillsExperience: "",
    whatCanContribute: "",
    expectations: "",
    questions: "",
  });

  const contributionAreas = [
    {
      category: "Developers",
      options: [
        { value: "frontend", label: "Frontend Developer", icon: Code },
        { value: "backend", label: "Backend Developer", icon: Code },
        { value: "mobile", label: "Mobile Developer", icon: Code },
      ],
    },
    {
      category: "Content Creators",
      options: [
        { value: "writers", label: "Writers", icon: PenTool },
        { value: "translators", label: "Translators", icon: PenTool },
        { value: "educators", label: "Educators", icon: PenTool },
      ],
    },
    {
      category: "Designers",
      options: [
        { value: "uiux", label: "UI/UX Designer", icon: Palette },
        { value: "graphic", label: "Graphic Designer", icon: Palette },
        { value: "multimedia", label: "Multimedia Designer", icon: Palette },
      ],
    },
    {
      category: "Community",
      options: [
        { value: "coordinators", label: "Coordinators", icon: Users },
        { value: "moderators", label: "Moderators", icon: Users },
      ],
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API connection
    console.log("Form submitted:", formData);
    alert("Form submitted successfully! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-black">Start Your </span>
            <span className="text-red-500">Contribution </span>
            <span className="text-blue-600">Journey</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our mission to preserve and promote Newa language and culture.
            Your skills and passion can make a real difference.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
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
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Contribution Area */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Contribution Area
                  </h2>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Select your area of contribution *
                  </label>
                  <div className="space-y-4">
                    {contributionAreas.map((category) => (
                      <div
                        key={category.category}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {category.category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {category.options.map((option) => {
                            const IconComponent = option.icon;
                            return (
                              <label
                                key={option.value}
                                className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                                  formData.contributionArea === option.value
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="contributionArea"
                                  value={option.value}
                                  checked={
                                    formData.contributionArea === option.value
                                  }
                                  onChange={handleInputChange}
                                  className="sr-only"
                                />
                                <IconComponent className="w-5 h-5 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">
                                  {option.label}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Tell Us More
                  </h2>
                </div>

                {/* Motivation */}
                <div>
                  <label
                    htmlFor="motivation"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    What motivates you to contribute to this platform? *
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Share your passion for Newa language and culture..."
                  />
                </div>

                {/* Skills and Experience */}
                <div>
                  <label
                    htmlFor="skillsExperience"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Your existing skills or experience in the selected domain *
                  </label>
                  <textarea
                    id="skillsExperience"
                    name="skillsExperience"
                    value={formData.skillsExperience}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Describe your relevant skills, experience, and qualifications..."
                  />
                </div>

                {/* What Can Contribute */}
                <div>
                  <label
                    htmlFor="whatCanContribute"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    What can you contribute to this platform? *
                  </label>
                  <textarea
                    id="whatCanContribute"
                    name="whatCanContribute"
                    value={formData.whatCanContribute}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Describe specific ways you can help improve and grow our platform..."
                  />
                </div>

                {/* Expectations */}
                <div>
                  <label
                    htmlFor="expectations"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Your expectations from us
                  </label>
                  <textarea
                    id="expectations"
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="What would you like to gain from this contribution experience?"
                  />
                </div>

                {/* Questions */}
                <div>
                  <label
                    htmlFor="questions"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Any questions or additional information?
                  </label>
                  <textarea
                    id="questions"
                    name="questions"
                    value={formData.questions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Feel free to ask anything or share additional details..."
                  />
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
                    <span>Submit Application</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    onClick={() => {
                      if (confirm("Are you sure you want to reset the form?")) {
                        setFormData({
                          fullName: "",
                          email: "",
                          gender: "",
                          phoneNumber: "",
                          contributionArea: "",
                          motivation: "",
                          skillsExperience: "",
                          whatCanContribute: "",
                          expectations: "",
                          questions: "",
                        });
                      }
                    }}
                  >
                    Reset Form
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What happens next?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
              Our team will review your application within 3-5 business days. If
              your profile matches our current needs, we&apos;ll reach out to
              discuss the next steps and how you can start contributing to our
              mission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
