import React from "react";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  background?: "default" | "gradient" | "pattern" | "muted";
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  className,
  background = "default",
  containerSize = "xl",
  padding = "md",
}) => {
  const backgroundClasses = {
    default: "bg-white",
    gradient: "bg-gradient-to-br from-blue-50 via-white to-indigo-50",
    pattern:
      "bg-gray-50 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.05)_1px,_transparent_0)] bg-[length:24px_24px]",
    muted: "bg-gray-50",
  };

  const containerClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  const paddingClasses = {
    none: "",
    sm: "py-4",
    md: "py-8",
    lg: "py-12",
  };

  return (
    <div className={cn("min-h-screen", backgroundClasses[background])}>
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          containerClasses[containerSize],
          paddingClasses[padding]
        )}
      >
        {(title || description) && (
          <div className="mb-8 pb-6 border-b border-gray-200">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            )}
            {description && (
              <p className="text-lg text-gray-600">{description}</p>
            )}
          </div>
        )}
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export const ContentSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "none" | "white" | "gray" | "gradient";
}> = ({ children, className, spacing = "md", background = "none" }) => {
  const spacingClasses = {
    none: "",
    sm: "py-6",
    md: "py-12",
    lg: "py-16",
    xl: "py-20",
  };

  const backgroundClasses = {
    none: "",
    white: "bg-white rounded-lg shadow-sm",
    gray: "bg-gray-50 rounded-lg",
    gradient: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg",
  };

  return (
    <section
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        background !== "none" && "p-6 sm:p-8",
        className
      )}
    >
      {children}
    </section>
  );
};

export const GridLayout: React.FC<{
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}> = ({ children, cols = 3, gap = "md", className }) => {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <div className={cn("grid", colClasses[cols], gapClasses[gap], className)}>
      {children}
    </div>
  );
};
