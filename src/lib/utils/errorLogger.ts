/**
 * Error logging utility for tracking and reporting errors
 */

export interface ErrorLogEntry {
  id: string;
  timestamp: string;
  message: string;
  stack?: string;
  userAgent?: string;
  url?: string;
  userId?: string;
  level: "error" | "warning" | "info";
  context?: Record<string, unknown>;
}

class ErrorLogger {
  private logs: ErrorLogEntry[] = [];
  private maxLogs = 100; // Keep only last 100 logs in memory

  /**
   * Log an error with context
   */
  logError(
    error: Error | string,
    context?: Record<string, unknown>,
    level: "error" | "warning" | "info" = "error"
  ): void {
    const entry: ErrorLogEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      message: typeof error === "string" ? error : error.message,
      stack: typeof error === "string" ? undefined : error.stack,
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : undefined,
      url: typeof window !== "undefined" ? window.location.href : undefined,
      level,
      context,
    };

    // Add to in-memory logs
    this.logs.push(entry);

    // Trim logs if exceeding max
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console log in development
    if (process.env.NODE_ENV === "development") {
      console.group(`🚨 Error Log [${level.toUpperCase()}]`);
      console.error("Message:", entry.message);
      if (entry.stack) console.error("Stack:", entry.stack);
      if (context) console.error("Context:", context);
      console.groupEnd();
    }

    // Send to external logging service in production
    if (process.env.NODE_ENV === "production") {
      this.sendToExternalService(entry);
    }
  }

  /**
   * Log a network error
   */
  logNetworkError(
    url: string,
    method: string,
    status?: number,
    responseText?: string
  ): void {
    this.logError(
      `Network error: ${method} ${url} ${status ? `(${status})` : ""}`,
      {
        url,
        method,
        status,
        responseText: responseText?.substring(0, 500), // Limit response text
      },
      "error"
    );
  }

  /**
   * Log an authentication error
   */
  logAuthError(message: string, context?: Record<string, unknown>): void {
    this.logError(`Auth error: ${message}`, context, "warning");
  }

  /**
   * Log a validation error
   */
  logValidationError(field: string, message: string, value?: unknown): void {
    this.logError(
      `Validation error: ${field} - ${message}`,
      { field, value },
      "warning"
    );
  }

  /**
   * Log user actions for debugging
   */
  logUserAction(action: string, context?: Record<string, unknown>): void {
    this.logError(`User action: ${action}`, context, "info");
  }

  /**
   * Get recent logs
   */
  getRecentLogs(count = 10): ErrorLogEntry[] {
    return this.logs.slice(-count);
  }

  /**
   * Get logs by level
   */
  getLogsByLevel(level: "error" | "warning" | "info"): ErrorLogEntry[] {
    return this.logs.filter((log) => log.level === level);
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON string
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Generate a unique ID for the log entry
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Send error to external logging service (implement based on your service)
   */
  private async sendToExternalService(entry: ErrorLogEntry): Promise<void> {
    try {
      // Example implementation - replace with your actual logging service
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(entry),
      // });

      // For now, just store in localStorage as backup
      if (typeof window !== "undefined") {
        const existingLogs = localStorage.getItem("nepabhay_error_logs");
        const logs = existingLogs ? JSON.parse(existingLogs) : [];
        logs.push(entry);

        // Keep only last 50 logs in localStorage
        const recentLogs = logs.slice(-50);
        localStorage.setItem("nepabhay_error_logs", JSON.stringify(recentLogs));
      }
    } catch (error) {
      console.error("Failed to send error to external service:", error);
    }
  }
}

// Create singleton instance
export const errorLogger = new ErrorLogger();

// Global error handler for unhandled errors
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    errorLogger.logError(event.error || new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    errorLogger.logError(
      event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason)),
      {
        type: "unhandledRejection",
      }
    );
  });
}

// Helper functions for common error scenarios
export const logError = {
  network: errorLogger.logNetworkError.bind(errorLogger),
  auth: errorLogger.logAuthError.bind(errorLogger),
  validation: errorLogger.logValidationError.bind(errorLogger),
  user: errorLogger.logUserAction.bind(errorLogger),
  general: errorLogger.logError.bind(errorLogger),
};
