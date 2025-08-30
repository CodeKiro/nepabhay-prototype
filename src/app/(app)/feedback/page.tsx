"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  User,
  MessageCircle,
  Star,
  ThumbsUp,
  Bug,
  Lightbulb,
  Heart,
  Send,
  AlertCircle,
} from "lucide-react";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "",
    subject: "",
    message: "",
    rating: "",
    experienceArea: "",
    suggestions: "",
    technicalIssues: "",
    contactPermission: false,
  });

  const feedbackTypes = [
    {
      value: "general",
      label: "General Feedback",
      icon: MessageCircle,
      description: "Share your overall thoughts about the platform",
    },
    {
      value: "bug",
      label: "Bug Report",
      icon: Bug,
      description: "Report technical issues or problems you encountered",
    },
    {
      value: "feature",
      label: "Feature Request",
      icon: Lightbulb,
      description: "Suggest new features or improvements",
    },
    {
      value: "content",
      label: "Content Feedback",
      icon: Heart,
      description: "Feedback about lessons, articles, or educational content",
    },
    {
      value: "praise",
      label: "Appreciation",
      icon: ThumbsUp,
      description: "Share what you love about the platform",
    },
  ];

  const experienceAreas = [
    "User Interface & Design",
    "Learning Content & Lessons",
    "Navigation & Usability",
    "Performance & Speed",
    "Mobile Experience",
    "Content Accuracy",
    "Community Features",
    "Overall Experience",
  ];

  const ratingOptions = [
    { value: "5", label: "Excellent", emoji: "😍" },
    { value: "4", label: "Good", emoji: "😊" },
    { value: "3", label: "Average", emoji: "😐" },
    { value: "2", label: "Poor", emoji: "😞" },
    { value: "1", label: "Very Poor", emoji: "😡" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API connection
    console.log("Feedback submitted:", formData);
    alert(
      "Thank you for your feedback! We appreciate your input and will review it carefully."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-black">Share Your </span>
            <span className="text-red-500">Feedback</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us improve Nepa:Bhay with your valuable insights and
            suggestions. Every piece of feedback helps us serve you better.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your name"
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
                </div>
              </div>

              {/* Feedback Type */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Feedback Type
                  </h2>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    What type of feedback are you sharing? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {feedbackTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <label
                          key={type.value}
                          className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.feedbackType === type.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="feedbackType"
                            value={type.value}
                            checked={formData.feedbackType === type.value}
                            onChange={handleInputChange}
                            className="sr-only"
                            required
                          />
                          <div className="flex items-center space-x-3 mb-2">
                            <IconComponent className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-900">
                              {type.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {type.description}
                          </p>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Overall Rating
                  </h2>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    How would you rate your overall experience? *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {ratingOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center space-x-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.rating === option.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={option.value}
                          checked={formData.rating === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                          required
                        />
                        <span className="text-lg">{option.emoji}</span>
                        <span className="font-medium text-gray-900">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Feedback */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Your Feedback
                  </h2>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Brief summary of your feedback"
                  />
                </div>

                {/* Experience Area */}
                <div>
                  <label
                    htmlFor="experienceArea"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Which area of the platform is this feedback about?
                  </label>
                  <select
                    id="experienceArea"
                    name="experienceArea"
                    value={formData.experienceArea}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select an area</option>
                    {experienceAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Main Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Your Feedback Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Please share your detailed feedback, suggestions, or report any issues you've encountered..."
                  />
                </div>

                {/* Suggestions */}
                <div>
                  <label
                    htmlFor="suggestions"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Suggestions for Improvement
                  </label>
                  <textarea
                    id="suggestions"
                    name="suggestions"
                    value={formData.suggestions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="What specific improvements would you like to see?"
                  />
                </div>

                {/* Technical Issues */}
                {formData.feedbackType === "bug" && (
                  <div>
                    <label
                      htmlFor="technicalIssues"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Technical Details (for bug reports)
                    </label>
                    <textarea
                      id="technicalIssues"
                      name="technicalIssues"
                      value={formData.technicalIssues}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Please describe the steps to reproduce the issue, browser/device used, and any error messages..."
                    />
                  </div>
                )}

                {/* Contact Permission */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="contactPermission"
                    name="contactPermission"
                    checked={formData.contactPermission}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="contactPermission"
                    className="text-sm text-gray-700 leading-relaxed"
                  >
                    I give permission to be contacted about this feedback for
                    clarification or follow-up questions.
                  </label>
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
                    <span>Submit Feedback</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    onClick={() => {
                      if (confirm("Are you sure you want to reset the form?")) {
                        setFormData({
                          name: "",
                          email: "",
                          feedbackType: "",
                          subject: "",
                          message: "",
                          rating: "",
                          experienceArea: "",
                          suggestions: "",
                          technicalIssues: "",
                          contactPermission: false,
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
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <AlertCircle className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What happens to your feedback?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              All feedback is reviewed by our team within 2-3 business days. We
              use your input to prioritize improvements and fix issues.
              You&apos;ll receive a response if you&apos;ve given permission to
              be contacted.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <Heart className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Thank you for caring
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your feedback helps us preserve and promote Newa language and
              culture. Every suggestion, bug report, and appreciation message
              motivates us to keep improving this platform for our community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
