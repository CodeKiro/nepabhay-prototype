"use client";

import { useState, useCallback } from "react";

export interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorInfo?: React.ErrorInfo;
}

export interface UseErrorHandlerReturn {
  errorState: ErrorState;
  setError: (error: Error, errorInfo?: React.ErrorInfo) => void;
  clearError: () => void;
  handleAsyncError: <T>(asyncFn: () => Promise<T>) => Promise<T | null>;
  withErrorHandling: <T extends unknown[], R>(
    fn: (...args: T) => R
  ) => (...args: T) => R | null;
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
  });

  const setError = useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    console.error("Error caught by useErrorHandler:", error, errorInfo);
    setErrorState({
      hasError: true,
      error,
      errorInfo,
    });
  }, []);

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
    });
  }, []);

  const handleAsyncError = useCallback(
    async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
      try {
        const result = await asyncFn();
        // Clear any previous errors on success
        if (errorState.hasError) {
          clearError();
        }
        return result;
      } catch (error) {
        setError(error as Error);
        return null;
      }
    },
    [errorState.hasError, clearError, setError]
  );

  const withErrorHandling = useCallback(
    <T extends unknown[], R>(fn: (...args: T) => R) =>
      (...args: T): R | null => {
        try {
          const result = fn(...args);
          // Clear any previous errors on success
          if (errorState.hasError) {
            clearError();
          }
          return result;
        } catch (error) {
          setError(error as Error);
          return null;
        }
      },
    [errorState.hasError, clearError, setError]
  );

  return {
    errorState,
    setError,
    clearError,
    handleAsyncError,
    withErrorHandling,
  };
}

// Hook for handling specific types of errors
export function useApiErrorHandler() {
  const errorHandler = useErrorHandler();

  const handleApiError = useCallback(
    (error: unknown) => {
      // Type guard to check if error has response property (axios-like error)
      const hasResponse = (
        err: unknown
      ): err is { response: { status: number } } => {
        return typeof err === "object" && err !== null && "response" in err;
      };

      // Type guard to check if error has code property
      const hasCode = (err: unknown): err is { code: string } => {
        return typeof err === "object" && err !== null && "code" in err;
      };

      if (hasResponse(error) && error.response?.status === 401) {
        // Handle authentication errors
        errorHandler.setError(
          new Error("Authentication required. Please sign in again.")
        );
      } else if (hasResponse(error) && error.response?.status === 403) {
        // Handle permission errors
        errorHandler.setError(
          new Error("You don't have permission to perform this action.")
        );
      } else if (hasResponse(error) && error.response?.status === 404) {
        // Handle not found errors
        errorHandler.setError(
          new Error("The requested resource was not found.")
        );
      } else if (hasResponse(error) && error.response?.status >= 500) {
        // Handle server errors
        errorHandler.setError(
          new Error("Server error. Please try again later.")
        );
      } else if (hasCode(error) && error.code === "NETWORK_ERROR") {
        // Handle network errors
        errorHandler.setError(
          new Error("Network error. Please check your connection.")
        );
      } else {
        // Handle generic errors
        errorHandler.setError(
          error instanceof Error
            ? error
            : new Error("An unexpected error occurred.")
        );
      }
    },
    [errorHandler]
  );

  return {
    ...errorHandler,
    handleApiError,
  };
}

// Utility function to get user-friendly error messages
export function getErrorMessage(error: Error): string {
  // Check for specific error types and return appropriate messages
  if (error.message.includes("network") || error.message.includes("fetch")) {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  if (error.message.includes("401") || error.message.includes("unauthorized")) {
    return "Your session has expired. Please sign in again.";
  }

  if (error.message.includes("403") || error.message.includes("forbidden")) {
    return "You don't have permission to perform this action.";
  }

  if (error.message.includes("404") || error.message.includes("not found")) {
    return "The requested resource was not found.";
  }

  if (error.message.includes("500") || error.message.includes("server error")) {
    return "We're experiencing technical difficulties. Please try again later.";
  }

  // Return the original error message for debugging in development
  if (process.env.NODE_ENV === "development") {
    return error.message;
  }

  // Generic error message for production
  return "An unexpected error occurred. Please try again.";
}
