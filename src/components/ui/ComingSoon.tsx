import Link from "next/link";
import Image from "next/image";
import { Target, Volume2, Building, Brain, Zap, Trophy } from "lucide-react";
import { paths } from "@/config/paths";
import { Button } from "@/components/ui/Button";
import { PageLayout, ContentSection } from "@/components/ui/Layout";

interface ComingSoonProps {
  title: string;
  description: string;
  features: string[];
  illustration: string;
  primaryColor: "red" | "blue";
  imageSize?: "normal" | "large";
}

export function ComingSoon({
  title,
  description,
  features,
  illustration,
  primaryColor,
  imageSize = "normal",
}: ComingSoonProps) {
  const colorClasses = {
    red: {
      gradient: "from-red-50 via-white to-pink-50",
      accent: "red-500",
      secondary: "blue-500",
      text: "text-red-600",
      bg: "bg-red-500",
      border: "border-red-200",
      hover: "hover:bg-red-600",
      cardBg: "bg-white/95",
      textSecondary: "text-gray-700",
      iconBg: "bg-red-100",
    },
    blue: {
      gradient: "from-blue-50 via-white to-cyan-50",
      accent: "blue-500",
      secondary: "red-500",
      text: "text-blue-600",
      bg: "bg-blue-500",
      border: "border-blue-200",
      hover: "hover:bg-blue-600",
      cardBg: "bg-white/95",
      textSecondary: "text-gray-700",
      iconBg: "bg-blue-100",
    },
  };

  const colors = colorClasses[primaryColor];

  // Function to get the appropriate icon based on the feature content
  const getFeatureIcon = (feature: string, index: number) => {
    const lowerFeature = feature.toLowerCase();

    if (
      lowerFeature.includes("progressive") ||
      lowerFeature.includes("difficulty") ||
      lowerFeature.includes("adaptive")
    ) {
      return <Target className={`w-5 h-5 ${colors.text}`} />;
    } else if (
      lowerFeature.includes("audio") ||
      lowerFeature.includes("interactive") ||
      lowerFeature.includes("feedback")
    ) {
      return lowerFeature.includes("audio") ? (
        <Volume2 className={`w-5 h-5 ${colors.text}`} />
      ) : (
        <Zap className={`w-5 h-5 ${colors.text}`} />
      );
    } else if (
      lowerFeature.includes("cultural") ||
      lowerFeature.includes("heritage")
    ) {
      return <Building className={`w-5 h-5 ${colors.text}`} />;
    } else if (
      lowerFeature.includes("gamified") ||
      lowerFeature.includes("achievements")
    ) {
      return <Trophy className={`w-5 h-5 ${colors.text}`} />;
    } else if (
      lowerFeature.includes("brain") ||
      lowerFeature.includes("questions")
    ) {
      return <Brain className={`w-5 h-5 ${colors.text}`} />;
    }

    // Default icons based on index
    const defaultIcons = [
      <Target key="target" className={`w-5 h-5 ${colors.text}`} />,
      <Volume2 key="volume" className={`w-5 h-5 ${colors.text}`} />,
      <Building key="building" className={`w-5 h-5 ${colors.text}`} />,
    ];

    return (
      defaultIcons[index] || <Target className={`w-5 h-5 ${colors.text}`} />
    );
  };

  return (
    <PageLayout>
      <ContentSection>
        <div className="text-center">
          {/* Main Icon */}
          {/* Main Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative group cursor-pointer">
              {/* Main icon container with glassmorphism effect */}
              <div
                className={`relative w-28 h-28 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl border border-white/30 group-hover:scale-105 transition-all duration-700 ease-out group-hover:shadow-3xl`}
                style={{
                  boxShadow: `
                      0 25px 50px -12px rgba(0, 0, 0, 0.15),
                      0 0 0 1px rgba(255, 255, 255, 0.2) inset,
                      0 1px 0 0 rgba(255, 255, 255, 0.4) inset
                    `,
                }}
              >
                {/* Animated gradient border - Dynamic colors based on theme */}
                <div
                  className="absolute inset-0 rounded-full p-[2px] animate-spin-glow"
                  style={{
                    background:
                      primaryColor === "red"
                        ? "conic-gradient(from 0deg, #ef4444, #1d4ed8, #000000, #ef4444)"
                        : "conic-gradient(from 0deg, #1d4ed8, #ef4444, #000000, #1d4ed8)",
                    animation: "spin 2s linear infinite",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl"></div>
                </div>

                {/* Inner clock face with modern design */}
                <div
                  className={`relative w-20 h-20 bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner border-2 border-gray-200/60 overflow-hidden`}
                  style={{
                    boxShadow: `
                        inset 0 2px 4px 0 rgba(0, 0, 0, 0.06),
                        inset 0 -2px 4px 0 rgba(255, 255, 255, 0.8),
                        0 0 0 1px rgba(0, 0, 0, 0.05)
                      `,
                  }}
                >
                  {/* Modern minimalist hour markers */}
                  <div className="absolute inset-0">
                    {/* 12, 3, 6, 9 o'clock - Primary markers */}
                    {[0, 90, 180, 270].map((rotation, index) => (
                      <div
                        key={`primary-${index}`}
                        className={`absolute w-1 h-3 bg-black/80 rounded-full`}
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-41px)`,
                          transformOrigin: "center center",
                        }}
                      />
                    ))}
                    
                  </div>{" "}
                  {/* Modern clock hands - Realistic behavior like a real clock */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Hour hand - SHORT, thick, dark, and STATIC (like real clock) - Made longer and thinner */}
                    <div
                      className="absolute w-1 h-6 bg-gradient-to-t from-black via-gray-800 to-gray-700 rounded-full shadow-lg"
                      style={{
                        transformOrigin: "center bottom",
                        bottom: "50%",
                        transform: "rotate(45deg)",
                        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
                      }}
                    />

                    {/* Minute hand - LONG, thin, dark, and ROTATING (like real clock) - Made longer */}
                    <div
                      className="absolute w-0.5 h-8 bg-gradient-to-t from-black via-gray-800 to-gray-600 rounded-full shadow-lg"
                      style={{
                        transformOrigin: "center bottom",
                        bottom: "50%",
                        animation: "spin 8s linear infinite",
                        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
                      }}
                    />

                    {/* Center hub - Dark with colored accent */}
                    <div className="absolute flex items-center justify-center">
                      <div
                        className="w-4 h-4 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-lg border-2 border-white/80"
                        style={{
                          boxShadow: `
                              0 2px 4px rgba(0, 0, 0, 0.2),
                              0 0 0 1px rgba(255, 255, 255, 0.3) inset
                            `,
                        }}
                      />
                      <div
                        className={`absolute w-2 h-2 bg-gradient-to-br from-${colors.accent} to-${colors.secondary} rounded-full shadow-inner border border-white/60`}
                      />
                    </div>
                  </div>
                  {/* Animated light reflection */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-full animate-shine"
                    style={{
                      animation: "shine 4s ease-in-out infinite",
                    }}
                  />
                  {/* Subtle radial pattern */}
                  <div className="absolute inset-2 rounded-full opacity-10">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-gray-400/20 to-transparent"></div>
                  </div>
                </div>

                {/* Modern floating elements - Different colors */}
                <div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-bounce shadow-lg border border-white/50"
                  style={{ animationDelay: "0s", animationDuration: "2s" }}
                />
                <div
                  className="absolute -bottom-2 -left-2 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-bounce shadow-lg border border-white/50"
                  style={{ animationDelay: "0.5s", animationDuration: "2s" }}
                />
                <div
                  className="absolute top-1/2 -right-3 w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-ping shadow-md"
                  style={{ animationDelay: "1s" }}
                />

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r from-${colors.accent}/20 via-transparent to-${colors.secondary}/20 blur-md animate-pulse`}
                  style={{ transform: "scale(1.2)" }}
                />
              </div>
            </div>
          </div>{" "}
          {/* Title and Description */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
            <span className={colors.text}>{title}</span>{" "}
            <span className="text-gray-800">Coming Soon!</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
            {description}
          </p>
        </div>
      </ContentSection>
      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Features List */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
              What to Expect
            </h2>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${colors.cardBg} backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md border ${colors.border} hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${colors.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}
                    >
                      {getFeatureIcon(feature, index)}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium text-sm sm:text-base leading-snug">
                        {feature}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Button
                asChild
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-auto text-base"
              >
                <Link href={paths.auth.signup}>Join Our Community</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-auto text-base"
              >
                <Link href={paths.home}>Explore Other Features</Link>
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative flex justify-center lg:justify-end items-start mt-6 lg:mt-0">
            {/* Image container aligned with feature points */}
            <div className="relative group flex justify-center items-start w-full max-w-sm sm:max-w-md lg:max-w-lg lg:ml-8">
              <div
                className={`${
                  imageSize === "large"
                    ? "w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px]"
                    : "w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[300px] lg:h-[300px]"
                } flex items-center justify-center`}
              >
                <Image
                  src={illustration}
                  alt={`${title} illustration`}
                  width={imageSize === "large" ? 420 : 300}
                  height={imageSize === "large" ? 420 : 300}
                  className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Floating decorative elements */}
            <div
              className={`absolute top-8 sm:top-12 left-6 sm:left-8 w-4 h-4 sm:w-6 sm:h-6 ${colors.iconBg} rounded-full opacity-40 animate-float`}
            ></div>
            <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-8 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full opacity-40 animate-float delay-500"></div>
            <div
              className={`absolute top-1/3 right-3 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 ${colors.bg} rounded-full opacity-30 animate-pulse delay-1000`}
            ></div>
          </div>
        </div>

        {/* Newsletter/Updates Section */}
        <div className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-8 sm:mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Be the First to Know
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              We&apos;re working hard to bring you the best learning experience.
              Join our community to get notified when {title.toLowerCase()}{" "}
              launches!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
              <Button
                size="lg"
                className="w-full sm:w-auto whitespace-nowrap px-6 py-3 h-12 text-base"
              >
                Notify Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
