"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { paths } from "@/config/paths";
import { FileText, Star, TrendingUp } from "lucide-react";
import {
  useGetFeaturedPostsQuery,
  useGetPostsQuery,
} from "@/lib/store/api/postsApi";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showToast, setShowToast] = useState(false);

  const {
    data: featuredResponse,
    isLoading: featuredLoading,
    error: featuredError,
  } = useGetFeaturedPostsQuery({ limit: 6 });

  const {
    data: homepageResponse,
    isLoading: homepageLoading,
    error: homepageError,
  } = useGetPostsQuery({
    limit: 6,
    homepage: true,
  });

  const featuredPosts = featuredResponse?.data || [];
  const homepagePosts = homepageResponse?.data || [];

  useEffect(() => {
    // Check for onboarding success
    if (searchParams.get("onboarded") === "true") {
      setShowToast(true);
      // Hide toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 4000);

      // Clean up the URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("onboarded");
      router.replace(newUrl.pathname, { scroll: false });
    }
  }, [searchParams, router]);

  if (featuredLoading || homepageLoading) {
    return <Loading />;
  }

  if (featuredError || homepageError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            Failed to load content. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 duration-300">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-sm font-medium">
              Profile setup completed successfully!
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-10 h-10 sm:w-16 sm:h-16 bg-red-200/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/4 right-8 sm:right-16 w-8 h-8 sm:w-12 sm:h-12 bg-blue-300/40 rounded-full animate-bounce delay-300"></div>
            <div className="absolute bottom-1/3 right-4 sm:right-8 w-6 h-6 sm:w-10 sm:h-10 bg-red-300/25 rounded-full animate-pulse delay-700"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 sm:gap-8 items-center min-h-[75vh]">
              {/* Content Section - 60% */}
              <div className="space-y-4 sm:space-y-5 z-10 order-2 lg:order-1">
                {/* Subtitle Badge */}
                <div className="inline-flex items-center justify-center">
                  {/* Mobile version - compact and modern */}
                  <div className="sm:hidden bg-gradient-to-r from-red-100 to-blue-100 px-4 py-2 rounded-full border border-red-200/50">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-800">
                        Our Heritage, Our Pride
                      </span>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Desktop version - full text */}
                  <div className="hidden sm:inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-100 to-blue-100 rounded-full border border-red-200/50">
                    <span className="text-base text-gray-800 font-medium">
                      Protection of Language, Preservation of Culture
                    </span>
                  </div>
                </div>

                {/* Main Heading */}
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight">
                    <div className="mb-1">
                      <span className="text-red-600">Learn</span>
                    </div>
                    <div className="mb-3 sm:mb-4">
                      <span className="text-black">Nepal Bhasa</span>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl text-blue-600 font-semibold">
                      With Community
                    </div>
                  </h1>

                  {/* Decorative line */}
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="h-1 w-12 sm:w-16 bg-red-500 rounded-full"></div>
                    <div className="h-1 w-6 sm:w-8 bg-blue-500 rounded-full"></div>
                    <div className="h-1 w-3 sm:w-4 bg-black rounded-full"></div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base sm:text-xl text-gray-700 leading-relaxed max-w-2xl text-justify">
                  Discover the beauty of{" "}
                  <span className="font-semibold text-red-600">
                    Newa: Language and Culture
                  </span>{" "}
                  through interactive{" "}
                  <span className="font-semibold text-gray-800">lessons</span>,{" "}
                  <span className="font-semibold text-gray-800">
                    cultural articles
                  </span>
                  , and{" "}
                  <span className="font-semibold text-gray-800">
                    community-driven stories
                  </span>
                  . Join thousands in preserving and promoting Nepal&apos;s rich
                  linguistic heritage for future generations.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                  <Button
                    size="xl"
                    className="bg-black text-white px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-bold hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-black/25 text-base sm:text-xl"
                    asChild
                  >
                    <Link href={paths.lessons}>Start Learning Free</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-2 border-blue-500 text-red-600 px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-bold hover:bg-blue-50 transition-all duration-300 hover:scale-105 text-base sm:text-xl"
                    asChild
                  >
                    <Link href={paths.lessons}>Browse Lessons</Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-4 sm:space-x-8 pt-4 text-gray-600">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-red-600">
                      Free
                    </div>
                    <div className="text-xs sm:text-sm">Forever</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-600">
                      Interactive
                    </div>
                    <div className="text-xs sm:text-sm">Learning</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-gray-800">
                      Community
                    </div>
                    <div className="text-xs sm:text-sm">Driven</div>
                  </div>
                </div>
              </div>

              {/* Image Section - 40% - Larger Image */}
              <div className="relative order-1 lg:order-2">
                <div className="relative">
                  {/* Background decorative shapes */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-red-100 rounded-full opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-44 h-44 sm:w-68 sm:h-68 bg-blue-100 rounded-full opacity-70"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-[32rem] sm:h-[32rem] bg-gradient-to-r from-red-50 to-blue-50 rounded-full opacity-80"></div>
                  </div>

                  {/* Main illustration - Maximum Size */}
                  <div className="relative z-10 transform hover:scale-105 transition-transform duration-700 lg:translate-x-10 lg:translate-y-8 flex justify-center items-center">
                    <Image
                      src="/stickers/boygirlwithflag.svg"
                      alt="Nepal Bhasa learning community"
                      width={1400}
                      height={1200}
                      className="mx-auto w-full max-w-xs sm:max-w-md lg:hidden"
                      priority
                    />
                    <Image
                      src="/stickers/boygirlwithflag.svg"
                      alt="Nepal Bhasa learning community"
                      width={1400}
                      height={1200}
                      className="mx-auto hidden lg:block"
                      style={{
                        width: "600px",
                        height: "auto",
                        minWidth: "500px",
                        maxWidth: "none",
                      }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-foreground via-foreground/95 to-foreground">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background mb-3 sm:mb-4">
                Join Our Community
              </h2>
              <p className="text-base sm:text-xl text-background/90 max-w-3xl mx-auto">
                A collaborative platform where Newa language enthusiasts come
                together to learn, share, and preserve our rich linguistic
                heritage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center space-y-4 sm:space-y-6 p-6 sm:p-8 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="bg-secondary/20 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-background">
                  Collaborative Learning
                </h3>
                <p className="text-sm sm:text-base text-background/80 leading-relaxed">
                  Learn together through community-contributed lessons and
                  collaborative learning experiences.
                </p>
              </div>

              <div className="text-center space-y-4 sm:space-y-6 p-6 sm:p-8 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="bg-primary/20 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-background">
                  Shared Knowledge
                </h3>
                <p className="text-sm sm:text-base text-background/80 leading-relaxed">
                  Explore cultural articles and stories from members passionate
                  about preserving Newa traditions.
                </p>
              </div>

              <div className="text-center space-y-4 sm:space-y-6 p-6 sm:p-8 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="bg-secondary/20 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* Left person - smaller and higher */}
                    <circle cx="4.5" cy="5" r="2" strokeWidth="2" />
                    <path
                      d="M1 16c0-2.2 1.5-4 3.5-4s3.5 1.8 3.5 4"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    {/* Center person - even bigger */}
                    <circle cx="12" cy="6" r="3.5" strokeWidth="2" />
                    <path
                      d="M6.5 19.5c0-3 2.2-5.5 5.5-5.5s5.5 2.5 5.5 5.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    {/* Right person - smaller and higher */}
                    <circle cx="19.5" cy="5" r="2" strokeWidth="2" />
                    <path
                      d="M16 16c0-2.2 1.5-4 3.5-4s3.5 1.8 3.5 4"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-background">
                  Community Driven
                </h3>
                <p className="text-sm sm:text-base text-background/80 leading-relaxed">
                  Be part of a passionate network actively working to protect
                  and promote Nepal&apos;s linguistic legacy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Content Section */}
        {(featuredPosts.length > 0 || homepagePosts.length > 0) && (
          <section className="py-16 sm:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                  Featured Content
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                  Discover amazing stories, articles, and cultural content from
                  our community.
                </p>
              </div>

              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <div className="flex items-center gap-2 mb-6 sm:mb-8">
                    <Star className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                      Top Picks
                    </h3>
                  </div>
                  <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredPosts.slice(0, 6).map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                </div>
              )}

              {/* Homepage Posts */}
              {homepagePosts.length > 0 && (
                <div className="mb-12 sm:mb-16">
                  <div className="flex items-center gap-2 mb-6 sm:mb-8">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                      Trending Now
                    </h3>
                  </div>
                  <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {homepagePosts.slice(0, 6).map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center">
                <Link
                  href={paths.articles}
                  className="bg-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-secondary/90 transition-all duration-200 font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  Explore All Articles
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
}
