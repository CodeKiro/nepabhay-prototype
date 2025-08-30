"use client";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  showBrand?: boolean;
  className?: string;
}

export default function Loading({
  size = "lg",
  showBrand = true,
  className = "",
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-12 h-8 sm:w-14 sm:h-10",
    md: "w-16 h-12 sm:w-18 sm:h-14",
    lg: "w-20 h-14 sm:w-24 sm:h-16",
    xl: "w-24 h-16 sm:w-28 sm:h-20",
  };

  const dotSizes = {
    sm: "w-1.5 h-1.5 sm:w-2 sm:h-2",
    md: "w-2 h-2 sm:w-2.5 sm:h-2.5",
    lg: "w-2 h-2 sm:w-2.5 sm:h-2.5",
    xl: "w-2.5 h-2.5 sm:w-3 sm:h-3",
  };

  const textSizes = {
    sm: "text-lg sm:text-xl",
    md: "text-xl sm:text-2xl",
    lg: "text-xl sm:text-2xl",
    xl: "text-2xl sm:text-3xl",
  };

  // If the className includes a custom height, use it. Otherwise, always use min-h-screen for consistency.
  const hasCustomHeight = /h-|min-h-|max-h-/.test(className);
  const heightClass = hasCustomHeight
    ? className
    : "w-full min-h-screen " + className;

  return (
    <div
      className={`flex items-center justify-center relative overflow-hidden px-3 sm:px-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50 ${heightClass}`}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-blue-400 rounded-full opacity-30 animate-ping"
          style={{ animationDuration: "3s", animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-red-400 rounded-full opacity-30 animate-ping"
          style={{ animationDuration: "3s", animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Animation - Always centered */}
      <div className="text-center w-full">
        {/* Language learning book animation */}
        <div className="relative mb-6 sm:mb-8">
          <div className={`${sizeClasses[size]} mx-auto`}>
            {/* Book pages */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-r-lg opacity-90 origin-left animate-flip-page"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-r-lg opacity-90 origin-left animate-flip-page-delayed"></div>
              {/* Book spine */}
              <div className="absolute left-0 top-0 w-1 h-full bg-gray-700 rounded-l-sm"></div>
            </div>
          </div>
        </div>

        {/* Loading dots with moving animation */}
        <div className="flex justify-center space-x-2 sm:space-x-3">
          <div
            className={`${dotSizes[size]} bg-red-500 rounded-full animate-bounce`}
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className={`${dotSizes[size]} bg-gray-800 rounded-full animate-bounce`}
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className={`${dotSizes[size]} bg-blue-500 rounded-full animate-bounce`}
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>

      {/* Brand name - Fixed at bottom */}
      {showBrand && (
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2">
          <h1 className={`${textSizes[size]} font-bold tracking-wide`}>
            <span className="text-red-500">Nepa</span>
            <span className="text-gray-700 font-bold">:</span>
            <span className="text-blue-500">Bhay</span>
          </h1>
        </div>
      )}
    </div>
  );
}
