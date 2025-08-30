import React from "react";
import { AlertTriangle, X, RefreshCw, Info, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ErrorAlertProps {
  title?: string;
  message: string;
  type?: "error" | "warning" | "info" | "success";
  dismissible?: boolean;
  showRetry?: boolean;
  onDismiss?: () => void;
  onRetry?: () => void;
  className?: string;
}

export function ErrorAlert({
  title,
  message,
  type = "error",
  dismissible = false,
  showRetry = false,
  onDismiss,
  onRetry,
  className,
}: ErrorAlertProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "error":
        return {
          container: "bg-red-50 border-red-200 text-red-800",
          icon: "text-red-500",
          button: "text-red-600 hover:text-red-800",
          Icon: AlertTriangle,
        };
      case "warning":
        return {
          container: "bg-yellow-50 border-yellow-200 text-yellow-800",
          icon: "text-yellow-500",
          button: "text-yellow-600 hover:text-yellow-800",
          Icon: AlertTriangle,
        };
      case "info":
        return {
          container: "bg-blue-50 border-blue-200 text-blue-800",
          icon: "text-blue-500",
          button: "text-blue-600 hover:text-blue-800",
          Icon: Info,
        };
      case "success":
        return {
          container: "bg-green-50 border-green-200 text-green-800",
          icon: "text-green-500",
          button: "text-green-600 hover:text-green-800",
          Icon: CheckCircle,
        };
      default:
        return {
          container: "bg-red-50 border-red-200 text-red-800",
          icon: "text-red-500",
          button: "text-red-600 hover:text-red-800",
          Icon: AlertTriangle,
        };
    }
  };

  const styles = getTypeStyles();
  const { Icon } = styles;

  return (
    <div className={cn("rounded-lg border p-4", styles.container, className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={cn("h-5 w-5", styles.icon)} />
        </div>
        <div className="ml-3 flex-1">
          {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
          <p className="text-sm">{message}</p>

          {showRetry && onRetry && (
            <div className="mt-3">
              <button
                onClick={onRetry}
                className={cn(
                  "inline-flex items-center text-sm font-medium hover:underline",
                  styles.button
                )}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Try Again
              </button>
            </div>
          )}
        </div>

        {dismissible && onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className={cn(
                  "inline-flex rounded-md p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300",
                  styles.button
                )}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Predefined error alert components for common use cases
export function NetworkErrorAlert({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorAlert
      title="Connection Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
      type="error"
      showRetry={true}
      onRetry={onRetry}
    />
  );
}

export function AuthErrorAlert({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorAlert
      title="Authentication Error"
      message="Your session has expired. Please sign in again to continue."
      type="warning"
      showRetry={true}
      onRetry={onRetry}
    />
  );
}

export function PermissionErrorAlert() {
  return (
    <ErrorAlert
      title="Permission Denied"
      message="You don't have permission to access this resource."
      type="error"
    />
  );
}

export function MaintenanceAlert() {
  return (
    <ErrorAlert
      title="Maintenance Mode"
      message="We're currently performing maintenance. Please try again in a few minutes."
      type="info"
    />
  );
}
