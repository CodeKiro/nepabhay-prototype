import React, { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id: string;
  title?: string;
  message: string;
  variant?: "success" | "error" | "warning" | "info";
  duration?: number;
  dismissible?: boolean;
  onDismiss?: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  title,
  message,
  variant = "info",
  duration = 5000,
  dismissible = true,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          onDismiss?.(id);
        }, 150);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onDismiss]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.(id);
    }, 150);
  };

  if (!isVisible) return null;

  const variants = {
    success: {
      icon: CheckCircle,
      className: "bg-green-50 text-green-900 border-green-200",
      iconClass: "text-green-600",
    },
    error: {
      icon: AlertCircle,
      className: "bg-red-50 text-red-900 border-red-200",
      iconClass: "text-red-600",
    },
    warning: {
      icon: AlertTriangle,
      className: "bg-yellow-50 text-yellow-900 border-yellow-200",
      iconClass: "text-yellow-600",
    },
    info: {
      icon: Info,
      className: "bg-blue-50 text-blue-900 border-blue-200",
      iconClass: "text-blue-600",
    },
  };

  const { icon: Icon, className: variantClass, iconClass } = variants[variant];

  return (
    <div
      className={cn(
        "flex items-start p-4 rounded-lg border shadow-lg min-w-[300px] max-w-[500px] transition-all duration-150",
        variantClass,
        isExiting && "translate-x-full opacity-0"
      )}
    >
      <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", iconClass)} />
      <div className="ml-3 flex-1">
        {title && <h4 className="text-sm font-medium mb-1">{title}</h4>}
        <p className="text-sm">{message}</p>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="ml-4 flex-shrink-0 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-opacity"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastProps[];
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = "top-right",
  onDismiss,
}) => {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  if (toasts.length === 0) return null;

  return (
    <div className={cn("fixed z-50 space-y-2", positionClasses[position])}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

// Toast hook for easy usage
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const success = (message: string, title?: string) => {
    addToast({ message, title, variant: "success" });
  };

  const error = (message: string, title?: string) => {
    addToast({ message, title, variant: "error" });
  };

  const warning = (message: string, title?: string) => {
    addToast({ message, title, variant: "warning" });
  };

  const info = (message: string, title?: string) => {
    addToast({ message, title, variant: "info" });
  };

  return {
    toasts,
    addToast,
    dismissToast,
    success,
    error,
    warning,
    info,
  };
};
