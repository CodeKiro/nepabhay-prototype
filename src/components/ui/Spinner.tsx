import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

export default function Spinner({
  size = "md",
  className = "",
  text,
}: SpinnerProps) {
  const sizeClasses = {
    xs: "h-3 w-3 sm:h-3 sm:w-3",
    sm: "h-4 w-4 sm:h-4 sm:w-4",
    md: "h-5 w-5 sm:h-6 sm:w-6",
    lg: "h-7 w-7 sm:h-8 sm:w-8",
    xl: "h-10 w-10 sm:h-12 sm:w-12",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2
        className={cn(
          "animate-spin text-blue-600",
          sizeClasses[size],
          className
        )}
      />
      {text && <p className="mt-2 text-xs sm:text-sm text-gray-600">{text}</p>}
    </div>
  );
}

export const PageSpinner: React.FC<{ text?: string; className?: string }> = ({
  text = "Loading...",
  className,
}) => (
  <div
    className={cn(
      "flex items-center justify-center min-h-[300px] sm:min-h-[400px] w-full px-4",
      className
    )}
  >
    <Spinner size="lg" text={text} />
  </div>
);

export const InlineSpinner: React.FC<{
  size?: "xs" | "sm" | "md";
  className?: string;
}> = ({ size = "sm", className }) => (
  <Spinner size={size} className={className} />
);
