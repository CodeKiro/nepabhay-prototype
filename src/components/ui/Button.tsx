import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md active:bg-blue-800",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:shadow-md active:bg-red-700",
        outline:
          "border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900 hover:shadow-md active:bg-gray-100",
        secondary:
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 hover:shadow-md active:bg-gray-300",
        ghost: "hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200",
        link: "text-blue-600 underline-offset-4 hover:underline focus:ring-0 focus:ring-offset-0",
        success:
          "bg-green-600 text-white shadow-sm hover:bg-green-700 hover:shadow-md active:bg-green-800",
        warning:
          "bg-yellow-600 text-white shadow-sm hover:bg-yellow-700 hover:shadow-md active:bg-yellow-800",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm sm:h-9 sm:text-sm",
        sm: "h-9 px-3 py-1.5 text-xs sm:h-8 sm:text-xs",
        lg: "h-12 px-6 py-3 text-base sm:h-11 sm:px-8 sm:text-base",
        xl: "h-14 px-8 py-4 text-lg sm:h-12 sm:px-10 sm:text-lg",
        icon: "h-10 w-10 sm:h-9 sm:w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
        {
          className: cn(buttonVariants({ variant, size }), className),
        }
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading && loadingText ? loadingText : children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
