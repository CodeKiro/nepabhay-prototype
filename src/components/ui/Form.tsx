import React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  children,
  className,
}) => {
  return (
    <div className={cn("space-y-2 sm:space-y-2", className)}>
      <label className="form-label text-sm sm:text-base font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="form-error text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <form className={cn("space-y-6", className)} {...props}>
      {children}
    </form>
  );
};

interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {(title || description) && (
        <div className="border-b border-gray-200 pb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

// Enhanced Input component that works with our form system
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const FormInput: React.FC<InputProps> = ({
  className,
  error,
  ...props
}) => {
  return (
    <input
      className={cn(
        "form-input h-12 sm:h-11 text-base sm:text-sm px-4 py-3 sm:py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors w-full placeholder:text-gray-400",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        className
      )}
      {...props}
    />
  );
};

// Enhanced Textarea component
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const FormTextarea: React.FC<TextareaProps> = ({
  className,
  error,
  ...props
}) => {
  return (
    <textarea
      className={cn(
        "form-input min-h-[100px] resize-y",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        className
      )}
      {...props}
    />
  );
};
