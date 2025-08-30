import { NextResponse } from "next/server";
import type { ApiResponse, PaginationInfo } from "@/types";

export class ApiResponseBuilder {
  static success<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
    return NextResponse.json({
      success: true,
      data,
      message,
    });
  }

  static successWithPagination<T>(
    data: T,
    pagination: PaginationInfo,
    message?: string
  ): NextResponse<ApiResponse<T>> {
    return NextResponse.json({
      success: true,
      data,
      pagination,
      message,
    });
  }

  static error(
    error: string,
    status: number = 400
  ): NextResponse<ApiResponse<null>> {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status }
    );
  }

  static unauthorized(
    error: string = "Authentication required"
  ): NextResponse<ApiResponse<null>> {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 401 }
    );
  }

  static forbidden(
    error: string = "Access denied"
  ): NextResponse<ApiResponse<null>> {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 403 }
    );
  }

  static notFound(
    error: string = "Resource not found"
  ): NextResponse<ApiResponse<null>> {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 404 }
    );
  }

  static serverError(
    error: string = "Internal server error"
  ): NextResponse<ApiResponse<null>> {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}

export function withErrorHandling<T extends unknown[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R | NextResponse<ApiResponse<null>>> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error("API Error:", error);

      if (error instanceof Error) {
        return ApiResponseBuilder.serverError(error.message);
      }

      return ApiResponseBuilder.serverError("An unexpected error occurred");
    }
  };
}
